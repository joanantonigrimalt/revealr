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

  // Params from landing (new flow)
  const fileKey   = params.get('file') ?? '';
  const fileName  = decodeURIComponent(params.get('name') ?? 'lease.pdf');
  const email     = decodeURIComponent(params.get('email') ?? '');

  // Params from Stripe success (unlock flow)
  const unlocked   = params.get('unlocked') === '1';
  const resultKey  = decodeURIComponent(params.get('result') ?? '');
  const cancelled  = params.get('cancelled') === '1';

  type Status = 'analyzing' | 'preview' | 'unlocking' | 'success' | 'error';
  const [status, setStatus]             = useState<Status>('analyzing');
  const [progressStep, setProgress]     = useState(0);
  const [result, setResult]             = useState<LeaseAnalysisResult | null>(null);
  const [error, setError]               = useState('');
  const [emailInput, setEmailInput]     = useState(email);
  const [emailError, setEmailError]     = useState('');
  const [emailSent, setEmailSent]       = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [payLoading, setPayLoading]     = useState(false);
  // devBypass is set server-side — client only knows the boolean result
  const [devBypass, setDevBypass]       = useState(false);

  const ran = useRef(false);

  // ── A: Stripe just returned — load saved result & show full report ──────────
  useEffect(() => {
    if (!unlocked || !resultKey || ran.current) return;
    ran.current = true;

    const load = async () => {
      try {
        setStatus('analyzing');
        setProgress(4);
        const res = await fetch(`/api/get-result?key=${encodeURIComponent(resultKey)}`);
        if (!res.ok) throw new Error('Could not retrieve your report. Please try again.');
        const data = await res.json();
        setResult(data.result ?? data);
        setStatus('success');
        // Auto-send email
        if (emailInput) sendEmail(data.result ?? data, emailInput);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load report.');
        setStatus('error');
      }
    };
    load();
  }, [unlocked, resultKey]);

  // ── B: Fresh upload — run analysis, then check bypass ────────────────────
  useEffect(() => {
    if (unlocked || !fileKey || ran.current) return;
    ran.current = true;

    const run = async () => {
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

        // ── Server-side bypass check ──────────────────────────────────────
        // GET — no email needed, server decides based on env vars only.
        try {
          const bypassRes = await fetch('/api/check-bypass');
          if (bypassRes.ok) {
            const { bypassed } = await bypassRes.json();
            if (bypassed === true) {
              setDevBypass(true);
              setStatus('success');
              return;
            }
          }
        } catch {
          // Bypass check failure is non-fatal — just show paywall
        }

        setStatus('preview'); // locked — not paid yet
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        setStatus('error');
      }
    };
    run();
  }, [fileKey, fileName, unlocked]);

  // ── Unlock: save result → Stripe checkout ────────────────────────────────
  const handleUnlock = async () => {
    if (!result) return;
    if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setPayLoading(true);
    try {
      // 1. Persist result server-side so it survives the redirect
      const saveRes = await fetch('/api/save-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result, fileName }),
      });
      if (!saveRes.ok) throw new Error('Could not save your analysis. Please try again.');
      const { resultKey: key } = await saveRes.json();

      // 2. Create Stripe checkout
      const checkoutRes = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultKey: key, email: emailInput, fileName }),
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

  // ── Email helpers ──────────────────────────────────────────────────────────
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

  // ── Missing params ───────────────────────────────────────────────────────
  if (!fileKey && !unlocked) {
    return <ErrorScreen message="No document found. Please start over from the homepage." />;
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (status === 'error') return <ErrorScreen message={error} />;

  // ── Analyzing ─────────────────────────────────────────────────────────────
  if (status === 'analyzing') {
    return (
      <Shell>
        <div className="flex-1 flex items-center justify-center px-4">
          <AnalysisProgress currentStep={progressStep} />
        </div>
      </Shell>
    );
  }

  // ── Preview — locked ──────────────────────────────────────────────────────
  if ((status === 'preview' || cancelled) && result) {
    const criticalCount = result.flags.filter(f => f.type === 'critical').length;
    const warningCount  = result.flags.filter(f => f.type === 'warning').length;

    return (
      <Shell>
        <div className="container-app py-8">
          <div className="mb-6">
            <p className="text-[#9c9590] text-sm mb-1">Preview for</p>
            <h1 className="font-serif font-bold text-2xl text-[#1a1814] truncate">{fileName}</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0 space-y-5">

              {/* Risk score — always visible */}
              <RiskScoreCard result={result} />

              {/* First flag — visible teaser */}
              {result.flags.length > 0 && (
                <div>
                  <h2 className="font-serif font-bold text-lg text-[#1a1814] mb-3">
                    Issues Found ({result.flags.length} total)
                  </h2>
                  <FlagCard flag={result.flags[0]} index={0} />
                </div>
              )}

              {/* Locked — blurred flags */}
              {result.flags.length > 1 && (
                <div className="relative">
                  <div className="space-y-3 blur-sm pointer-events-none select-none opacity-60" aria-hidden>
                    {result.flags.slice(1, 4).map((flag, i) => (
                      <FlagCard key={i} flag={flag} index={i + 1} />
                    ))}
                  </div>

                  {/* Paywall overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/10 via-white/80 to-white rounded-2xl px-6 py-10">
                    <div className="text-center max-w-sm">
                      <div className="w-14 h-14 rounded-2xl bg-[#1a1814] flex items-center justify-center mx-auto mb-4">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-[#1a1814] mb-2">
                        {result.flags.length - 1} more issue{result.flags.length - 1 !== 1 ? 's' : ''} found
                      </h3>
                      <p className="text-[#6b6560] text-sm mb-1">
                        Including{' '}
                        {criticalCount > 0 && <span className="text-red-600 font-semibold">{criticalCount} critical</span>}
                        {criticalCount > 0 && warningCount > 0 && ' and '}
                        {warningCount > 0 && <span className="text-amber-600 font-semibold">{warningCount} warning{warningCount !== 1 ? 's' : ''}</span>}.
                      </p>
                      <p className="text-[#9c9590] text-xs mb-6">Unlock to see the full report, action plan, and PDF.</p>

                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => { setEmailInput(e.target.value); setEmailError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                        placeholder="your@email.com"
                        className={[
                          'w-full px-4 py-2.5 rounded-xl border text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-[#e8572a]/20 focus:border-[#e8572a]/60 transition-all',
                          emailError ? 'border-red-400' : 'border-[#e8e4df]',
                        ].join(' ')}
                      />
                      {emailError && <p className="text-xs text-red-500 mb-2 text-left">{emailError}</p>}

                      <button
                        onClick={handleUnlock}
                        disabled={payLoading}
                        className="w-full mt-3 flex items-center justify-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#e8572a]/20 disabled:opacity-60"
                      >
                        {payLoading ? (
                          <><Spinner /> Redirecting to checkout…</>
                        ) : (
                          <><LockIcon /> Unlock Full Report — $19</>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-3 mt-3 text-xs text-[#9c9590]">
                        <span>Secure · Stripe</span><span>·</span>
                        <span>PDF + Email included</span><span>·</span>
                        <span>One-time</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {result.flags.length <= 1 && (
                <PaywallCard
                  emailInput={emailInput}
                  setEmailInput={setEmailInput}
                  emailError={emailError}
                  setEmailError={setEmailError}
                  payLoading={payLoading}
                  handleUnlock={handleUnlock}
                />
              )}
            </div>

            {/* Sidebar — locked */}
            <div className="w-full lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-20 space-y-4">
                <div className="bg-white border border-[#e8e4df] rounded-xl p-4 shadow-card">
                  <div className="text-xs font-semibold text-[#9c9590] uppercase tracking-wider mb-3">Document</div>
                  <p className="text-sm font-medium text-[#1a1814] truncate">{fileName}</p>
                </div>
                <div className="bg-[#1a1814] rounded-xl p-5 text-white">
                  <div className="text-sm font-bold mb-1">Unlock Full Report</div>
                  <div className="text-[#9c9590] text-xs mb-4">All flags · Action plan · PDF · Email</div>
                  <div className="text-3xl font-bold mb-4">$19 <span className="text-sm font-normal text-[#9c9590]">one-time</span></div>
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

  // ── Full report — unlocked (paid or dev bypass) ────────────────────────────
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
                {/* Dev bypass badge — only shown when bypass is active (server-confirmed) */}
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

// ─── Small components ─────────────────────────────────────────────────────────

function PaywallCard({ emailInput, setEmailInput, emailError, setEmailError, payLoading, handleUnlock }: any) {
  return (
    <div className="bg-white border border-[#e8e4df] rounded-2xl p-8 text-center shadow-card">
      <div className="w-12 h-12 rounded-xl bg-[#1a1814] flex items-center justify-center mx-auto mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <h3 className="font-serif font-bold text-xl text-[#1a1814] mb-2">Unlock Full Report</h3>
      <p className="text-[#6b6560] text-sm mb-6">See all flags, action plan, and download your PDF report.</p>
      <input type="email" value={emailInput} onChange={(e) => { setEmailInput(e.target.value); setEmailError(''); }}
        placeholder="your@email.com"
        className="w-full px-4 py-2.5 rounded-xl border border-[#e8e4df] text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#e8572a]/20" />
      {emailError && <p className="text-xs text-red-500 mb-2">{emailError}</p>}
      <button onClick={handleUnlock} disabled={payLoading}
        className="w-full flex items-center justify-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#e8572a]/20 disabled:opacity-60">
        {payLoading ? <><Spinner /> Redirecting…</> : <><LockIcon /> Unlock Full Report — $19</>}
      </button>
    </div>
  );
}

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

function LockIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
}

function delay(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}
