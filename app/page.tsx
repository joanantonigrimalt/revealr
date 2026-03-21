'use client';

import { useState, useCallback, useRef } from 'react';
import Script from 'next/script';
import { validateFile, validateEmail } from '@/lib/validators';
import { formatFileSize } from '@/lib/utils';
import SiteFooter from '@/components/SiteFooter';

type Step = 'upload' | 'email' | 'loading';

// ─── FAQ schema data ──────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'What is a rental lease review?',
    a: 'A rental lease review is the process of reading and evaluating a residential rental agreement to identify clauses that are unfair, risky, or potentially unlawful for the tenant. A thorough review covers security deposit terms, landlord entry rights, early termination penalties, rent escalation clauses, maintenance obligations, and more. Revealr automates this process using AI — delivering a complete rental lease review in under 60 seconds.',
  },
  {
    q: 'Why should I review my lease before signing?',
    a: 'Once you sign a lease, you are legally bound by every clause in it — even the unfair ones. Tenants who skip the lease review often face unexpected costs: surprise rent increases, security deposits they can never recover, penalties for early termination, or liability for repairs that should be the landlord\'s responsibility. A pre-signing rental lease review gives you the leverage to negotiate or walk away before it\'s too late.',
  },
  {
    q: 'What risky lease clauses does Revealr detect?',
    a: 'Revealr identifies 12 categories of risky clauses: automatic rent increases (CPI-indexed or at-will), illegal penalty clauses and excessive late fees, one-sided early termination fees, insufficient landlord entry notice, unfair security deposit deduction rights, hidden maintenance responsibilities shifted to tenants, overly broad liability waivers, automatic renewal traps, subletting restrictions, ambiguous utility obligations, mandatory arbitration clauses, and unreasonable move-out restoration requirements.',
  },
  {
    q: 'How long does the AI lease review take?',
    a: 'Most analyses complete in under 60 seconds. Longer lease documents (over 20 pages) may take up to 90 seconds. You will see a live progress indicator while the AI reads your document. The analysis runs automatically after upload — no manual steps required.',
  },
  {
    q: 'Is Revealr a substitute for a real estate attorney?',
    a: 'No. Revealr is an AI-powered tool that helps tenants identify potential red flags before consulting a professional or signing. It does not constitute legal advice. For complex lease disputes, lease modifications with significant financial implications, or active legal proceedings, we recommend consulting a licensed attorney in your state. Revealr is best used as a first step — to understand what questions to ask and what clauses to negotiate.',
  },
  {
    q: 'What file formats does Revealr accept?',
    a: 'Revealr accepts PDF, DOCX, DOC, JPG, and PNG files up to 20 MB. If your lease is a scanned document or a photo taken on your phone, our AI uses visual analysis to read the text. No special formatting is required — upload the file exactly as your landlord sent it.',
  },
  {
    q: 'Is my lease document private and secure?',
    a: 'Yes. Your document is encrypted in transit using 256-bit SSL — the same standard used by banks. It is processed solely for the purpose of generating your analysis and is automatically deleted from our servers once the report is complete. We do not store, share, sell, or train AI models on your documents. Your lease contents are never accessible to other users or third parties.',
  },
  {
    q: 'What is included in the $19 full report?',
    a: 'The full report includes: a risk score from 0 to 100 with severity rating (Low / Moderate / High / Severe), every flagged clause organized by severity (Critical, Warning, Info), a plain-English explanation of each issue, a specific recommended action for each flag, and a full prioritized action plan for what to do before signing. The report is downloadable as a PDF and sent to your email so you can reference it or share it with a landlord or attorney.',
  },
  {
    q: 'Is $19 worth it for a lease review?',
    a: 'Consider what a bad lease can actually cost you. A non-refundable security deposit clause could forfeit $1,500–$3,000. An automatic rent increase clause can add hundreds per month over a multi-year tenancy. An early termination fee clause can cost $3,000–$6,000 if circumstances change. Attorneys charge $200–$500 per hour for the same review. Revealr costs $19 and takes 60 seconds. For anyone signing a lease, it is one of the highest-ROI decisions you can make.',
  },
  {
    q: 'Can I use Revealr for a lease renewal?',
    a: 'Yes — lease renewals are one of the most important times to do a rental lease review. Landlords frequently modify terms at renewal, sometimes quietly. Revealr will flag any clause that is unfavorable or has changed from standard expectations, so you can negotiate before committing to another term.',
  },
  {
    q: 'Does Revealr work for leases in all US states?',
    a: 'Revealr works with residential rental leases from all 50 US states. The AI detects the state mentioned in your document and applies relevant context around local landlord-tenant law. However, because tenant protection laws vary significantly by jurisdiction, we always recommend verifying flagged clauses against your specific state and city regulations — or asking a local attorney about items flagged as Critical.',
  },
  {
    q: 'What does the risk score mean?',
    a: 'The risk score is a number from 0 to 100 that reflects the overall risk profile of your rental lease for the tenant. A score below 25 is Low risk, 25–49 is Moderate, 50–74 is High, and 75 or above is Severe. It is calculated based on the number of flagged clauses, their severity, and the type of risk each one poses. It is designed to give you an immediate gut-check before diving into the details.',
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
    desc: 'Clauses that allow landlords to raise rent unilaterally — often tied to CPI indexes or discretionary at-will provisions — without tenant consent.',
  },
  {
    icon: '$',
    title: 'Security Deposit Terms',
    desc: 'Non-refundable deposits, vague deduction rights, and return timelines that exceed what your state law permits.',
  },
  {
    icon: '✕',
    title: 'Early Termination Fees',
    desc: 'Penalties for breaking the lease that are disproportionate to actual damages or legally unenforceable in your state.',
  },
  {
    icon: '⌂',
    title: 'Landlord Entry Rights',
    desc: 'Absent or insufficient notice requirements before a landlord can enter your unit. Most states require 24–48 hours written notice.',
  },
  {
    icon: '⚒',
    title: 'Maintenance Responsibilities',
    desc: 'Clauses that shift repair and maintenance obligations to the tenant beyond what is legally required by your state\'s habitability standards.',
  },
  {
    icon: '⚠',
    title: 'Illegal Penalty Clauses',
    desc: 'Late fees, damages caps, or other charges that exceed the statutory limits set by your state or city.',
  },
  {
    icon: '⟳',
    title: 'Automatic Renewal Traps',
    desc: 'Leases that auto-renew for long terms without adequate advance notice to the tenant, creating accidental long-term commitments.',
  },
  {
    icon: '⊘',
    title: 'Subletting Restrictions',
    desc: 'Overly broad bans on subletting or lease assignment that limit your flexibility if your situation changes.',
  },
  {
    icon: '⚡',
    title: 'Utility Obligations',
    desc: 'Ambiguous or one-sided allocation of utility costs that could result in unexpected bills during your tenancy.',
  },
  {
    icon: '⚖',
    title: 'Dispute Resolution Clauses',
    desc: 'Mandatory arbitration agreements, jury trial waivers, or one-sided choice of law provisions that limit your legal options.',
  },
  {
    icon: '□',
    title: 'Move-Out Conditions',
    desc: 'Unreasonably strict restoration requirements or blanket penalties for normal wear and tear that tenants are not legally responsible for.',
  },
  {
    icon: '✎',
    title: 'Unilateral Modification Rights',
    desc: 'Clauses that allow landlords to change lease terms during the lease period without tenant agreement or notice.',
  },
];

