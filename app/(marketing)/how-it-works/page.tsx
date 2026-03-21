import type { Metadata } from 'next';
import Link from 'next/link';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://revealr.io';

export const metadata: Metadata = {
  title: 'How Revealr Works — AI Contract Analysis Methodology',
  description:
    'Exactly how Revealr analyzes your contracts: what the AI reads, how flags are assigned, what the risk score means, and what Revealr cannot tell you. Transparent methodology.',
  alternates: { canonical: `${APP_URL}/how-it-works` },
};

const STEPS = [
  {
    number: '01',
    title: 'You upload a contract',
    body: 'Drag and drop or select your file — PDF, Word (.doc/.docx), or image (JPG, PNG) up to 20 MB. Your document is encrypted in transit immediately on upload using TLS.',
  },
  {
    number: '02',
    title: 'The AI reads the full text',
    body: "Our AI model processes the complete document — every clause, every section, including footnotes and addenda. This isn't a keyword search. The model reads contractual language in context.",
  },
  {
    number: '03',
    title: 'Risky clauses are identified and categorized',
    body: 'Each clause that deviates from typical standards — or that commonly causes problems for the signing party — is flagged with a severity level, a location reference (section number), a plain-English explanation, and a specific recommended action.',
  },
  {
    number: '04',
    title: 'You get a risk score and report',
    body: 'A 0–100 risk score summarizes the overall finding. The free preview shows your most significant flags. The full report ($19) includes every flag, the complete action plan, a downloadable PDF, and email delivery.',
  },
];

const SEVERITY_LEVELS = [
  {
    label: 'CRITICAL',
    bg: 'bg-[#fef2f2]',
    border: 'border-[#fecaca]',
    text: 'text-[#dc2626]',
    body: 'Clauses that create significant financial exposure, that may violate your statutory rights, or that impose obligations substantially worse than the norm. These require attention — either negotiation before signing or legal advice.',
  },
  {
    label: 'WARNING',
    bg: 'bg-[#fffbeb]',
    border: 'border-[#fde68a]',
    text: 'text-[#d97706]',
    body: 'Clauses that are unfavorable, unusual, or one-sided in ways that may matter to you. Not necessarily dealbreakers, but worth understanding and potentially negotiating.',
  },
  {
    label: 'INFO',
    bg: 'bg-[#eff6ff]',
    border: 'border-[#bfdbfe]',
    text: 'text-[#2563eb]',
    body: 'Clauses worth knowing about — standard provisions with non-obvious implications, terms that differ from common defaults, or conditions that may be relevant if circumstances change.',
  },
];

const WHAT_REVEALR_ANALYZES = [
  'Security deposit conditions and refundability',
  'Early termination fees and buyout options',
  'Automatic renewal provisions and notice windows',
  'Landlord entry rights and inspection clauses',
  'Non-compete scope, geography, and duration',
  'IP assignment and moonlighting carve-outs',
  'Termination terms: for-cause definitions and severance',
  'Signing bonus and equity clawback provisions',
  'Mandatory arbitration and class action waivers',
  'NDA scope, exclusions, and duration',
  'Indemnification scope and liability caps',
  'Payment terms, kill fees, and revision limits',
];

