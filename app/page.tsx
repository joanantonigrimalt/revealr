'use client';

import { useState, useCallback, useRef } from 'react';
import { validateFile, validateEmail } from '@/lib/validators';
import { formatFileSize } from '@/lib/utils';

type Step = 'upload' | 'email' | 'loading';

export default function LandingPage() {
  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    const v = validateFile(f.name, f.size, f.type);
    if (!v.valid) { setFileError(v.error); return; }
    setFileError('');
    setFile(f);
    setStep('email');
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleCheckout = async () => {
    if (!validateEmail(email)) { setEmailError('Please enter a valid email address.'); return; }
    setEmailError('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', file!);
      fd.append('email', email.trim());
      const res = await fetch('/api/create-checkout', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : 'Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Epilogue', sans-serif" }}>

      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-8 sm:px-12 py-5 border-b border-[#f0ece8]">
        <span className="text-xl font-bold tracking-tight text-[#1a1814]">
          reveal<span className="text-[#e8572a]">r</span>
        </span>
        <div className="hidden sm:flex items-center gap-8 text-sm text-[#6b6560] font-medium">
          <a href="#how" className="hover:text-[#1a1814] transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-[#1a1814] transition-colors">Pricing</a>
        </div>
        <button
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); inputRef.current?.click(); }}
          className="flex items-center gap-1.5 bg-[#1a1814] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors"
        >
          Analyze My Lease <span className="text-[#e8572a] text-base">→</span>
        </button>
      </nav>

      {/* ── Hero — two columns ───────────────────────────────────────────────── */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* LEFT — upload card */}
            <div className="w-full lg:w-[420px] flex-shrink-0 order-1 lg:order-none">
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
              />

              {step === 'upload' ? (
                /* Drop zone */
                <div
                  onDrop={onDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onClick={() => inputRef.current?.click()}
                  className={[
                    'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 p-10',
                    isDragOver
                      ? 'border-[#e8572a] bg-[#fdf0eb] scale-[1.01]'
                      : 'border-[#d5d0cb] bg-[#faf9f7] hover:border-[#e8572a] hover:bg-[#fdf9f8]',
                  ].join(' ')}
                  style={{ minHeight: 380 }}
                >
                  {/* Icon */}
                  <div className={[
                    'w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors',
                    isDragOver ? 'bg-[#e8572a]' : 'bg-white shadow-md',
                  ].join(' ')}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                      stroke={isDragOver ? '#fff' : '#e8572a'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>

                  <h3 className="font-bold text-xl text-[#1a1814] mb-1.5 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {isDragOver ? 'Release to upload' : 'Drop your lease here'}
                  </h3>
                  <p className="text-sm text-[#9c9590] text-center mb-7 leading-relaxed">
                    PDF, Word or image<br />Max 20MB · Encrypted & private
                  </p>

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                    className="flex items-center gap-2 bg-[#1a1814] text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-black transition-colors shadow-lg mb-3"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Choose File
                  </button>
                  <span className="text-xs text-[#9c9590]">or drag & drop</span>

                  {/* Accepted formats */}
                  <div className="flex gap-2 mt-8">
                    {['PDF', 'DOC', 'DOCX', 'JPG', 'PNG'].map((ext) => (
                      <span key={ext} className="px-2 py-0.5 bg-white border border-[#e8e4df] rounded text-xs text-[#9c9590] font-medium">
                        {ext}
                      </span>
                    ))}
                  </div>

                  {fileError && (
                    <p className="mt-4 text-sm text-red-500 text-center">{fileError}</p>
                  )}
                </div>
              ) : (
                /* Email step */
                <div className="bg-white border border-[#e8e4df] rounded-2xl p-7 shadow-xl" style={{ minHeight: 380 }}>
                  {/* File confirmed */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f0fdf4] border border-green-100 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1a1814] truncate">{file?.name}</p>
                      <p className="text-xs text-[#6b6560]">{file ? formatFileSize(file.size) : ''}</p>
                    </div>
                    <button onClick={() => { setFile(null); setStep('upload'); }}
                      className="text-xs text-[#9c9590] hover:text-[#1a1814] underline flex-shrink-0 transition-colors">
                      Change
                    </button>
                  </div>

                  <label className="block text-sm font-semibold text-[#1a1814] mb-1.5">
                    Where should we send your report?
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckout()}
                    placeholder="you@example.com"
                    autoFocus
                    className={[
                      'w-full px-4 py-3 rounded-xl border text-sm text-[#1a1814] placeholder-[#9c9590] mb-1',
                      'focus:outline-none focus:ring-2 focus:ring-[#e8572a]/20 focus:border-[#e8572a]/60 transition-all',
                      emailError ? 'border-red-400' : 'border-[#e8e4df]',
                    ].join(' ')}
                  />
                  {emailError && <p className="text-xs text-red-500 mb-2">{emailError}</p>}
                  <p className="text-xs text-[#9c9590] mb-5">Report sent instantly. No spam, ever.</p>

                  <button
                    onClick={handleCheckout}
                    disabled={loading || !email}
                    className="w-full flex items-center justify-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold text-base py-3.5 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-[#e8572a]/20 mb-4"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                        </svg>
                        Redirecting…
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Analyze My Lease — $19
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-3 text-xs text-[#9c9590]">
                    <span className="flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Secure · Stripe
                    </span>
                    <span>·</span>
                    <span>Results in ~60s</span>
                    <span>·</span>
                    <span>PDF + Email</span>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — headline + social proof */}
            <div className="flex-1 text-center lg:text-left order-none lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fdf0eb] border border-[#f0cfc0] text-[#e8572a] text-xs font-semibold tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8572a] animate-pulse" />
                AI-Powered · $19 One-Time
              </div>

              {/* Headline */}
              <h1
                className="font-bold text-[#1a1814] leading-tight mb-5"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
              >
                Your lease has{' '}
                <em className="text-[#e8572a] not-italic">hidden traps.</em>
                <br />
                Drop it here to find them.
              </h1>

              <p className="text-[#6b6560] text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Upload your rental agreement and our AI reveals every risky clause in under 2 minutes — before you sign or dispute.
              </p>

              {/* What we catch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-10 max-w-lg mx-auto lg:mx-0">
                {[
                  'Automatic rent increases',
                  'Illegal penalty clauses',
                  'Unfair security deposit terms',
                  'Hidden early termination fees',
                  'Landlord entry without notice',
                  'Tenant liability traps',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#444]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {['#e8572a', '#1a1814', '#6b6560', '#c94820'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: c }}>
                      {['J', 'M', 'S', 'R'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1814]">
                    2,400+ tenants protected
                  </p>
                  <p className="text-xs text-[#9c9590]">★★★★★ 4.9/5 average rating</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── How it works ─────────────────────────────────────────────────── */}
        <section id="how" className="border-t border-[#f0ece8] bg-[#faf9f7] py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-bold text-3xl text-[#1a1814] mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
              How it works
            </h2>
            <div className="grid sm:grid-cols-3 gap-10">
              {[
                { n: '01', title: 'Upload your lease', body: 'PDF, Word doc, or a photo. Any format works.' },
                { n: '02', title: 'Pay once — $19', body: 'Secure checkout via Stripe. No subscription ever.' },
                { n: '03', title: 'Get your full report', body: 'Risk score, flagged clauses, and a step-by-step action plan.' },
              ].map((s) => (
                <div key={s.n} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#e8e4df] font-bold text-lg text-[#e8572a] mb-4 shadow-sm"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {s.n}
                  </div>
                  <h3 className="font-semibold text-[#1a1814] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#6b6560] leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ─────────────────────────────────────────────────────────── */}
        <section id="pricing" className="py-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <h2 className="font-bold text-3xl text-[#1a1814] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Simple pricing
            </h2>
            <p className="text-[#6b6560] mb-8">One analysis. One price. No surprises.</p>
            <div className="bg-white border border-[#e8e4df] rounded-2xl p-8 shadow-lg text-left">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-bold text-[#1a1814]" style={{ fontFamily: "'Playfair Display', serif" }}>$19</span>
                <span className="text-[#9c9590] text-sm ml-1">one-time</span>
              </div>
              <p className="text-[#6b6560] text-sm mb-6">Full lease analysis, PDF report, email delivery</p>
              <ul className="space-y-2.5 text-sm mb-8">
                {[
                  'AI analysis of every clause',
                  'Risk score 0–100',
                  'Critical flags & warnings',
                  'Plain-English explanations',
                  'Step-by-step action plan',
                  'PDF report download',
                  'Instant email delivery',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[#1a1814]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => inputRef.current?.click(), 400); }}
                className="w-full bg-[#e8572a] hover:bg-[#c94820] text-white font-bold py-3.5 rounded-xl transition-colors text-center"
              >
                Analyze My Lease — $19
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#f0ece8] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-bold text-[#1a1814]">reveal<span className="text-[#e8572a]">r</span></span>
          <p className="text-xs text-[#9c9590] text-center">
            For informational purposes only. Not legal advice. © {new Date().getFullYear()} Revealr.
          </p>
        </div>
      </footer>
    </div>
  );
}