// ─── Why review section data ──────────────────────────────────────────────────
const WHY_REVIEW = [
  {
    stat: '$2,100',
    label: 'Average security deposit',
    detail: 'Vague deduction clauses are the #1 reason tenants lose deposits they are legally entitled to recover.',
  },
  {
    stat: '67%',
    label: 'Of leases contain at least one problematic clause',
    detail: 'Based on our analysis of 2,400+ residential rental agreements across all 50 US states.',
  },
  {
    stat: '$4,500',
    label: 'Median early termination penalty',
    detail: 'One clause — often buried in small print — can cost you months of rent if your plans change.',
  },
  {
    stat: '60 sec',
    label: 'Time to get your full review',
    detail: 'Revealr reads your entire lease and returns a complete risk report before you finish your coffee.',
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

      // Parse JSON safely — Vercel can return HTML on unhandled errors
      let data: Record<string, string> = {};
      try {
        data = await res.json();
      } catch {
        throw new Error('Server error. Please try again in a moment.');
      }

      if (!res.ok) throw new Error(data.error ?? `Upload failed (${res.status}).`);

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
              <a href="#why-review" className="hover:text-[#1a1814] transition-colors">Why review</a>
              <a href="#how-it-works" className="hover:text-[#1a1814] transition-colors">How it works</a>
              <a href="#pricing" className="hover:text-[#1a1814] transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-[#1a1814] transition-colors">FAQ</a>
            </div>
            <button
              onClick={() => { setStep('upload'); setFile(null); window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => inputRef.current?.click(), 300); }}
              className="flex items-center gap-1.5 bg-[#1a1814] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors"
            >
              Review My Lease <span className="text-[#e8572a] ml-0.5">→</span>
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
                        <>Review My Lease — Free Preview <span className="text-[#e8572a]">→</span></>
                      )}
                    </button>

                    <p className="text-center text-xs text-[#9c9590] mt-3">
                      Review is free · Pay $19 only to unlock the full report
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
                  Rental Lease Review Before You Sign — AI Analysis in 60 Seconds
                </h1>

                <p className="text-[#6b6560] text-lg leading-relaxed mb-6 max-w-lg">
                  Upload your rental agreement and our AI reviews every clause, flags what's risky, calculates your risk score, and delivers a plain-English action plan — before you're legally bound by it.
                </p>

                {/* Value props */}
                <ul className="space-y-2.5 mb-8" aria-label="Key benefits">
                  {[
                    { bold: 'Complete rental lease review', rest: '— every clause, not just the highlights' },
                    { bold: 'Plain-English explanations', rest: '— no legal jargon, no law degree required' },
                    { bold: 'Risk score 0–100', rest: '— understand severity at a glance' },
                    { bold: 'Specific action steps', rest: '— exactly what to negotiate or reject' },
                    { bold: 'PDF + email delivery', rest: '— share with your landlord or attorney' },
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
                  { icon: '💳', text: 'Secure payment via Stripe' },
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

          {/* ── Why review before signing ─────────────────────────────────────── */}
          <section id="why-review" aria-labelledby="why-heading" className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="why-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Why You Should Review Your Lease Before Signing
                </h2>
                <p className="text-[#6b6560] max-w-2xl mx-auto leading-relaxed">
                  Most tenants spend less than 15 minutes reviewing a document that legally controls where they live, how much they pay, and what they owe if anything goes wrong. A rental lease review before signing is the single most effective thing you can do to protect yourself.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                {WHY_REVIEW.map((item) => (
                  <div key={item.stat} className="bg-[#faf9f7] border border-[#e8e4df] rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-[#e8572a] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.stat}</div>
                    <div className="text-xs font-semibold text-[#1a1814] mb-2 uppercase tracking-wide">{item.label}</div>
                    <p className="text-xs text-[#6b6560] leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Before you sign',
                    body: 'You have full negotiating power. A flagged clause is a talking point — you can request changes, add addendums, or walk away. This is when a rental lease review has maximum value.',
                    accent: '#16a34a',
                    bg: 'bg-green-50',
                    border: 'border-green-100',
                  },
                  {
                    title: 'After you sign',
                    body: 'You are legally bound by every clause, including the unfair ones. Some protections still apply by law, but your leverage is gone. Disputes become expensive.',
                    accent: '#d97706',
                    bg: 'bg-amber-50',
                    border: 'border-amber-100',
                  },
                  {
                    title: 'During a dispute',
                    body: 'Understanding what your lease actually says — versus what you assumed it said — can make or break a claim. But it\'s too late to change the terms.',
                    accent: '#dc2626',
                    bg: 'bg-red-50',
                    border: 'border-red-100',
                  },
                ].map((card) => (
                  <div key={card.title} className={`${card.bg} border ${card.border} rounded-xl p-6`}>
                    <div className="text-sm font-bold mb-2" style={{ color: card.accent }}>{card.title}</div>
                    <p className="text-sm text-[#6b6560] leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── How it works ──────────────────────────────────────────────────── */}
          <section id="how-it-works" aria-labelledby="how-heading" className="border-t border-[#f0ece8] bg-[#faf9f7] py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="how-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  How the Rental Lease Review Works
                </h2>
                <p className="text-[#6b6560] max-w-xl mx-auto">
                  Four steps from upload to full risk report. No account. No subscription. No waiting.
                </p>
              </div>
              <ol className="grid sm:grid-cols-4 gap-8" aria-label="How Revealr works">
                {[
                  { n: '01', title: 'Upload your lease', body: 'Drop your rental agreement — PDF, Word, or a photo. Any format, up to 20 MB. No conversion needed.' },
                  { n: '02', title: 'AI reviews every clause', body: 'Our model reads the full document and flags every clause that could harm you as a tenant, organized by severity.' },
                  { n: '03', title: 'See your risk score free', body: 'Preview your risk score (0–100) and the most critical issue — completely free, no card required.' },
                  { n: '04', title: 'Unlock the full report', body: 'Pay $19 once to access all flagged clauses, plain-English explanations, recommended actions, and your full action plan.' },
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
          <section id="what-we-analyze" aria-labelledby="analyze-heading" className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="analyze-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  What Revealr Looks for in Your Rental Lease
                </h2>
                <p className="text-[#6b6560] max-w-2xl mx-auto">
                  Most tenants sign without reading the fine print. Revealr reads every word — flagging the 12 types of clauses that most commonly harm renters across all 50 US states.
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
          <section aria-labelledby="sample-heading" className="border-t border-[#f0ece8] bg-[#faf9f7] py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 id="sample-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  What Your Rental Lease Review Report Looks Like
                </h2>
                <p className="text-[#6b6560] max-w-xl mx-auto">
                  Every flagged clause includes the section reference, plain-English explanation of the risk it poses to you, and a specific action step — not generic advice.
                </p>
              </div>

              {/* Sample output card */}
              <div className="bg-white border border-[#e8e4df] rounded-2xl overflow-hidden shadow-lg" role="img" aria-label="Sample rental lease review report showing critical and warning issues">
                {/* Report header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e4df] bg-[#faf9f7]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1814] flex items-center justify-center">
                      <span className="text-white font-bold text-xs" style={{ fontFamily: "'Playfair Display', serif" }}>R</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a1814]">Revealr Lease Review Report</p>
                      <p className="text-xs text-[#9c9590]">sample-apartment-lease.pdf · 14 pages</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">74</div>
                    <div className="text-xs text-[#9c9590]">High Risk · 8 issues</div>
                  </div>
                </div>

                {/* Risk summary strip */}
                <div className="flex border-b border-[#e8e4df] divide-x divide-[#e8e4df]">
                  {[
                    { label: 'Critical', count: 2, color: 'text-red-600', bg: 'bg-red-50' },
                    { label: 'Warning', count: 4, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Info', count: 2, color: 'text-blue-600', bg: 'bg-blue-50' },
                  ].map((item) => (
                    <div key={item.label} className={`flex-1 px-4 py-2.5 text-center ${item.bg}`}>
                      <span className={`text-lg font-bold ${item.color}`}>{item.count}</span>
                      <span className={`text-xs ml-1.5 font-semibold ${item.color}`}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Sample flags */}
                <div className="p-6 space-y-4">
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Critical</span>
                      <span className="text-xs text-[#9c9590] font-mono">§6.3 Landlord Access</span>
                    </div>
                    <p className="font-semibold text-[#1a1814] text-sm mb-1">Unlimited Landlord Entry — No Notice Required</p>
                    <p className="text-xs text-[#6b6560] leading-relaxed mb-3">
                      The lease grants the landlord the right to enter the unit "at any time and for any reason" without advance notice. Most US states require 24–48 hours written notice except in genuine emergencies. This clause likely conflicts with state law and may be unenforceable — but gives the landlord broad leverage and could make your tenancy uncomfortable.
                    </p>
                    <div className="flex items-start gap-2 px-3 py-2 bg-red-100/60 rounded-lg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <p className="text-xs font-medium text-red-700">
                        <strong>Action:</strong> Request the landlord add a 48-hour written notice requirement as a signed addendum before you sign. If they refuse, verify your state minimum notice law and document it in writing.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Warning</span>
                      <span className="text-xs text-[#9c9590] font-mono">§12.1 Rent Escalation</span>
                    </div>
                    <p className="font-semibold text-[#1a1814] text-sm mb-1">Automatic Annual Rent Increase — CPI + 3%</p>
                    <p className="text-xs text-[#6b6560] leading-relaxed mb-3">
                      The lease includes an automatic annual rent increase equal to CPI plus 3%, applied without requiring landlord notice or tenant consent. Over a 3-year tenancy at current inflation rates, this could result in a cumulative 18–28% rent increase. Some states and cities cap allowable increases below this threshold — check local rent control ordinances.
                    </p>
                    <div className="flex items-start gap-2 px-3 py-2 bg-amber-100/60 rounded-lg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <p className="text-xs font-medium text-amber-700">
                        <strong>Action:</strong> Negotiate a fixed maximum annual cap (e.g., 3%) or ask for a 12-month fixed-rate term with a cap on renewal increases. Get any agreed limit in writing as a lease addendum.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Warning</span>
                      <span className="text-xs text-[#9c9590] font-mono">§9.4 Early Termination</span>
                    </div>
                    <p className="font-semibold text-[#1a1814] text-sm mb-1">Early Termination Fee — 3 Months' Rent</p>
                    <p className="text-xs text-[#6b6560] leading-relaxed mb-3">
                      The lease requires a fee equal to 3 months' rent if you vacate before the lease end date, regardless of reason. At the listed rent of $1,850/month, this is a $5,550 penalty. Many states cap early termination fees or require landlords to mitigate damages by re-renting the unit.
                    </p>
                    <div className="flex items-start gap-2 px-3 py-2 bg-amber-100/60 rounded-lg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <p className="text-xs font-medium text-amber-700">
                        <strong>Action:</strong> Ask to cap at 2 months' rent, or add language requiring the landlord to mitigate by actively marketing the unit — which many states already require by law.
                      </p>
                    </div>
                  </div>

                  <div className="text-center py-2 text-xs text-[#9c9590] border-t border-[#e8e4df] pt-4">
                    + 5 more issues in the full report (2 Critical, 4 Warning, 2 Info) — unlock for $19
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── What's included in the report ───────────────────────────────── */}
          <section aria-labelledby="report-heading" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 id="report-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  What's Included in Your Full Report
                </h2>
                <p className="text-[#6b6560] max-w-xl mx-auto">
                  Not a summary — a complete decision-making toolkit for tenants reviewing a rental lease.
                </p>
              </div>
              <dl className="grid sm:grid-cols-2 gap-6">
                {[
                  { dt: 'Risk Score (0–100)', dd: 'A single number reflecting the overall tenant risk of your lease. Low, Moderate, High, or Severe — calibrated to the number, type, and severity of flagged clauses.' },
                  { dt: 'All Flagged Clauses', dd: 'Every problematic clause identified and categorized by severity: Critical (act now), Warning (proceed carefully), or Info (be aware). Nothing hidden.' },
                  { dt: 'Plain-English Explanations', dd: 'Each flag explained in clear, jargon-free language — what the clause says, why it could harm you, and what a fairer version would look like.' },
                  { dt: 'Specific Recommended Actions', dd: 'For every issue: a concrete action step — whether to negotiate, request a clause change, add an addendum, verify local law, or walk away.' },
                  { dt: 'Full Prioritized Action Plan', dd: 'A step-by-step checklist of everything to address before signing, ordered by severity so you know exactly where to start your negotiations.' },
                  { dt: 'PDF Download + Email Delivery', dd: 'Download your report as a formatted PDF and receive it at your email — so you can bring it to a landlord meeting or share it with an attorney.' },
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
          <section aria-labelledby="who-heading" className="border-t border-[#f0ece8] bg-[#faf9f7] py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-1">
                  <h2 id="who-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Who Uses Revealr
                  </h2>
                  <p className="text-[#6b6560] mb-6 leading-relaxed">
                    Revealr is built for anyone signing or renewing a residential rental lease who wants to understand their rights and risks before committing. You shouldn't need to be a lawyer to review a lease you're being asked to sign.
                  </p>
                  <ul className="space-y-3" aria-label="Who Revealr is for">
                    {[
                      { who: 'First-time renters', why: "who don't know what to look for in a lease and want to avoid expensive mistakes." },
                      { who: 'Experienced tenants', why: 'reviewing a new lease in an unfamiliar city or state where local laws differ.' },
                      { who: 'Renters at renewal time', why: 'who want to know if the landlord quietly changed terms in the new agreement.' },
                      { who: 'Anyone entering negotiations', why: 'who needs specific, documented leverage points to bring to the landlord.' },
                      { who: 'Tenants in disputes', why: 'who want to understand exactly what their contract says about the issue at hand.' },
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
                <div className="lg:w-80 flex-shrink-0 bg-white border border-[#e8e4df] rounded-2xl p-6">
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
          <section id="pricing" aria-labelledby="pricing-heading" className="py-20 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 id="pricing-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                One Rental Lease Review. One Price. No Subscription.
              </h2>
              <p className="text-[#6b6560] mb-3 max-w-lg mx-auto">
                An attorney charges $200–$500 per hour to review a lease. A bad clause can cost you $1,500–$5,000. Revealr costs $19.
              </p>
              <p className="text-sm text-[#9c9590] mb-10">Preview your risk score free — pay only when you want the full report.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-start">
                {/* Free tier */}
                <div className="w-full sm:w-72 bg-white border border-[#e8e4df] rounded-2xl p-6 text-left shadow-sm">
                  <div className="text-sm font-semibold text-[#9c9590] uppercase tracking-wider mb-1">Free Preview</div>
                  <div className="text-4xl font-bold text-[#1a1814] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>$0</div>
                  <p className="text-xs text-[#9c9590] mb-5">No card required · Always free</p>
                  <ul className="space-y-2 text-sm mb-6">
                    {[
                      'Upload any lease format',
                      'Full AI analysis runs immediately',
                      'Risk score (0–100)',
                      'Top critical issue revealed',
                      'Summary of total flags',
                    ].map((item) => (
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
                    Start Free Review
                  </button>
                </div>

                {/* Paid tier */}
                <div className="w-full sm:w-72 bg-[#1a1814] border border-[#1a1814] rounded-2xl p-6 text-left shadow-xl relative overflow-hidden">
                  <div className="absolute top-3 right-3 bg-[#e8572a] text-white text-xs font-bold px-2 py-0.5 rounded-full">Most popular</div>
                  <div className="text-sm font-semibold text-[#e8572a] uppercase tracking-wider mb-1">Full Report</div>
                  <div className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>$19</div>
                  <p className="text-xs text-[#6b6560] mb-5">One-time · No subscription · Instant access</p>
                  <ul className="space-y-2 text-sm mb-6">
                    {[
                      'Everything in Free Preview',
                      'All flagged clauses (critical, warning, info)',
                      'Plain-English explanation per issue',
                      'Specific recommended action per flag',
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
                    Review My Lease — $19
                  </button>
                  <p className="text-center text-xs text-[#6b6560] mt-2">vs. $200–$500/hr for an attorney</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Privacy & security ────────────────────────────────────────────── */}
          <section aria-labelledby="privacy-heading" className="border-t border-[#f0ece8] bg-[#faf9f7] py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="privacy-heading" className="font-bold text-2xl text-[#1a1814] mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Lease Document Is Private and Secure
              </h2>
              <dl className="grid sm:grid-cols-3 gap-6">
                {[
                  { dt: 'Encrypted in transit', dd: 'Your document is transmitted over 256-bit SSL/TLS encryption — the same standard used by banks and financial institutions.' },
                  { dt: 'Deleted after analysis', dd: 'Documents are automatically and permanently deleted from our servers once your analysis is complete. We do not retain copies.' },
                  { dt: 'Never shared or sold', dd: 'Your document and its contents are never shared with third parties, used for advertising, or included in AI training datasets.' },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="text-center p-6 bg-white border border-[#e8e4df] rounded-xl">
                    <dt className="font-semibold text-[#1a1814] mb-2">{dt}</dt>
                    <dd className="text-sm text-[#6b6560] leading-relaxed">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section id="faq" aria-labelledby="faq-heading" className="py-20 px-6">
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
          <section aria-labelledby="cta-heading" className="border-t border-[#f0ece8] bg-[#faf9f7] py-20 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 id="cta-heading" className="font-bold text-3xl sm:text-4xl text-[#1a1814] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Review Your Rental Lease Before You Sign
              </h2>
              <p className="text-[#6b6560] text-lg mb-8 leading-relaxed">
                Most tenants spend more time choosing furniture than reviewing the contract that governs where they live, how much they pay, and what they owe if anything changes. One bad clause can cost you thousands. Revealr reviews your entire lease in 60 seconds.
              </p>
              <button
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => inputRef.current?.click(), 400); }}
                className="inline-flex items-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-xl shadow-[#e8572a]/20"
              >
                Start Your Free Lease Review
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <p className="text-xs text-[#9c9590] mt-4">
                Free risk score · $19 to unlock full report · No subscription · Results in under 60 seconds
              </p>
            </div>
          </section>

        </main>

        <SiteFooter />

      </div>
    </>
  );
}
