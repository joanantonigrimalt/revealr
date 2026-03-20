'use client';

import { useState, useCallback } from 'react';
import UploadDropzone from '@/components/UploadDropzone';
import EmailInput from '@/components/EmailInput';
import PricingCTA from '@/components/PricingCTA';
import { validateEmail } from '@/lib/validators';

export default function LandingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [fileError, setFileError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [loading, setLoading] = useState(false);

  const isReady = file !== null && validateEmail(email) && !fileError;

  const handleFile = useCallback((f: File) => {
    setFile(f || null);
    setFileError('');
    setCheckoutError('');
  }, []);

  const handleFileError = useCallback((msg: string) => {
    setFileError(msg);
    if (msg) setFile(null);
  }, []);

  const handleCheckout = async () => {
    if (!isReady || loading) return;
    setLoading(true);
    setCheckoutError('');

    try {
      const formData = new FormData();
      formData.append('file', file!);
      formData.append('email', email.trim());

      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to create checkout session.');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {/* Nav */}
      <header className="border-b border-border-base bg-bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container-app flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-serif font-bold text-sm">R</span>
            </div>
            <span className="font-serif font-bold text-text-primary text-lg tracking-tight">Revealr</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              AI-Powered Analysis
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Results in 60s
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero */}
        <section className="container-app pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light border border-accent/20 text-accent text-xs font-semibold mb-6 uppercase tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            AI-Powered Lease Intelligence
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-5 leading-tight max-w-3xl mx-auto">
            Know What You&apos;re{' '}
            <em className="not-italic text-accent">Signing</em> Before You Sign It
          </h1>

          <p className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Upload your lease. Our AI attorney reads every clause, flags every risk, and gives you a full action plan — in under 60 seconds.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { number: '10k+', label: 'Leases analyzed' },
              { number: '94%', label: 'Found at least 1 risk' },
              { number: '$19', label: 'One-time fee' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif font-bold text-2xl text-text-primary">{s.number}</div>
                <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Upload form */}
        <section className="container-app pb-20">
          <div className="max-w-lg mx-auto">
            <div className="bg-bg-card border border-border-base rounded-2xl p-6 sm:p-8 shadow-elevated">
              <h2 className="font-serif font-bold text-xl text-text-primary mb-1">
                Analyze Your Lease
              </h2>
              <p className="text-text-secondary text-sm mb-6">
                Upload your document and enter your email to get started.
              </p>

              <div className="space-y-5">
                {/* Upload */}
                <div>
                  <UploadDropzone
                    onFileSelected={handleFile}
                    onError={handleFileError}
                    selectedFile={file}
                    disabled={loading}
                  />
                  {fileError && (
                    <p className="mt-2 text-xs text-critical flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {fileError}
                    </p>
                  )}
                </div>

                {/* Email */}
                <EmailInput value={email} onChange={setEmail} disabled={loading} />

                {/* CTA */}
                <PricingCTA
                  onClick={handleCheckout}
                  disabled={!isReady}
                  loading={loading}
                />

                {/* Checkout error */}
                {checkoutError && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-critical-bg border border-critical/20 text-critical text-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {checkoutError}
                  </div>
                )}
              </div>
            </div>

            {/* Social proof */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                256-bit SSL encryption
              </span>
              <span className="hidden sm:block">·</span>
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Documents deleted after analysis
              </span>
              <span className="hidden sm:block">·</span>
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                No subscription required
              </span>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-border-base bg-bg-card py-16">
          <div className="container-app">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-center text-text-primary mb-10">
              How It Works
            </h2>
            <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Upload your lease',
                  body: 'Drop your PDF, DOCX, or photo. We accept any format.',
                },
                {
                  step: '02',
                  title: 'Pay once — $19',
                  body: 'Secure payment via Stripe. No subscription, no hidden fees.',
                },
                {
                  step: '03',
                  title: 'Get your full report',
                  body: 'Risk score, flagged clauses, and a step-by-step action plan.',
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-bg-base border border-border-base font-serif font-bold text-lg text-accent mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we check */}
        <section className="py-16">
          <div className="container-app">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-text-primary mb-3">
                What We Check
              </h2>
              <p className="text-text-secondary mb-8">
                Our AI reads your lease like a tenant rights attorney, flagging issues that could cost you.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Automatic rent increases',
                  'Illegal penalty clauses',
                  'Security deposit terms',
                  'Early termination fees',
                  'Maintenance responsibilities',
                  'Entry notice requirements',
                  'Subletting restrictions',
                  'Pet and guest policies',
                  'Lease renewal conditions',
                  'Utility responsibilities',
                  'Habitability standards',
                  'Dispute resolution clauses',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-base py-8">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-accent flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xs">R</span>
            </div>
            <span className="font-serif font-semibold text-text-primary text-sm">Revealr</span>
          </div>
          <p className="text-xs text-text-muted text-center">
            For informational purposes only. Not legal advice. © {new Date().getFullYear()} Revealr.
          </p>
        </div>
      </footer>
    </div>
  );
}
