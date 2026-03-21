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

  // ── Unlock: check admin email bypass first, then Stripe ──────────────────
  const handleUnlock = async () => {
    const emailToUse = emailInput.trim();
    if (!emailToUse || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToUse)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setPayLoading(true);
    try {
      // Check if this email is in the admin bypass list (server-side check)
      const bypassRes = await fetch(`/api/check-bypass?email=${encodeURIComponent(emailToUse)}`);
      if (bypassRes.ok) {
        const { bypassed } = await bypassRes.json();
        if (bypassed === true) {
          setDevBypass(true);
          setPayLoading(false);
          await runAnalysis();
          return;
        }
      }

      // Regular user — proceed to Stripe
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

  // ── Locked — professional blurred preview + sidebar paywall ──────────────
  if (status === 'locked' || cancelled) {
    const fakeFlags = [
      { sev: 'CRITICAL', sevColor: 'text-red-600', sevBg: 'bg-red-100/80', bg: 'bg-red-50', border: 'border-red-100', section: '§14.2', title: 'Extreme Early Termination Penalty', body: 'Tenant must pay up to 3 times the monthly rent plus documented damages for early termination, even with proper written notice. This penalty may exceed actual landlord losses and could be legally unenforceable in several states.' },
      { sev: 'CRITICAL', sevColor: 'text-red-600', sevBg: 'bg-red-100/80', bg: 'bg-red-50', border: 'border-red-100', section: '§6.1', title: 'Landlord Retains Tenant Property Rights', body: 'Broad clause grants landlord right to access, move, or dispose of tenant personal property stored on premises without prior notice or consent under certain undefined conditions.' },
      { sev: 'WARNING',  sevColor: 'text-amber-600', sevBg: 'bg-amber-100/80', bg: 'bg-amber-50', border: 'border-amber-100', section: '§9.3', title: 'Automatic Annual Rent Increase', body: 'Rent increases automatically each year by CPI + 2% without requiring a separate notice. Over a 3-year tenancy this could amount to a 15–20% cumulative increase.' },
      { sev: 'WARNING',  sevColor: 'text-amber-600', sevBg: 'bg-amber-100/80', bg: 'bg-amber-50', border: 'border-amber-100', section: '§11.4', title: 'Maintenance Responsibility Shifted to Tenant', body: 'Clause requires tenant to maintain HVAC filters, pest control, and minor repairs under $250 at their own expense — costs that are typically the landlord\'s responsibility.' },
    ];

    return (
      <Shell>
        <div className="container-app py-8">

          {/* Header */}
          <div className="flex items-start justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fdf0eb] border border-[#f0cfc0] text-[#e8572a] text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8572a]" />
                  Analysis complete
                </span>
              </div>
              <h1 className="font-serif font-bold text-2xl text-[#1a1814] truncate max-w-lg">{fileName}</h1>
              <p className="text-sm text-[#9c9590] mt-1">Your lease has been reviewed. Unlock to access the full report.</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left — blurred preview */}
            <div className="flex-1 min-w-0 space-y-4">

              {/* Risk score card — blurred */}
              <div className="bg-white border border-[#e8e4df] rounded-2xl shadow-sm overflow-hidden select-none" aria-hidden>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-8">

                    {/* SVG gauge */}
                    <div className="flex-shrink-0 flex flex-col items-center filter blur-[3px]">
                      <svg width="140" height="80" viewBox="0 0 140 80">
                        {/* Track */}
                        <path d="M 10 75 A 60 60 0 0 1 130 75" fill="none" stroke="#f0ece8" strokeWidth="10" strokeLinecap="round"/>
                        {/* Fill — red-orange to indicate high risk */}
                        <path d="M 10 75 A 60 60 0 0 1 100 22" fill="none" stroke="#e8572a" strokeWidth="10" strokeLinecap="round"/>
                        {/* Center number */}
                        <text x="70" y="72" textAnchor="middle" fontSize="28" fontWeight="700" fill="#1a1814" fontFamily="serif">74</text>
                      </svg>
                      <span className="text-xs text-[#9c9590] -mt-1">out of 100</span>
                    </div>

                    {/* Right info */}
                    <div className="flex-1 filter blur-[3px]">
                      <div className="inline-block px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide mb-2">High Risk</div>
                      <p className="text-sm text-[#6b6560] mb-4 leading-relaxed">This lease contains multiple clauses that are unfavorable to the tenant, including excessive penalties and broad landlord rights.</p>
                      <div className="flex gap-3">
                        {[['2', 'Critical', 'bg-red-50 text-red-600 border border-red-100'], ['4', 'Warnings', 'bg-amber-50 text-amber-600 border border-amber-100'], ['2', 'Info', 'bg-blue-50 text-blue-600 border border-blue-100']].map(([n, l, cls]) => (
                          <div key={l} className={`px-3 py-2 rounded-xl text-center ${cls}`}>
                            <div className="text-xl font-bold">{n}</div>
                            <div className="text-xs font-semibold">{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flag cards — progressively more blurred */}
              <div className="space-y-3 select-none pointer-events-none" aria-hidden>
                {fakeFlags.map((f, i) => (
                  <div
                    key={i}
                    className={`${f.bg} border ${f.border} rounded-xl p-5 transition-all`}
                    style={{ filter: `blur(${i === 0 ? 2 : i === 1 ? 4 : 6}px)`, opacity: i === 0 ? 0.85 : i === 1 ? 0.7 : 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${f.sevBg} ${f.sevColor}`}>{f.sev}</span>
                        <span className="text-xs text-[#9c9590] font-mono">{f.section}</span>
                      </div>
                    </div>
                    <p className="font-semibold text-[#1a1814] text-sm mb-1.5">{f.title}</p>
                    <p className="text-xs text-[#6b6560] leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>

              {/* Fade-out gradient at bottom */}
              <div className="h-16 bg-gradient-to-b from-transparent to-[#faf9f7] -mt-2 rounded-b-xl pointer-events-none" />
            </div>

            {/* Right — paywall sidebar (sticky) */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-20">

                {/* Paywall card */}
                <div className="bg-white border border-[#e8e4df] rounded-2xl shadow-lg overflow-hidden">
                  {/* Top bar */}
                  <div className="bg-[#1a1814] px-6 py-5">
                    <div className="flex items-center gap-2 mb-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span className="text-xs font-semibold text-[#e8572a] uppercase tracking-wider">Full Report</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>$19</span>
                      <span className="text-sm text-white/50">one-time</span>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5">No subscription · Instant access</p>
                  </div>

                  {/* Feature list */}
                  <div className="px-6 py-4 border-b border-[#f0ece8]">
                    <ul className="space-y-2">
                      {[
                        'Risk score with severity breakdown',
                        'All flagged clauses with explanations',
                        'Specific action per issue',
                        'Full prioritized action plan',
                        'PDF download + email delivery',
                      ].map(item => (
                        <li key={item} className="flex items-start gap-2 text-xs text-[#6b6560]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Email + CTA */}
                  <div className="px-6 py-5">
                    <label className="block text-xs font-semibold text-[#1a1814] mb-1.5">
                      Email — report delivered here
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => { setEmailInput(e.target.value); setEmailError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={[
                        'w-full px-4 py-2.5 rounded-xl border text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-[#e8572a]/20 focus:border-[#e8572a]/60 transition-all',
                        emailError ? 'border-red-400' : 'border-[#e8e4df]',
                      ].join(' ')}
                    />
                    {emailError && <p className="text-xs text-red-500 mb-2">{emailError}</p>}

                    <button
                      onClick={handleUnlock}
                      disabled={payLoading}
                      className="w-full mt-3 flex items-center justify-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-[#e8572a]/25 disabled:opacity-60 text-sm"
                    >
                      {payLoading
                        ? <><Spinner /> Redirecting to checkout…</>
                        : <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Unlock Full Report — $19
                          </>
                      }
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-[#9c9590]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <span>Secured by Stripe · Results in ~60 sec</span>
                    </div>
                  </div>
                </div>

                {/* Document info */}
                <div className="mt-3 px-4 py-3 bg-white border border-[#e8e4df] rounded-xl">
                  <p className="text-[10px] text-[#9c9590] uppercase tracking-wider mb-1">Document</p>
                  <p className="text-xs font-medium text-[#1a1814] truncate">{fileName}</p>
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
              <h1 className="font-serif font-bold text-2xl text-[#1a1814]">Contract Analysis Report</h1>
              <p className="text-[#6b6560] text-sm truncate max-w-sm">{fileName}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                {result.leaseType && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#f0ece8] text-[#6b6560]">
                    {result.leaseType}
                  </span>
                )}
                {result.confidence === 'low' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    Low confidence — limited text extracted
                  </span>
                )}
                {result.confidence === 'medium' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    Medium confidence
                  </span>
                )}
              </div>
            </div>
            <ReportDownloadButton result={result} fileName={fileName} />
          </div>

          {result.missingInfo && (
            <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm animate-fade-in">
              <strong className="font-semibold">Note:</strong> {result.missingInfo}
            </div>
          )}

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
          <a href="/" className="font-bold text-[#1a1814] text-lg tracking-tight" style={{ fontFamily: "var(--font-epilogue), system-ui, sans-serif" }}>
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