const WHAT_REVEALR_CANNOT_DO = [
  { title: 'Provide jurisdiction-specific legal advice', body: 'Laws vary significantly by state, country, and locality. Revealr flags clauses that are commonly problematic but cannot tell you whether a specific clause is enforceable under your local law.' },
  { title: 'Evaluate the counterparty or context', body: 'Revealr reads the document. It does not know who you\'re dealing with, what the market standard is in your city, or whether the counterparty has a history of acting in bad faith.' },
  { title: 'Predict court outcomes', body: 'Whether an ambiguous clause would be enforced — and how — depends on facts, jurisdiction, and the specific judge or arbitrator. Revealr cannot predict how any specific dispute would be resolved.' },
  { title: 'Replace legal counsel for high-stakes decisions', body: 'For complex employment negotiations, commercial lease agreements, business acquisitions, or contracts involving significant assets, professional legal advice remains appropriate. Revealr is a first-pass, not a final opinion.' },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-[#faf9f7] min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-white border-b border-[#e8e4df] py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-[#e8572a] uppercase tracking-widest mb-4">Methodology</p>
          <h1
            className="text-[#1a1814] font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
            }}
          >
            How Revealr Analyzes Your Contract
          </h1>
          <p className="text-[#6b6560] text-lg leading-relaxed max-w-2xl">
            Revealr is an AI tool, not a law firm. This page explains exactly what it does, how it works, and where its
            limits are — so you can use the results appropriately.
          </p>
        </div>
      </section>

      {/* ── The 4 steps ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-8"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            What happens when you upload a contract
          </h2>
          <div className="space-y-8">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-5">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1814] text-white flex items-center justify-center text-xs font-bold"
                  aria-hidden="true"
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1814] mb-1">{step.title}</h3>
                  <p className="text-sm text-[#6b6560] leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Revealr analyzes ── */}
      <section className="py-14 px-6 bg-white border-y border-[#e8e4df]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            What the AI is trained to detect
          </h2>
          <p className="text-[#6b6560] mb-6 leading-relaxed">
            Revealr has been designed around the clause types that most commonly lead to disputes, financial loss, or
            unintended obligations for the signing party. Specific examples include:
          </p>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {WHAT_REVEALR_ANALYZES.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-[#444]">
                <svg
                  width="13" height="13"
                  viewBox="0 0 24 24" fill="none"
                  stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5" aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9c9590] mt-5 leading-relaxed">
            The AI also surfaces other unusual or one-sided language it encounters, even if the clause type isn't in a
            predefined list. The underlying model understands legal language in context, not just pattern-matching.
          </p>
        </div>
      </section>

      {/* ── Severity levels ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            What the severity levels mean
          </h2>
          <p className="text-[#6b6560] mb-7 leading-relaxed">
            Every flag is assigned one of three severity levels based on the potential impact on the signing party:
          </p>
          <div className="space-y-4">
            {SEVERITY_LEVELS.map((level) => (
              <div key={level.label} className={`rounded-xl border p-5 ${level.bg} ${level.border}`}>
                <span
                  className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border mb-2.5 ${level.bg} ${level.text} ${level.border}`}
                >
                  {level.label}
                </span>
                <p className="text-sm text-[#444] leading-relaxed">{level.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Risk score ── */}
      <section className="py-14 px-6 bg-white border-y border-[#e8e4df]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            The 0–100 risk score
          </h2>
          <p className="text-[#6b6560] mb-7 leading-relaxed">
            The risk score is a composite indicator based on the number of flags and their severity. It is designed to
            give you a fast orientation — not a precise legal measurement.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { range: '0–30', label: 'Low risk', desc: 'Few or minor flags. Still review each one individually.' },
              { range: '31–65', label: 'Moderate risk', desc: 'Several flags worth understanding and potentially negotiating.' },
              { range: '66–100', label: 'High risk', desc: 'Multiple significant flags. Consider negotiation or professional review before signing.' },
            ].map(({ range, label, desc }) => (
              <div key={range} className="bg-[#faf9f7] border border-[#e8e4df] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-[#e8572a] mb-1">{range}</p>
                <p className="font-semibold text-[#1a1814] text-sm mb-1">{label}</p>
                <p className="text-xs text-[#9c9590] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[#6b6560] leading-relaxed">
            A score of 0 does not mean a contract is perfect — it means the AI did not detect significant deviations from
            typical standards. Revealr may miss nuanced or jurisdiction-specific issues. Read the full flag list even on
            low-scoring documents.
          </p>
        </div>
      </section>

      {/* ── What Revealr cannot do ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            What Revealr cannot do
          </h2>
          <p className="text-[#6b6560] mb-7 leading-relaxed">
            Transparency about limitations is part of using AI responsibly. These are things Revealr genuinely cannot help with:
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {WHAT_REVEALR_CANNOT_DO.map(({ title, body }) => (
              <div key={title} className="bg-white border border-[#e8e4df] rounded-xl p-5">
                <h3 className="font-bold text-[#1a1814] text-sm mb-2">{title}</h3>
                <p className="text-xs text-[#6b6560] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to use the results responsibly ── */}
      <section className="py-14 px-6 bg-white border-y border-[#e8e4df]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            How to use your results responsibly
          </h2>
          <div className="space-y-4 text-[#444] leading-relaxed">
            <p>
              <strong className="text-[#1a1814]">Step 1 — Read every flag, not just the Critical ones.</strong>{' '}
              Warning and Info flags often represent the difference between a negotiated outcome and a problem that surfaces 6 months into a lease or employment relationship.
            </p>
            <p>
              <strong className="text-[#1a1814]">Step 2 — Research flags that concern you.</strong>{' '}
              A CRITICAL flag is a signal to investigate further, not a guarantee the clause is illegal. Look up your state's tenant protection law, labor statutes, or contract enforcement standards for the specific clause type.
            </p>
            <p>
              <strong className="text-[#1a1814]">Step 3 — Use the report in your negotiation.</strong>{' '}
              Revealr's output gives you specific, factual starting points for negotiation — the clause number, the specific language, the issue, and a suggested alternative. This is more effective than vague concerns.
            </p>
            <p>
              <strong className="text-[#1a1814]">Step 4 — Consult a professional for high-stakes decisions.</strong>{' '}
              For agreements involving significant assets, equity, IP rights, or career-defining restrictions, use Revealr as your first pass and bring the flagged clauses to a licensed attorney in your jurisdiction. This makes professional review faster and more focused.
            </p>
          </div>
        </div>
      </section>

      {/* ── Document privacy ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            How your document is handled
          </h2>
          <div className="space-y-4 text-[#444] leading-relaxed">
            <p>
              Your document is encrypted in transit using TLS. It is stored temporarily on Vercel Blob storage only for
              the duration of analysis and report generation, then deleted. We do not retain copies of your documents
              after delivery, and we do not use your documents to train AI models.
            </p>
            <p>
              The AI analysis is performed via Anthropic's API (Claude). Anthropic's API usage terms prohibit using API
              inputs for model training by default.
            </p>
            <p>
              We recommend against uploading documents that contain information beyond what is necessary for the
              analysis — for example, if a contract contains trade secrets or sensitive third-party information, you may
              want to redact those sections before uploading.
            </p>
            <p>
              See our full{' '}
              <Link href="/privacy" className="text-[#e8572a] hover:underline">
                Privacy Policy
              </Link>{' '}
              for details on data handling, retention, and third-party services.
            </p>
          </div>
        </div>
      </section>

      {/* ── Supported file types ── */}
      <section className="py-14 px-6 bg-white border-t border-[#e8e4df]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Supported file types
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { type: 'PDF (text-based)', note: 'Best results. Most contracts are shared as text-based PDFs.' },
              { type: 'PDF (scanned/image)', note: 'Supported via OCR. Accuracy depends on scan quality.' },
              { type: 'Word (.doc, .docx)', note: 'Fully supported. Password-protected files cannot be processed.' },
              { type: 'Images (JPG, PNG)', note: 'Supported for photographed contracts. Well-lit, legible images produce best results.' },
              { type: 'Maximum file size', note: '20 MB per upload. Documents over 80 pages may take slightly longer.' },
              { type: 'Languages', note: 'Optimized for English-language contracts. Other languages may produce less accurate results.' },
            ].map(({ type, note }) => (
              <div key={type} className="bg-[#faf9f7] border border-[#e8e4df] rounded-xl p-4">
                <p className="font-bold text-[#1a1814] text-sm mb-1">{type}</p>
                <p className="text-xs text-[#6b6560] leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 px-6 bg-[#1a1814]">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            See it in action
          </h2>
          <p className="text-white/60 mb-7 leading-relaxed">
            Upload any contract and get a free preview analysis in under 60 seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Analyze a Contract →
          </Link>
        </div>
      </section>
    </main>
  );
}
