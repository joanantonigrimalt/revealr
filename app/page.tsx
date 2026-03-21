'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import UploadWidget from '@/components/UploadWidget';
import SiteFooter from '@/components/SiteFooter';

// ─── FAQ schema ───────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'What types of contracts can Revealr analyze?',
    a: 'Revealr analyzes any type of contract or legal document in text-based format: rental leases, employment contracts, job offer letters, NDAs, non-compete agreements, freelance contracts, service agreements, independent contractor agreements, IP assignment agreements, consulting agreements, and more. Upload any document and the AI will identify the risks.',
  },
  {
    q: 'How accurate is the AI analysis?',
    a: "Revealr's AI is trained to detect common and significant contract risks with high accuracy — non-refundable deposit clauses, overbroad IP assignment, mandatory arbitration, automatic renewals, and similar patterns. For very unusual or jurisdiction-specific language, we flag what we find and recommend professional review. The report is a first-pass analysis, not a substitute for legal advice.",
  },
  {
    q: 'How long does the analysis take?',
    a: 'Most documents are analyzed in under 60 seconds. Longer documents (over 20 pages) may take up to 90 seconds. You see a live progress indicator while the AI works.',
  },
  {
    q: 'Is my document kept private?',
    a: 'Yes. Your document is encrypted in transit, processed solely for generating your analysis, and deleted from our servers after the report is complete. We never store, share, or use your documents for training AI models.',
  },
  {
    q: 'What is included in the $19 report?',
    a: 'The full report includes: a 0–100 risk score with severity rating, every flagged clause organized by severity (Critical, Warning, Info), a plain-English explanation of each issue, a specific recommended action for each flag, and a full action plan. The report is downloadable as a PDF and sent to your email.',
  },
  {
    q: 'Is this a substitute for a lawyer?',
    a: 'No. Revealr is an AI-powered tool that helps you identify potential red flags before consulting a professional or signing. It does not constitute legal advice. For complex disputes or high-value agreements, we recommend consulting a licensed attorney. Revealr is best used as a first step — to understand what questions to ask and what clauses to negotiate.',
  },
  {
    q: 'Do I need an account to use Revealr?',
    a: "No account required. Upload your document, enter your email, and get your report. That's it.",
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

// ─── Document types ───────────────────────────────────────────────────────────
const DOC_TYPES = [
  {
    label: 'Rental Leases',
    href: '/lease-agreement-analyzer',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    desc: 'Security deposits, entry rights, renewal traps, maintenance',
  },
  {
    label: 'Employment Contracts',
    href: '/employment-contract-review',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    desc: 'Non-competes, IP clauses, termination, equity clawbacks',
  },
  {
    label: 'Job Offer Letters',
    href: '/job-offer-review',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    desc: 'At-will terms, signing bonus clawbacks, surprise non-competes',
  },
  {
    label: 'NDAs',
    href: '/nda-review',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    desc: 'Overbroad definitions, perpetual terms, hidden restrictions',
  },
  {
    label: 'Freelance Contracts',
    href: '/freelance-contract-review',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    desc: 'IP ownership, kill fees, unlimited revisions, payment terms',
  },
  {
    label: 'Service Agreements',
    href: '/service-agreement-review',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    desc: 'Scope creep, liability, auto-renewals, termination rights',
  },
  {
    label: 'Non-Competes',
    href: '/non-compete-agreement-review',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
    desc: 'Geographic scope, duration, enforceability, garden leave',
  },
  {
    label: 'Any Contract',
    href: '/contract-risk-checker',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    desc: 'Upload any document and get a full risk score',
  },
];

// ─── How it works ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: '1',
    title: 'Upload your document',
    body: 'PDF, Word, or image. Up to 20 MB. Encrypted in transit. Deleted after analysis.',
  },
  {
    n: '2',
    title: 'AI reads every clause',
    body: 'Our AI scans each clause for risk patterns — one-sided terms, unenforceable language, hidden obligations, and more.',
  },
  {
    n: '3',
    title: 'Get your risk report',
    body: 'You receive a 0–100 risk score, flagged clauses by severity, plain-English explanations, and a clear action plan.',
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '60 sec', label: 'Average analysis time' },
  { value: '2–4 hr', label: 'Manual review time saved' },
  { value: '$19', label: 'Full report, one-time' },
  { value: 'Any doc', label: 'Lease, NDA, employment, and more' },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* FAQ schema — lowercase <script> renders SSR-safe in App Router client components */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "var(--font-epilogue), system-ui, sans-serif" }}>

        {/* ── Nav ──────────────────────────────────────────────────────────── */}
        <header role="banner">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-[#f0ece8]"
          >
            <Link href="/" aria-label="Revealr homepage" className="text-xl font-bold tracking-tight text-[#1a1814]">
              reveal<span className="text-[#e8572a]">r</span>
            </Link>
            <div className="hidden sm:flex items-center gap-8 text-sm text-[#6b6560] font-medium">
              <Link href="/lease-agreement-analyzer" className="hover:text-[#1a1814] transition-colors">Leases</Link>
              <Link href="/employment-contract-review" className="hover:text-[#1a1814] transition-colors">Employment</Link>
              <Link href="/nda-review" className="hover:text-[#1a1814] transition-colors">NDAs</Link>
              <Link href="/freelance-contract-review" className="hover:text-[#1a1814] transition-colors">Freelance</Link>
              <a href="#how-it-works" className="hover:text-[#1a1814] transition-colors">How it works</a>
              <a href="#pricing" className="hover:text-[#1a1814] transition-colors">Pricing</a>
            </div>
            <a
              href="#upload"
              className="flex items-center gap-1.5 bg-[#1a1814] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors"
            >
              Analyze a Contract <span className="text-[#e8572a] ml-0.5">→</span>
            </a>
          </nav>
        </header>

        <main id="main-content">

          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section id="upload" aria-labelledby="hero-heading" className="max-w-6xl mx-auto px-6 sm:px-10 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

              {/* Upload widget */}
              <div className="w-full lg:w-[420px] flex-shrink-0">
                <UploadWidget />
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
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', letterSpacing: '-0.02em' }}
                >
                  Know What You're Signing — AI Contract Analysis in 60 Seconds
                </h1>

                <p className="text-[#6b6560] text-lg leading-relaxed mb-6 max-w-lg">
                  Upload any contract — lease, employment agreement, NDA, freelance contract — and Revealr flags every risky clause, scores the document 0–100, and explains each risk in plain English. No lawyer needed.
                </p>

                <ul className="space-y-2.5 mb-8" aria-label="Key benefits">
                  {[
                    { bold: 'Works on any contract type', rest: ' — leases, NDAs, employment, freelance, and more' },
                    { bold: 'Plain-English explanations', rest: ' — no legal jargon, no law degree required' },
                    { bold: 'Risk score 0–100', rest: ' — understand severity at a glance' },
                    { bold: 'Specific action steps', rest: ' — exactly what to negotiate or push back on' },
                    { bold: 'PDF + email delivery', rest: ' — share with the other party or an attorney' },
                  ].map(({ bold, rest }) => (
                    <li key={bold} className="flex items-start gap-2.5 text-sm text-[#444]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span><strong className="text-[#1a1814]">{bold}</strong>{rest}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2" aria-hidden="true">
                    {['#e8572a', '#1a1814', '#6b6560', '#c94820'].map((c, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c }}>
                        {['J', 'M', 'S', 'R'][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1814]">Used by renters, freelancers & employees</p>
                    <p className="text-xs text-[#9c9590]">Leases · Employment · NDAs · Freelance · Any contract</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Trust bar ──────────────────────────────────────────────────────── */}
          <div className="border-y border-[#f0ece8] bg-[#faf9f7] py-4">
            <ul className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-2" aria-label="Trust signals">
              {[
                { icon: '🔒', text: '256-bit SSL encryption' },
                { icon: '🗑', text: 'Deleted after analysis' },
                { icon: '⚡', text: 'Results in under 60 seconds' },
                { icon: '📄', text: 'PDF + email delivery' },
                { icon: '💳', text: 'Secure payment via Stripe' },
                { icon: '⚖', text: 'Not legal advice — disclosed upfront' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-xs text-[#6b6560]">
                  <span aria-hidden="true">{icon}</span>{text}
                </li>
              ))}
            </ul>
          </div>

          {/* ── What Revealr analyzes ──────────────────────────────────────────── */}
          <section aria-labelledby="docs-heading" className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="docs-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Works on Any Contract or Document
                </h2>
                <p className="text-[#6b6560] max-w-xl mx-auto leading-relaxed">
                  Revealr is built to detect risk patterns across all standard contract types. Upload the document and the AI adapts to what it reads.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {DOC_TYPES.map((doc) => (
                  <Link
                    key={doc.href}
                    href={doc.href}
                    className="group flex flex-col gap-3 p-5 rounded-xl border border-[#e8e4df] bg-[#faf9f7] hover:border-[#e8572a]/40 hover:bg-[#fdf9f8] transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#e8e4df] flex items-center justify-center text-[#6b6560] group-hover:text-[#e8572a] group-hover:border-[#e8572a]/30 transition-colors">
                      {doc.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1a1814] mb-0.5">{doc.label}</div>
                      <div className="text-xs text-[#6b6560] leading-relaxed">{doc.desc}</div>
                    </div>
                    <div className="text-xs text-[#e8572a] font-semibold mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      Analyze now →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── Stats bar ─────────────────────────────────────────────────────── */}
          <div className="border-y border-[#f0ece8] bg-[#1a1814] py-12 px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── How it works ──────────────────────────────────────────────────── */}
          <section id="how-it-works" aria-labelledby="how-heading" className="py-20 px-6 bg-[#faf9f7]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="how-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  How Revealr Works
                </h2>
                <p className="text-[#6b6560] max-w-xl mx-auto leading-relaxed">
                  Three steps from contract to clarity. No account, no subscription, no waiting room.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {STEPS.map((step) => (
                  <div key={step.n} className="bg-white border border-[#e8e4df] rounded-2xl p-7 text-center">
                    <div className="w-10 h-10 rounded-full bg-[#e8572a] text-white font-bold text-lg flex items-center justify-center mx-auto mb-5" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                      {step.n}
                    </div>
                    <h3 className="font-bold text-[#1a1814] mb-2 text-base">{step.title}</h3>
                    <p className="text-sm text-[#6b6560] leading-relaxed">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Sample output ─────────────────────────────────────────────────── */}
          <section aria-labelledby="sample-heading" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="sample-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  What Your Report Looks Like
                </h2>
                <p className="text-[#6b6560] max-w-xl mx-auto leading-relaxed">
                  Every clause gets evaluated. Every risk gets explained. Every flag comes with an action.
                </p>
              </div>

              <div className="rounded-2xl border border-[#e8e4df] overflow-hidden shadow-sm max-w-2xl mx-auto">
                {/* Report header */}
                <div className="bg-[#faf9f7] border-b border-[#e8e4df] px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#fdf0eb] flex items-center justify-center">
                      <span className="text-[#e8572a] font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>R</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1a1814]">Revealr Risk Report</div>
                      <div className="text-xs text-[#9c9590]">Employment Agreement · Analyzed just now</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#9c9590]">Risk Score</div>
                    <div className="text-2xl font-bold text-[#1a1814]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                      74 <span className="text-sm font-normal text-[#9c9590]">/ 100</span>
                    </div>
                  </div>
                </div>

                {/* Flags */}
                <div className="p-6 space-y-3 bg-white">
                  {[
                    {
                      sev: 'CRITICAL', cls: 'bg-[#fef2f2] border-[#fecaca] text-[#dc2626]',
                      dot: 'bg-[#dc2626]', section: '§11.2',
                      title: 'IP Assignment Covers Outside Work',
                      body: "All inventions conceived during employment are assigned to the company, including work done on personal time. This may cover your side projects.",
                      action: 'Request a carve-out for work created without company resources.',
                    },
                    {
                      sev: 'CRITICAL', cls: 'bg-[#fef2f2] border-[#fecaca] text-[#dc2626]',
                      dot: 'bg-[#dc2626]', section: '§4.1',
                      title: 'Non-Compete Covers Entire Country',
                      body: 'Geographic restriction is nationwide with no industry limitation. Courts in most states would consider this overbroad.',
                      action: 'Negotiate a specific state or regional limitation.',
                    },
                    {
                      sev: 'WARNING', cls: 'bg-[#fffbeb] border-[#fde68a] text-[#d97706]',
                      dot: 'bg-[#d97706]', section: '§15.1',
                      title: 'Mandatory Arbitration Waiver',
                      body: 'All disputes go to binding arbitration. You waive the right to a jury trial and class action participation.',
                      action: 'Ask if this clause is negotiable. Some employers will remove it.',
                    },
                  ].map((flag, i) => (
                    <div key={i} className={`rounded-xl border p-4 ${flag.cls}`}>
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${flag.dot}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${flag.cls}`}>{flag.sev}</span>
                            <span className="text-[11px] text-[#9c9590] font-mono">{flag.section}</span>
                          </div>
                          <div className="text-sm font-bold text-[#1a1814] mb-1">{flag.title}</div>
                          <p className="text-xs text-[#6b6560] leading-relaxed mb-2">{flag.body}</p>
                          <div className="text-xs font-semibold text-[#1a1814]">
                            → {flag.action}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-3 bg-[#faf9f7] border-t border-[#e8e4df] flex items-center justify-between">
                  <span className="text-xs text-[#9c9590]">3 flags detected · Analysis complete</span>
                  <span className="text-xs font-semibold text-[#e8572a]">$19 to unlock full report →</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Pricing ───────────────────────────────────────────────────────── */}
          <section id="pricing" aria-labelledby="pricing-heading" className="py-20 px-6 bg-[#faf9f7] border-t border-[#f0ece8]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="pricing-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  One Report. One Price. No Subscription.
                </h2>
                <p className="text-[#6b6560] max-w-xl mx-auto leading-relaxed">
                  Pay once per document. No monthly fees, no account required.
                </p>
              </div>

              <div className="max-w-xl mx-auto">
                <div className="bg-white border-2 border-[#e8572a]/30 rounded-2xl p-8 shadow-lg shadow-[#e8572a]/5">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-sm font-semibold text-[#e8572a] uppercase tracking-wider mb-1">Full Report</div>
                      <div className="text-4xl font-bold text-[#1a1814]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                        $19
                        <span className="text-base font-normal text-[#9c9590] ml-1">/ document</span>
                      </div>
                    </div>
                    <div className="bg-[#fdf0eb] border border-[#e8572a]/20 rounded-full px-3 py-1 text-xs font-semibold text-[#e8572a]">
                      One-time
                    </div>
                  </div>

                  <ul className="space-y-3 mb-7">
                    {[
                      'Full clause-by-clause AI analysis',
                      'Risk score 0–100 with severity breakdown',
                      'Every flagged clause explained in plain English',
                      'Specific recommended action for each flag',
                      'Full prioritized action plan',
                      'PDF report download + email delivery',
                      'Works on any contract type',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-[#444]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#upload"
                    className="block w-full text-center bg-[#e8572a] hover:bg-[#c94820] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#e8572a]/20"
                    onClick={(e) => { e.preventDefault(); document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    Analyze My Contract — Free Preview →
                  </a>
                  <p className="text-xs text-[#9c9590] text-center mt-3">
                    Preview is free · Pay only when you unlock the full report
                  </p>

                  <div className="mt-6 pt-5 border-t border-[#f0ece8]">
                    <p className="text-xs text-[#9c9590] text-center">
                      Compare: attorneys charge{' '}
                      <span className="font-semibold text-[#6b6560]">$200–$500/hour</span>
                      {' '}for the same review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────────────── */}
          <section id="faq" aria-labelledby="faq-heading" className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 id="faq-heading" className="font-bold text-3xl text-[#1a1814] mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-2">
                {FAQ_ITEMS.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-[#e8e4df] bg-[#faf9f7] overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#f5f3f0] transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span className="text-sm font-semibold text-[#1a1814]">{faq.q}</span>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9c9590"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={`flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 bg-white border-t border-[#f0ece8]">
                        <p className="text-sm text-[#6b6560] leading-relaxed pt-4">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Final CTA ─────────────────────────────────────────────────────── */}
          <section aria-labelledby="final-cta-heading" className="border-t border-[#f0ece8] bg-[#1a1814] py-20 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 id="final-cta-heading" className="font-bold text-3xl sm:text-4xl text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Know What You're Signing Before You Sign It
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Every contract is written to protect the other side. Revealr puts the analysis on yours — in 60 seconds, for $19.
              </p>
              <div className="max-w-sm mx-auto">
                <UploadWidget />
              </div>
            </div>
          </section>

        </main>

        <SiteFooter />
      </div>
    </>
  );
}
