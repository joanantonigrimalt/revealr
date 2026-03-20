'use client';

import { Suspense, useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import AnalysisProgress from '@/components/AnalysisProgress';
import RiskScoreCard from '@/components/RiskScoreCard';
import FlagCard from '@/components/FlagCard';
import ActionPlan from '@/components/ActionPlan';
import ReportDownloadButton from '@/components/ReportDownloadButton';
import DashboardSidebar from '@/components/DashboardSidebar';
import type { LeaseAnalysisResult, DashboardStatus } from '@/types';

// Minimum display time per step for a smooth UX
const STEP_DURATION_MS = 1600;

// ─── Wrapper with Suspense (required for useSearchParams in Next.js 14) ───────

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-base flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DashboardInner />
    </Suspense>
  );
}

// ─── Inner component (reads search params) ───────────────────────────────────

function DashboardInner() {
  const params = useSearchParams();
  const sessionId = params.get('session_id') ?? '';
  const fileKey = params.get('file') ?? '';
  const fileName = decodeURIComponent(params.get('name') ?? 'lease.pdf');

  const [status, setStatus] = useState<DashboardStatus>('verifying');
  const [progressStep, setProgressStep] = useState(0);
  const [result, setResult] = useState<LeaseAnalysisResult | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const analysisRan = useRef(false);

  const advanceTo = useCallback((step: number) => {
    setProgressStep(step);
  }, []);

  // ─── Main analysis flow ──────────────────────────────────────────────────
  useEffect(() => {
    if (!sessionId || !fileKey || analysisRan.current) return;
    analysisRan.current = true;

    const run = async () => {
      try {
        // Step 0: verifying payment
        advanceTo(0);
        await delay(STEP_DURATION_MS);

        const verifyRes = await fetch(
          `/api/analyze?session_id=${encodeURIComponent(sessionId)}&file=${encodeURIComponent(fileKey)}&name=${encodeURIComponent(fileName)}`
        );

        if (!verifyRes.ok) {
          const d = await verifyRes.json();
          throw new Error(d.error ?? 'Payment verification failed.');
        }

        const { email: userEmail } = await verifyRes.json();
        setEmail(userEmail);

        // Step 1: reading document
        advanceTo(1);
        setStatus('analyzing');
        await delay(STEP_DURATION_MS);

        // Step 2: analyzing clauses
        advanceTo(2);
        await delay(STEP_DURATION_MS * 0.5);

        const analyzeRes = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, fileKey, fileName }),
        });

        if (!analyzeRes.ok) {
          const d = await analyzeRes.json();
          throw new Error(d.error ?? 'Analysis failed. Please try again.');
        }

        // Step 3: scoring
        advanceTo(3);
        await delay(STEP_DURATION_MS);

        const analysisResult: LeaseAnalysisResult = await analyzeRes.json();

        // Step 4: preparing report
        advanceTo(4);
        await delay(STEP_DURATION_MS);

        setResult(analysisResult);
        setStatus('success');

        // Auto-send email (non-blocking)
        sendEmailReport(analysisResult, userEmail);
      } catch (err) {
        console.error('[dashboard]', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        setStatus('error');
      }
    };

    run();
  }, [sessionId, fileKey, fileName, advanceTo]);

  // ─── Email helpers ────────────────────────────────────────────────────────
  const sendEmailReport = useCallback(
    async (r: LeaseAnalysisResult, to: string) => {
      if (!to || !r) return;
      setEmailSending(true);
      try {
        const res = await fetch('/api/send-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: to, result: r, fileName }),
        });
        if (res.ok) setEmailSent(true);
      } catch {
        // Non-fatal
      } finally {
        setEmailSending(false);
      }
    },
    [fileName]
  );

  const handleResend = useCallback(() => {
    if (result && email) {
      setEmailSent(false);
      sendEmailReport(result, email);
    }
  }, [result, email, sendEmailReport]);

  // ─── Guards ────────────────────────────────────────────────────────────────
  if (!sessionId || !fileKey) {
    return <ErrorScreen message="Invalid session. Please start over from the homepage." />;
  }

  if (status === 'error') {
    return <ErrorScreen message={error} />;
  }

  // ─── Progress screen ──────────────────────────────────────────────────────
  if (status === 'verifying' || status === 'analyzing') {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col">
        <DashboardNav />
        <main className="flex-1 flex items-center justify-center px-4">
          <AnalysisProgress currentStep={progressStep} />
        </main>
      </div>
    );
  }

  // ─── Results screen ───────────────────────────────────────────────────────
  if (status === 'success' && result) {
    const flagOrder = [
      ...result.flags.filter((f) => f.type === 'critical'),
      ...result.flags.filter((f) => f.type === 'warning'),
      ...result.flags.filter((f) => f.type === 'info'),
    ];

    return (
      <div className="min-h-screen bg-bg-base flex flex-col">
        <DashboardNav />

        <main className="flex-1">
          <div className="container-app py-8">
            {/* Header row */}
            <div
              className="mb-6 animate-fade-in"
              style={{ animationFillMode: 'both' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="font-serif font-bold text-2xl sm:text-3xl text-text-primary mb-1">
                    Lease Analysis Report
                  </h1>
                  <p className="text-text-secondary text-sm truncate max-w-sm">{fileName}</p>
                </div>
                <ReportDownloadButton result={result} fileName={fileName} />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main column */}
              <div className="flex-1 min-w-0 space-y-6">
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: '80ms', animationFillMode: 'both' }}
                >
                  <RiskScoreCard result={result} />
                </div>

                {flagOrder.length > 0 && (
                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: '160ms', animationFillMode: 'both' }}
                  >
                    <h2 className="font-serif font-bold text-xl text-text-primary mb-4">
                      Issues Found ({flagOrder.length})
                    </h2>
                    <div className="space-y-3">
                      {flagOrder.map((flag, i) => (
                        <FlagCard key={i} flag={flag} index={i} />
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: '240ms', animationFillMode: 'both' }}
                >
                  <ActionPlan result={result} />
                </div>
              </div>

              {/* Sidebar */}
              <div
                className="w-full lg:w-72 flex-shrink-0 animate-fade-in"
                style={{ animationDelay: '120ms', animationFillMode: 'both' }}
              >
                <div className="lg:sticky lg:top-20">
                  <DashboardSidebar
                    result={result}
                    fileName={fileName}
                    onResendEmail={handleResend}
                    emailSent={emailSent}
                    emailSending={emailSending}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-border-base py-6 mt-8">
          <div className="container-app text-center">
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} Revealr · For informational purposes only · Not legal advice
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return null;
}

// ─── Shared sub-components ───────────────────────────────────────────────────

function DashboardNav() {
  return (
    <header className="border-b border-border-base bg-bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container-app flex items-center justify-between h-14">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-serif font-bold text-sm">R</span>
          </div>
          <span className="font-serif font-bold text-text-primary text-lg tracking-tight">Revealr</span>
        </a>
        <span className="text-xs text-text-muted hidden sm:block">Lease Intelligence Platform</span>
      </div>
    </header>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <DashboardNav />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-critical-bg border border-critical/20 flex items-center justify-center mx-auto mb-5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h1 className="font-serif font-bold text-2xl text-text-primary mb-3">
            Something went wrong
          </h1>
          <p className="text-text-secondary text-sm mb-6 leading-relaxed">{message}</p>
          <a href="/" className="btn-primary">
            ← Back to Homepage
          </a>
        </div>
      </main>
    </div>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
