'use client';

import { useState, useCallback, useRef } from 'react';
import Script from 'next/script';
import { validateFile, validateEmail } from '@/lib/validators';
import { formatFileSize } from '@/lib/utils';

type Step = 'upload' | 'email' | 'loading';

// ─── FAQ schema data ──────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'What is a lease agreement analyzer?',
    a: 'A lease agreement analyzer is a tool that reads your rental contract and identifies clauses that could be harmful, unfair, or financially risky for tenants. Revealr uses AI trained on tenant rights law to flag issues that a typical renter would overlook.',
  },
  {
    q: 'What risky lease clauses does Revealr detect?',
    a: 'Revealr identifies automatic rent increases, illegal penalty clauses, one-sided early termination fees, insufficient notice requirements for landlord entry, unfair security deposit terms, hidden maintenance responsibilities, overly broad liability clauses, and more.',
  },
  {
    q: 'How long does the lease analysis take?',
    a: 'Most analyses complete in under 60 seconds. Longer documents (over 20 pages) may take up to 90 seconds. You see a live progress indicator while the AI works.',
  },
  {
    q: 'Is Revealr a substitute for a real estate attorney?',
    a: 'No. Revealr is an AI-powered tool designed to help tenants understand and identify red flags in their lease before consulting a professional or signing. It does not constitute legal advice. For complex situations, we recommend consulting a licensed attorney in your state.',
  },
  {
    q: 'What file formats does Revealr accept?',
    a: 'Revealr accepts PDF, DOCX, DOC, JPG, and PNG files up to 20 MB. If your lease is a scanned document or photo, our AI uses visual analysis to read it.',
  },
  {
    q: 'Is my lease document safe and private?',
    a: 'Yes. Documents are encrypted in transit and at rest. They are processed solely for analysis purposes and deleted automatically after your report is generated. We do not store, share, or train on your documents.',
  },
  {
    q: 'What is included in the $19 report?',
    a: 'You receive a risk score (0–100), a plain-English summary, all flagged clauses organized by severity (critical, warning, info), a recommended action for each issue, and a full action plan. The report is downloadable as a PDF and sent to your email.',
  },
  {
    q: 'Can I use Revealr for a lease renewal?',
    a: 'Yes. Lease renewals often introduce new clauses or modify existing terms. Revealr is equally effective at analyzing renewal agreements and comparing new conditions against standard expectations.',
  },
  {
    q: 'Does Revealr work for all US states?',
    a: 'Revealr works with leases from all US states. The AI detects the state mentioned in the document and applies relevant context. However, landlord-tenant law varies by jurisdiction — always verify flagged items against your local regulations.',
  },
  {
    q: 'What does the risk score mean?',
    a: 'The risk score is a number from 0 to 100 reflecting the overall risk profile of your lease for the tenant. A score below 25 is Low, 25–49 is Moderate, 50–74 is High, and 75+ is Severe. It is calculated based on the number, type, and severity of flagged clauses.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// ─── Clause categories ────────────────────────────────────────────────────────
const CLAUSES = [
  {
    icon: '↑',
    title: 'Automatic Rent Increases',
    desc: 'Clauses that allow landlords to raise rent unilaterally, often tied to CPI indexes or at-will.',
  },
  {
    icon: '$',
    title: 'Security Deposit Terms',
    desc: 'Non-refundable deposits, vague deduction rights, and timelines that exceed legal limits.',
  },
  {
    icon: '✕',
    title: 'Early Termination Fees',
    desc: 'Penalties for breaking the lease early that are disproportionate or legally unenforceable.',
  },
  {
    icon: '⌂',
    title: 'Landlord Entry Rights',
    desc: 'Insufficient or absent notice requirements before a landlord can enter your unit.',
  },
  {
    icon: '⚒',
    title: 'Maintenance Responsibilities',
    desc: 'Clauses that shift repair obligations to the tenant beyond what is legally required.',
  },
  {
    icon: '⚠',
    title: 'Illegal Penalty Clauses',
    desc: 'Late fees, damages, or charges that exceed statutory limits in your state.',
  },
  {
    icon: '⟳',
    title: 'Automatic Renewal Traps',
    desc: 'Leases that auto-renew for long terms without adequate notice to the tenant.',
  },
  {
    icon: '⊘',
    title: 'Subletting Restrictions',
    desc: 'Overly broad bans on subletting or assignment that limit tenant flexibility.',
  },
  {
    icon: '⚡',
    title: 'Utility Obligations',
    desc: 'Ambiguous or unfair allocation of utility costs that could result in unexpected bills.',
  },
  {
    icon: '⚖',
    title: 'Dispute Resolution Clauses',
    desc: 'Mandatory arbitration, waiver of jury trial, or one-sided choice of law provisions.',
  },
  {
    icon: '□',
    title: 'Move-Out Conditions',
    desc: 'Unreasonably strict restoration requirements or penalties for normal wear and tear.',
  },
  {
    icon: '✎',
    title: 'Lease Modification Rights',
    desc: 'Clauses that allow landlords to unilaterally change terms during the lease period.',
  },
];

export default function LandingPage() {
  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  const handleStart = async () => {
    if (!validateEmail(email)) { setEmailError('Please enter a valid email address.'); return; }
    setEmailError('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', file!);
      fd.append('email', email.trim());
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = `/dashboard?file=${encodeURIComponent(data.fileKey)}&name=${encodeURIComponent(data.fileName)}&email=${encodeURIComponent(email.trim())}`;
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Epilogue', sans-serif" }}>

        {/* ── Nav ──────────────────────────────────────────────────────────── */}
        <header role="banner">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-[#f0ece8]"
          >
            <a href="/" aria-label="Revealr homepage" className="text-xl font-bold tracking-tight text-[#1a1814]">
              reveal<span className="text-[#e8572a]">r</span>
            </a>
            <div className="hidden sm:flex items-center gap-8 text-sm text-[#6b6560] font-medium">
              <a href="#how-it-works" className="hover:text-[#1a1814] transition-colors">How it works</a>
              <a href="#what-we-analyze" className="hover:text-[#1a1814] transition-colors">What we analyze</a>
              <a href="#pricing" className="hover:text-[#1a1814] transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-[#1a1814] transition-colors">FAQ</a>
            </div>
            <button
              onClick={() => { setStep('upload'); setFile(null); window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => inputRef.current?.click(), 300); }}
              className="flex items-center gap-1.5 bg-[#1a1814] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors"
            >
              Analyze My Lease <span className="text-[#e8572a] ml-0.5">→</span>
            </button>
          </nav>
        </header>

        <main id="main-content">

          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section aria-labelledby="hero-heading" className="max-w-6xl mx-auto px-6 sm:px-10 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

              {/* Upload widget */}
              <div className="w-full lg:w-[420px] flex-shrink-0">
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  aria-label="Upload your lease document"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
                />

                {step === 'upload' ? (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Drop zone for lease document upload"
                    onDrop={onDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onClick={() => inputRef.current?.click()}
                    onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
                    className={[
                      'flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 p-10',
                      isDragOver
                        ? 'border-[#e8572a] bg-[#fdf0eb] scale-[1.01]'
                        : 'border-[#d5d0cb] bg-[#faf9f7] hover:border-[#e8572a] hover:bg-[#fdf9f8]',
                    ].join(' ')}
                    style={{ minHeight: 370 }}
                  >
                    <div className={[
                      'w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors',
                      isDragOver ? 'bg-[#e8572a]' : 'bg-white shadow-md',
                    ].join(' ')} aria-hidden="true">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                        stroke={isDragOver ? '#fff' : '#e8572a'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>

                    <p className="font-bold text-xl text-[#1a1814] mb-1.5 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {isDragOver ? 'Release to analyze' : 'Drop your lease here'}
                    </p>
                    <p className="text-sm text-[#9c9590] text-center mb-6 leading-relaxed">
                      PDF, Word or image · Max 20 MB<br />Encrypted in transit · Deleted after analysis
                    </p>

                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                      className="flex items-center gap-2 bg-[#1a1814] text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-black transition-colors shadow-lg mb-3"
                    >
                      Choose File
                    </button>
                    <span className="text-xs text-[#9c9590]">or drag & drop</span>

                    <div className="flex gap-2 mt-7 flex-wrap justify-center" aria-label="Accepted file formats">
                      {['PDF', 'DOCX', 'DOC', 'JPG', 'PNG'].map((ext) => (
                        <span key={ext} className="px-2 py-0.5 bg-white border border-[#e8e4df] rounded text-xs text-[#9c9590] font-medium">
                          {ext}
                        </span>
                      ))}
                    </div>

                    {fileError && (
                      <p role="alert" className="mt-4 text-sm text-red-500 text-center">{fileError}</p>
                    )}
                  </div>

                ) : (
                  /* Email step */
                  <div className="bg-white border border-[#e8e4df] rounded-2xl p-7 shadow-xl" style={{ minHeight: 370 }}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f0fdf4] border border-green-100 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1a1814] truncate">{file?.name}</p>
                        <p className="text-xs text-[#6b6560]">{file ? formatFileSize(file.size) : ''}</p>
                      </div>
                      <button
                        onClick={() => { setFile(null); setStep('upload'); setEmailError(''); }}
                        className="text-xs text-[#9c9590] hover:text-[#1a1814] underline flex-shrink-0 transition-colors"
                        aria-label="Remove selected file and choose again"
                      >
                        Change
                      </button>
                    </div>

                    <label htmlFor="email-input" className="block text-sm font-semibold text-[#1a1814] mb-1">
                      Email address
                    </label>
                    <p className="text-xs text-[#9c9590] mb-2">Your report will be sent here after you unlock it.</p>
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                      placeholder="you@example.com"
                      autoComplete="email"
                      autoFocus
                      aria-describedby={emailError ? 'email-error' : undefined}
                      className={[
                        'w-full px-4 py-3 rounded-xl border text-sm text-[#1a1814] placeholder-[#9c9590] mb-1',
                        'focus:outline-none focus:ring-2 focus:ring-[#e8572a]/20 focus:border-[#e8572a]/60 transition-all',
                        emailError ? 'border-red-400' : 'border-[#e8e4df]',
                      ].join(' ')}
                    />
                    {emailError && (
                      <p id="email-error" role="alert" className="text-xs text-red-500 mb-1">{emailError}</p>
                    )}

                    <button
                      onClick={handleStart}
                      disabled={loading || !email}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-[#1a1814] hover:bg-black text-white font-bold text-base py-3.5 rounded-xl transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                          </svg>
                          Uploading…
                        </>
                      ) : (
                        <>Analyze My Lease — Free Preview <span className="text-[#e8572a]">→</span></>
                      )}
                    </button>

                    <p className="text-center text-xs text-[#9c9590] mt-3">
                      Analysis is free · Pay $19 only to unlock the full report
                    </p>
                  </div>
                )}
              </div>

              {/* Headline */}
              <div className="flex-1 pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fdf0eb] border border-[#f0cfc0] text-[#e8572a] text-xs font-semibold tracking-wider uppercase mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8572a] animate-pulse" aria-hidden="true" />
                  AI-Powered · Free Preview · $19 to Unlock
                </div>

                <h1
                  id="hero-heading"
                  className="font-bold text-[#1a1814] leading-tight mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}
                >
                  The AI Lease Analyzer That Protects Tenants Before They Sign
                </h1>

                <p className="text-[#6b6560] text-lg leading-relaxed mb-6 max-w-lg">
                  Upload your rental agreement and our AI identifies every risky clause, calculates a risk score, and delivers a plain-English action plan — in under 60 seconds. Know what you're signing before it's too late.
                </p>

                {/* Value props */}
                <ul className="space-y-2.5 mb-8" aria-label="Key benefits">
                  {[
                    { bold: 'Instant analysis', rest: '— results in under 60 seconds' },
                    { bold: 'Plain-English explanations', rest: '— no legal jargon' },
                    { bold: 'Risk score 0–100', rest: '— understand severity at a glance' },
                    { bold: 'Specific action steps', rest: '— know exactly what to negotiate or avoid' },
                    { bold: 'PDF + email delivery', rest: '— keep your report forever' },
                  ].map(({ bold, rest }) => (
                    <li key={bold} className="flex items-start gap-2.5 text-sm text-[#444]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span><strong className="text-[#1a1814]">{bold}</strong>{rest}</span>
                    </li>
                  ))}
                </ul>

                {/* Social proof */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2" aria-hidden="true">
                    {['#e8572a', '#1a1814', '#6b6560', '#c94820'].map((c, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c }}>
                        {['J', 'M', 'S', 'R'][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1814]">Trusted by 2,400+ tenants</p>
                    <p className="text-xs text-[#9c9590]">★★★★★ 4.9/5 — across 2,400+ lease reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Trust bar ──────────────────────────────────────────────────────── */}
          <div className="border-y border-[#f0ece8] bg-[#faf9f7] py-5 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
              <ul className="flex flex-wrap justify-center gap-x-10 gap-y-3" aria-label="Trust signals">
                {[
                  { icon: '🔒', text: '256-bit SSL encryption' },
                  { icon: '🗑', text: 'Documents deleted after analysis' },
                  { icon: '⚡', text: 'Results in under 60 seconds' },
                  { icon: '📄', text: 'PDF + email delivery' },
                  { icon: '💳', text: 'Powered by Stripe' },
                  { icon: '⚖', text: 'Not legal advice — full disclosure' },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-center gap-2 text-sm text-[#6b6560]">
                    <span aria-hidden="true">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── How it works ──────────────────────────────────────────────────── */}
          <section id="how-it-works" aria-labelledby="how-heading" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="how-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  How the Lease Analyzer Works
                </h2>
                <p className="text-[#6b6560] max-w-xl mx-auto">
                  Four steps from upload to full risk report. No account, no subscription, no waiting.
                </p>
              </div>
              <ol className="grid sm:grid-cols-4 gap-8" aria-label="How Revealr works">
                {[
                  { n: '01', title: 'Upload your lease', body: 'Drop your rental agreement — PDF, Word, or a photo of your lease. Any format, up to 20 MB.' },
                  { n: '02', title: 'AI analyzes every clause', body: 'Our model reads the full document and flags every clause that could harm you as a tenant.' },
                  { n: '03', title: 'See your risk score free', body: 'Preview your risk score (0–100) and a summary of issues — completely free, no card required.' },
                  { n: '04', title: 'Unlock the full report', body: 'Pay $19 once to access all flagged clauses, plain-English explanations, and your action plan.' },
                ].map((s) => (
                  <li key={s.n} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#e8e4df] font-bold text-lg text-[#e8572a] mb-4 shadow-sm" style={{ fontFamily: "'Playfair Display', serif" }} aria-hidden="true">
                      {s.n}
                    </div>
                    <h3 className="font-semibold text-[#1a1814] mb-2 text-sm">{s.title}</h3>
                    <p className="text-xs text-[#6b6560] leading-relaxed">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── What we analyze ───────────────────────────────────────────────── */}
          <section id="what-we-analyze" aria-labelledby="analyze-heading" className="border-t border-[#f0ece8] bg-[#faf9f7] py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="analyze-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  What Revealr Looks for in Your Lease
                </h2>
                <p className="text-[#6b6560] max-w-2xl mx-auto">
                  Most tenants sign without reading the fine print. Revealr reads it all — flagging the 12 types of clauses that most commonly harm renters.
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Types of lease clauses Revealr analyzes">
                {CLAUSES.map((c) => (
                  <li key={c.title} className="bg-white border border-[#e8e4df] rounded-xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#fdf0eb] flex items-center justify-center text-[#e8572a] font-bold text-sm" aria-hidden="true">
                        {c.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#1a1814] text-sm mb-1">{c.title}</h3>
                        <p className="text-xs text-[#6b6560] leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Sample report ────────────────────────────────────────────────── */}
          <section aria-labelledby="sample-heading" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 id="sample-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  What Your Report Looks Like
                </h2>
                <p className="text-[#6b6560] max-w-xl mx-auto">
                  Every issue is explained clearly, with the specific clause, the risk it poses, and exactly what you should do.
                </p>
              </div>

              {/* Sample output card */}
              <div className="bg-white border border-[#e8e4df] rounded-2xl overflow-hidden shadow-lg" role="img" aria-label="Sample lease analysis report showing a critical issue">
                {/* Report header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e4df] bg-[#faf9f7]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1814] flex items-center justify-center">
                      <span className="text-white font-bold text-xs" style={{ fontFamily: "'Playfair Display', serif" }}>R</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a1814]">Revealr Analysis Report</p>
                      <p className="text-xs text-[#9c9590]">sample-lease.pdf</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">74</div>
                    <div className="text-xs text-[#9c9590]">High Risk</div>
                  </div>
                </div>

                {/* Sample flags */}
                <div className="p-6 space-y-4">
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Critical</span>
                      <span className="text-xs text-[#9c9590] font-mono">§6.3</span>
                    </div>
                    <p className="font-semibold text-[#1a1814] text-sm mb-1">Unlimited Landlord Entry</p>
                    <p className="text-xs text-[#6b6560] leading-relaxed mb-3">
                      The lease grants the landlord the right to enter the unit "at any time and for any reason" without advance notice. Most states require 24–48 hours written notice except in emergencies. This clause may be unenforceable, but gives the landlord leverage.
                    </p>
                    <div className="flex items-start gap-2 px-3 py-2 bg-red-100/60 rounded-lg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <p className="text-xs font-medium text-red-700">
                        Request the landlord add a 48-hour written notice requirement before signing, or verify your state's minimum notice law and note it in an addendum.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Warning</span>
                      <span className="text-xs text-[#9c9590] font-mono">§12.1</span>
                    </div>
                    <p className="font-semibold text-[#1a1814] text-sm mb-1">Automatic Annual Rent Increase (CPI + 3%)</p>
                    <p className="text-xs text-[#6b6560] leading-relaxed mb-3">
                      The lease includes an automatic annual rent increase equal to CPI plus 3%. Over a 3-year tenancy, this could result in a 20–30% rent increase with no action required from the landlord. Some states cap rent increases below this threshold.
                    </p>
                    <div className="flex items-start gap-2 px-3 py-2 bg-amber-100/60 rounded-lg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <p className="text-xs font-medium text-amber-700">
                        Negotiate a fixed cap (e.g., maximum 3% per year) or ask for a 12-month fixed term with a cap on any renewal increase.
                      </p>
                    </div>
                  </div>

                  <div className="text-center py-2 text-xs text-[#9c9590]">
                    + 6 more issues in the full report — unlock for $19
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── What's included in the report ───────────────────────────────── */}
          <section aria-labelledby="report-heading" className="border-t border-[#f0ece8] bg-[#faf9f7] py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 id="report-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  What's Included in Your Report
                </h2>
                <p className="text-[#6b6560] max-w-xl mx-auto">
                  Not just a list of issues — a complete decision-making tool for tenants.
                </p>
              </div>
              <dl className="grid sm:grid-cols-2 gap-6">
                {[
                  { dt: 'Risk Score (0–100)', dd: 'A single number reflecting the overall risk of your lease. Low, Moderate, High, or Severe — so you know immediately how cautious to be.' },
                  { dt: 'Flagged Clauses', dd: 'Every problematic clause identified, categorized by severity: Critical (act now), Warning (proceed carefully), or Info (be aware).' },
                  { dt: 'Plain-English Explanations', dd: 'Each flag explained in clear language — what the clause says, why it matters, and what risk it poses to you as a tenant.' },
                  { dt: 'Recommended Actions', dd: 'For each issue: a specific action step — whether to negotiate, request a clause change, verify local law, or decline.' },
                  { dt: 'Full Action Plan', dd: 'A prioritized checklist of everything to do before signing, ordered by severity so you know where to start.' },
                  { dt: 'PDF Download + Email', dd: 'Download your report as a PDF and receive it via email — so you can share it with a landlord or attorney.' },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="flex gap-4">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#e8572a] flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#1a1814] text-sm mb-1">{dt}</dt>
                      <dd className="text-sm text-[#6b6560] leading-relaxed">{dd}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* ── Who this is for ───────────────────────────────────────────────── */}
          <section aria-labelledby="who-heading" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-1">
                  <h2 id="who-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Who Uses Revealr
                  </h2>
                  <p className="text-[#6b6560] mb-6 leading-relaxed">
                    Revealr is built for anyone signing or renewing a residential rental agreement who wants to understand their rights and risks before committing.
                  </p>
                  <ul className="space-y-3" aria-label="Who Revealr is for">
                    {[
                      { who: 'First-time renters', why: 'who don\'t know what to look for in a lease.' },
                      { who: 'Experienced tenants', why: 'reviewing a new lease in an unfamiliar state or city.' },
                      { who: 'Renters facing renewal', why: 'who want to know if their landlord changed the terms.' },
                      { who: 'Anyone negotiating', why: 'who needs specific leverage points to bring to the landlord.' },
                      { who: 'Tenants in disputes', why: 'who want to understand the contract terms after the fact.' },
                    ].map(({ who, why }) => (
                      <li key={who} className="flex items-start gap-2.5 text-sm text-[#444]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span><strong className="text-[#1a1814]">{who}</strong> {why}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:w-80 flex-shrink-0 bg-[#faf9f7] border border-[#e8e4df] rounded-2xl p-6">
                  <h3 className="font-semibold text-[#1a1814] mb-4 text-sm uppercase tracking-wider">Revealr is NOT for</h3>
                  <ul className="space-y-2 text-sm text-[#6b6560]">
                    {[
                      'Commercial or business leases',
                      'Mortgage or purchase agreements',
                      'Replacing a licensed attorney',
                      'Active legal disputes (consult a lawyer)',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-[#9c9590]" aria-hidden="true">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ── Pricing ──────────────────────────────────────────────────────── */}
          <section id="pricing" aria-labelledby="pricing-heading" className="border-t border-[#f0ece8] bg-[#faf9f7] py-20 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 id="pricing-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                One Analysis. One Price. No Subscription.
              </h2>
              <p className="text-[#6b6560] mb-10 max-w-md mx-auto">
                The average bad lease costs tenants hundreds to thousands of dollars. Catching it costs $19.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-start">
                {/* Free tier */}
                <div className="w-full sm:w-72 bg-white border border-[#e8e4df] rounded-2xl p-6 text-left shadow-sm">
                  <div className="text-sm font-semibold text-[#9c9590] uppercase tracking-wider mb-1">Free Preview</div>
                  <div className="text-4xl font-bold text-[#1a1814] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>$0</div>
                  <p className="text-xs text-[#9c9590] mb-5">No card required</p>
                  <ul className="space-y-2 text-sm mb-6">
                    {['Upload any lease format', 'AI analysis runs immediately', 'Risk score (0–100)', 'Summary of findings'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[#6b6560]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9c9590" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => inputRef.current?.click(), 400); }}
                    className="w-full border border-[#e8e4df] text-[#1a1814] font-semibold py-2.5 rounded-xl text-sm hover:border-[#1a1814] transition-colors"
                  >
                    Start Free
                  </button>
                </div>

                {/* Paid tier */}
                <div className="w-full sm:w-72 bg-[#1a1814] border border-[#1a1814] rounded-2xl p-6 text-left shadow-xl">
                  <div className="text-sm font-semibold text-[#e8572a] uppercase tracking-wider mb-1">Full Report</div>
                  <div className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>$19</div>
                  <p className="text-xs text-[#6b6560] mb-5">One-time · No subscription</p>
                  <ul className="space-y-2 text-sm mb-6">
                    {[
                      'Everything in Free Preview',
                      'All flagged clauses (critical, warning, info)',
                      'Plain-English explanation per issue',
                      'Specific action per issue',
                      'Full prioritized action plan',
                      'PDF download',
                      'Email delivery',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[#d5d0cb]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => inputRef.current?.click(), 400); }}
                    className="w-full bg-[#e8572a] hover:bg-[#c94820] text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Analyze My Lease
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Privacy & security ────────────────────────────────────────────── */}
          <section aria-labelledby="privacy-heading" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="privacy-heading" className="font-bold text-2xl text-[#1a1814] mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Lease Document Is Private and Secure
              </h2>
              <dl className="grid sm:grid-cols-3 gap-6">
                {[
                  { dt: 'Encrypted in transit', dd: 'Your document is transmitted over 256-bit SSL/TLS encryption — the same standard used by banks.' },
                  { dt: 'Deleted after analysis', dd: 'Documents are automatically deleted from our servers once your analysis is complete. We do not retain copies.' },
                  { dt: 'Never shared or sold', dd: 'Your document is never shared with third parties, used for advertising, or included in AI training datasets.' },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="text-center p-6 bg-[#faf9f7] border border-[#e8e4df] rounded-xl">
                    <dt className="font-semibold text-[#1a1814] mb-2">{dt}</dt>
                    <dd className="text-sm text-[#6b6560] leading-relaxed">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section id="faq" aria-labelledby="faq-heading" className="border-t border-[#f0ece8] bg-[#faf9f7] py-20 px-6">
            <div className="max-w-2xl mx-auto">
              <h2 id="faq-heading" className="font-bold text-3xl text-[#1a1814] mb-10 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#faf9f7] transition-colors"
                    >
                      <span className="font-semibold text-[#1a1814] text-sm pr-4">{item.q}</span>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className={`flex-shrink-0 text-[#9c9590] transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 border-t border-[#f0ece8]">
                        <p className="text-sm text-[#6b6560] leading-relaxed pt-4">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Final CTA ────────────────────────────────────────────────────── */}
          <section aria-labelledby="cta-heading" className="py-20 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 id="cta-heading" className="font-bold text-3xl sm:text-4xl text-[#1a1814] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Read Your Lease Before You Sign It
              </h2>
              <p className="text-[#6b6560] text-lg mb-8 leading-relaxed">
                Most tenants spend more time choosing their furniture than reviewing the contract they're legally bound by. One bad clause can cost you months of rent. Revealr reads the whole thing in 60 seconds.
              </p>
              <button
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => inputRef.current?.click(), 400); }}
                className="inline-flex items-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-xl shadow-[#e8572a]/20"
              >
                Analyze My Lease — Free Preview
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <p className="text-xs text-[#9c9590] mt-4">
                Free preview · $19 to unlock · No subscription · Results in under 60 seconds
              </p>
            </div>
          </section>

        </main>

        {/* ── Footer ──────────────────────────────────────────────────────────── */}
        <footer role="contentinfo" className="border-t border-[#f0ece8] py-10 px-6 bg-[#faf9f7]">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-8">
            <div>
              <a href="/" className="font-bold text-[#1a1814] text-lg" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                reveal<span className="text-[#e8572a]">r</span>
              </a>
              <p className="text-xs text-[#9c9590] mt-2 max-w-xs leading-relaxed">
                AI-powered lease agreement analyzer for tenants. Know every risk before you sign.
              </p>
            </div>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#6b6560]">
              <a href="#how-it-works" className="hover:text-[#1a1814] transition-colors">How it works</a>
              <a href="#what-we-analyze" className="hover:text-[#1a1814] transition-colors">What we analyze</a>
              <a href="#pricing" className="hover:text-[#1a1814] transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-[#1a1814] transition-colors">FAQ</a>
            </nav>
          </div>
          <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-[#e8e4df]">
            <p className="text-xs text-[#9c9590] leading-relaxed">
              <strong>Disclaimer:</strong> Revealr is an AI-powered tool designed to help tenants identify potential issues in rental agreements. It does not constitute legal advice and is not a substitute for consultation with a licensed attorney. Results may vary depending on document quality, format, and jurisdiction. Always verify flagged clauses against applicable local law.
            </p>
            <p className="text-xs text-[#9c9590] mt-2">© {new Date().getFullYear()} Revealr. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
