'use client';

import { Suspense, useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import AnalysisProgress from '@/components/AnalysisProgress';
import RiskScoreCard from '@/components/RiskScoreCard';
import FlagCard from '@/components/FlagCard';
import ActionPlan from '@/components/ActionPlan';
import ReportDownloadButton from '@/components/ReportDownloadButton';
import DashboardSidebar from '@/components/DashboardSidebar';
import type { LeaseAnalysisResult } from '@/types';

const STEP_MS = 1500;

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loader />}>
      <DashboardInner />
    </Suspense>
  );
}

function DashboardInner() {
  const params = useSearchParams();

  const fileKey   = params.get('file') ?? '';
  const fileName  = decodeURIComponent(params.get('name') ?? 'lease.pdf');
  const email     = decodeURIComponent(params.get('email') ?? '');
  const unlocked  = params.get('unlocked') === '1';
  const cancelled = params.get('cancelled') === '1';

  // Status machine:
  //  'loading'   — fake progress animation (no Claude, just UX)
  //  'locked'    — regular user, waiting for payment
  //  'analyzing' — Claude is running (bypass OR after payment)
  //  'success'   — full report visible
  //  'error'     — something failed
  type Status = 'loading' | 'locked' | 'analyzing' | 'success' | 'error';

  const [status, setStatus]             = useState<Status>('loading');
  const [progressStep, setProgress]     = useState(0);
  const [result, setResult]             = useState<LeaseAnalysisResult | null>(null);
  const [error, setError]               = useState('');
  const [emailInput, setEmailInput]     = useState(email);
  const [emailError, setEmailError]     = useState('');
  const [emailSent, setEmailSent]       = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [payLoading, setPayLoading]     = useState(false);
  const [devBypass, setDevBypass]       = useState(false);

  const ran = useRef(false);

  // ── Helper: run Claude analysis ───────────────────────────────────────────
  const runAnalysis = useCallback(async () => {
    setStatus('analyzing');
    try {
      setProgress(0); await delay(STEP_MS);
      setProgress(1); await delay(STEP_MS);
      setProgress(2); await delay(STEP_MS * 0.4);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileKey, fileName }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Analysis failed.');
      }

      setProgress(3); await delay(STEP_MS);
      const analysisResult: LeaseAnalysisResult = await res.json();
      setProgress(4); await delay(STEP_MS * 0.6);

      setResult(analysisResult);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setStatus('error');
    }
  }, [fileKey, fileName]);

  // ── A: Fresh upload — animate first, then bypass check or paywall ────────
  useEffect(() => {
    if (unlocked || !fileKey || ran.current) return;
    ran.current = true;

    const init = async () => {
      // Play the progress animation (UX only — no Claude yet)
      setStatus('loading');
      setProgress(0); await delay(STEP_MS);
      setProgress(1); await delay(STEP_MS);
      setProgress(2); await delay(STEP_MS * 0.8);
      setProgress(3); await delay(STEP_MS * 0.6);

      // Now check bypass
      try {
        const bypassRes = await fetch('/api/check-bypass');
        if (bypassRes.ok) {
          const { bypassed } = await bypassRes.json();
          if (bypassed === true) {
            setDevBypass(true);
            await runAnalysis(); // runs Claude for real
            return;
          }
        }
      } catch {
        // non-fatal
      }

      // Regular user → show paywall
      setStatus('locked');
    };
    init();
  }, [fileKey, unlocked, runAnalysis]);

  // ── B: After Stripe payment — now run Claude ──────────────────────────────
  useEffect(() => {
    if (!unlocked || !fileKey || ran.current) return;
    ran.current = true;
    runAnalysis();
  }, [unlocked, fileKey, runAnalysis]);

  // ── Unlock: go to Stripe (no analysis yet) ───────────────────────────────
  const handleUnlock = async () => {
    const emailToUse = emailInput.trim();
    if (!emailToUse || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToUse)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setPayLoading(true);
    try {
      // Send fileKey — analysis will run after Stripe success
      const checkoutRes = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileKey, email: emailToUse, fileName }),
      });
      if (!checkoutRes.ok) {
        const d = await checkoutRes.json();
        throw new Error(d.error ?? 'Checkout failed.');
      }
      const { url } = await checkoutRes.json();
      window.location.href = url;
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : 'Something went wrong.');
      setPayLoading(false);
    }
  };

  // ── Email helpers ─────────────────────────────────────────────────────────
  const sendEmail = useCallback(async (r: LeaseAnalysisResult, to: string) => {
    setEmailSending(true);
    try {
      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: to, result: r, fileName }),
      });
      if (res.ok) setEmailSent(true);
    } catch { } finally {
      setEmailSending(false);
    }
  }, [fileName]);

  const handleResend = () => {
    if (result && emailInput) { setEmailSent(false); sendEmail(result, emailInput); }
  };

  // Auto-send email after analysis completes post-payment
  useEffect(() => {
    if (status === 'success' && unlocked && result && email && !emailSent) {
      sendEmail(result, email);
    }
  }, [status, unlocked, result, email, emailSent, sendEmail]);

  // ── Guards ────────────────────────────────────────────────────────────────
  if (!fileKey) {
    return <ErrorScreen message="No document found. Please start over from the homepage." />;
  }
  if (status === 'error') return <ErrorScreen message={error} />;

  // ── Loading animation (UX) OR Claude analyzing ────────────────────────────
  if (status === 'loading' || status === 'analyzing') {
    return (
      <Shell>
        <div className="flex-1 flex items-center justify-center px-4">
          <AnalysisProgress currentStep={progressStep} />
        </div>
      </Shell>
    );
  }

  // ── Locked — blurred preview + paywall overlay ────────────────────────────
  if (status === 'locked' || cancelled) {
    // Fake placeholder flags to show blurred behind the paywall
    const fakeSeverities = [
      { label: 'CRITICAL', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', title: 'Early Termination Penalty', body: 'Clause requires tenant to pay up to 3 months rent as penalty...' },
      { label: 'WARNING',  color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', title: 'Automatic Rent Increase', body: 'Annual rent increase tied to CPI index without tenant consent...' },
      { label: 'WARNING',  color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', title: 'Unlimited Landlord Entry', body: 'Landlord may enter premises at any time without prior notice...' },
      { label: 'INFO',     color: 'text-blue-600',  bg: 'bg-blue-50',  border: 'border-blue-100',  title: 'Subletting Restriction', body: 'Tenant may not sublet or assign lease without written consent...' },
    ];

    return (
      <Shell>
        <div className="container-app py-8">
          <div className="mb-6">
            <p className="text-[#9c9590] text-sm mb-1">Analysis complete for</p>
            <h1 className="font-serif font-bold text-2xl text-[#1a1814] truncate">{fileName}</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main content — blurred behind paywall */}
            <div className="flex-1 min-w-0">

              {/* Risk score placeholder */}
              <div className="bg-white border border-[#e8e4df] rounded-2xl p-6 shadow-sm mb-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Gauge placeholder */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative w-32 h-20 overflow-hidden">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-8 border-[#f0ece8]" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-10 rounded-t-full bg-[#faf9f7] border-t-4 border-x-4 border-[#f0ece8]" />
                    </div>
                    <div className="mt-1 text-center">
                      <div className="text-4xl font-bold text-[#d0ccc8] blur-sm select-none">??</div>
                      <div className="text-xs text-[#9c9590]">out of 100</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-5 bg-[#f0ece8] rounded-full w-32 mb-2 animate-pulse" />
                    <div className="h-3 bg-[#f5f3f1] rounded-full w-full mb-1.5" />
                    <div className="h-3 bg-[#f5f3f1] rounded-full w-3/4 mb-4" />
                    <div className="flex gap-3">
                      {[['3', 'Critical', 'bg-red-100 text-red-600'], ['5', 'Warnings', 'bg-amber-100 text-amber-600'], ['2', 'Info', 'bg-blue-100 text-blue-600']].map(([n, l, cls]) => (
                        <div key={l} className={`px-3 py-1.5 rounded-lg text-center blur-sm select-none ${cls}`}>
                          <div className="text-lg font-bold">{n}</div>
                          <div className="text-xs font-medium">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Flags — blurred with paywall overlay */}
              <div className="relative">
                <h2 className="font-serif font-bold text-lg text-[#1a1814] mb-3">Issues Found</h2>

                {/* Blurred fake flags */}
                <div className="space-y-3 select-none pointer-events-none" aria-hidden>
                  {fakeSeverities.map((f, i) => (
                    <div key={i} className={`p-4 ${f.bg} border ${f.border} rounded-xl ${i >= 1 ? 'blur-sm opacity-70' : 'blur-[2px] opacity-80'}`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-xs font-bold uppercase tracking-wide ${f.color}`}>{f.label}</span>
                        <span className="text-xs text-[#9c9590] font-mono">§{i + 3}.{i + 1}</span>
                      </div>
                      <p className="font-semibold text-[#1a1814] text-sm mb-1">{f.title}</p>
                      <p className="text-xs text-[#6b6560]">{f.body}</p>
                    </div>
                  ))}
                </div>

                {/* Paywall overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-white/85 to-white rounded-2xl px-4 pt-20 pb-6">
                  <div className="w-full max-w-sm text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#1a1814] flex items-center justify-center mx-auto mb-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[#1a1814] mb-1">Your report is ready</h3>
                    <p className="text-[#6b6560] text-sm mb-5">Unlock to see all issues, risk score, plain-English explanations and your full action plan.</p>

                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => { setEmailInput(e.target.value); setEmailError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                      placeholder="your@email.com"
                      autoComplete="email"
                      className={[
                        'w-full px-4 py-3 rounded-xl border text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-[#e8572a]/20 focus:border-[#e8572a]/60 transition-all',
                        emailError ? 'border-red-400' : 'border-[#e8e4df]',
                      ].join(' ')}
                    />
                    {emailError && <p className="text-xs text-red-500 mb-1 text-left">{emailError}</p>}

                    <button
                      onClick={handleUnlock}
                      disabled={payLoading}
                      className="w-full mt-2 flex items-center justify-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#e8572a]/20 disabled:opacity-60"
                    >
                      {payLoading ? <><Spinner /> Redirecting…</> : <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Unlock Full Report — $19
                      </>}
                    </button>
                    <p className="text-xs text-[#9c9590] mt-2">One-time · No subscription · Secure via Stripe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-20 space-y-4">
                <div className="bg-white border border-[#e8e4df] rounded-xl p-4 shadow-sm">
                  <div className="text-xs font-semibold text-[#9c9590] uppercase tracking-wider mb-2">Document</div>
                  <p className="text-sm font-medium text-[#1a1814] truncate">{fileName}</p>
                </div>
                <div className="bg-[#1a1814] rounded-xl p-5 text-white">
                  <div className="text-sm font-bold mb-1">Full Report</div>
                  <div className="text-[#9c9590] text-xs mb-3">All flags · Action plan · PDF · Email</div>
                  <div className="text-3xl font-bold mb-1">$19</div>
                  <div className="text-xs text-[#6b6560] mb-4">one-time · no subscription</div>
                  <button
                    onClick={handleUnlock}
                    disabled={payLoading}
                    className="w-full bg-[#e8572a] hover:bg-[#c94820] text-white font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-60"
                  >
                    {payLoading ? 'Redirecting…' : 'Unlock Now →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  // ── Full report — unlocked ─────────────────────────────────────────────────
  if (status === 'success' && result) {
    const flagOrder = [
      ...result.flags.filter(f => f.type === 'critical'),
      ...result.flags.filter(f => f.type === 'warning'),
      ...result.flags.filter(f => f.type === 'info'),
    ];

    return (
      <Shell>
        <div className="container-app py-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Report Unlocked
                </span>
                {devBypass && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-700 text-xs font-semibold">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Dev mode · Payment bypass active
                  </span>
                )}
              </div>
              <h1 className="font-serif font-bold text-2xl text-[#1a1814]">Lease Analysis Report</h1>
              <p className="text-[#6b6560] text-sm truncate max-w-sm">{fileName}</p>
            </div>
            <ReportDownloadButton result={result} fileName={fileName} />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0 space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: '80ms', animationFillMode: 'both' }}>
                <RiskScoreCard result={result} />
              </div>
              {flagOrder.length > 0 && (
                <div className="animate-fade-in" style={{ animationDelay: '160ms', animationFillMode: 'both' }}>
                  <h2 className="font-serif font-bold text-xl text-[#1a1814] mb-4">Issues Found ({flagOrder.length})</h2>
                  <div className="space-y-3">
                    {flagOrder.map((flag, i) => <FlagCard key={i} flag={flag} index={i} />)}
                  </div>
                </div>
              )}
              <div className="animate-fade-in" style={{ animationDelay: '240ms', animationFillMode: 'both' }}>
                <ActionPlan result={result} />
              </div>
            </div>

            <div className="w-full lg:w-72 flex-shrink-0 animate-fade-in" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
              <div className="lg:sticky lg:top-20">
                <DashboardSidebar
                  result={result} fileName={fileName}
                  onResendEmail={handleResend} emailSent={emailSent} emailSending={emailSending}
                />
              </div>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  return null;
}

// ─── Shell & helpers ──────────────────────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      <header className="border-b border-[#e8e4df] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container-app flex items-center justify-between h-14">
          <a href="/" className="font-bold text-[#1a1814] text-lg tracking-tight" style={{ fontFamily: "'Epilogue', sans-serif" }}>
            reveal<span className="text-[#e8572a]">r</span>
          </a>
          <span className="text-xs text-[#9c9590] hidden sm:block">Lease Intelligence Platform</span>
        </div>
      </header>
      <div className="flex-1 flex flex-col">{children}</div>
      <footer className="border-t border-[#e8e4df] py-5">
        <div className="container-app text-center">
          <p className="text-xs text-[#9c9590]">© {new Date().getFullYear()} Revealr · For informational purposes only · Not legal advice</p>
        </div>
      </footer>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <Shell>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h1 className="font-serif font-bold text-2xl text-[#1a1814] mb-3">Something went wrong</h1>
          <p className="text-[#6b6560] text-sm mb-6 leading-relaxed">{message}</p>
          <a href="/" className="inline-flex items-center gap-2 bg-[#1a1814] text-white font-semibold px-6 py-3 rounded-xl hover:bg-black transition-colors">
            ← Back to Homepage
          </a>
        </div>
      </div>
    </Shell>
  );
}

function Loader() {
  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#e8572a] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Spinner() {
  return <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /></svg>;
}

function delay(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}
