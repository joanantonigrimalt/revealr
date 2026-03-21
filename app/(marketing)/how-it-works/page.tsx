import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Revealr Works — AI Contract Analysis Methodology',
  description:
    'How Revealr\'s AI reviews your contracts: what it checks, how it scores risk, what the flags mean, and what it cannot do. Transparent methodology for informed use.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://revealr.io'}/how-it-works`,
  },
};

const STEPS = [
  {
    number: '01',
    title: 'Upload your contract',
    body: 'Drag and drop or select your file. Revealr accepts PDF, Word (.doc/.docx), and image files (JPG, PNG) up to 20 MB. Documents are encrypted in transit immediately.',
  },
  {
    number: '02',
    title: 'AI reads every clause',
    body: 'Our AI model processes the full text of your document — every section, every clause, every footnote. It doesn\'t summarize; it reads the entire contract systematically.',
  },
  {
    number: '03',
    title: 'Risks are flagged and explained',
    body: 'Each problematic or unusual clause is flagged with a severity level (Critical, Warning, or Info), its location in the document, a plain-English explanation of the issue, and a specific recommended action.',
  },
  {
    number: '04',
    title: 'You get a risk score and full report',
    body: 'Your contract receives a 0–100 risk score reflecting the overall severity and number of flags. The preview shows your top risks. Unlock the full report ($19) for every flag, the full action plan, PDF download, and email delivery.',
  },
];

const SEVERITY_LEVELS = [
  {
    label: 'CRITICAL',
    color: 'bg-[#fef2f2] border-[#fecaca] text-[#dc2626]',
    body: 'Clauses that create significant financial exposure, likely violate your rights, or impose unusually burdensome obligations. These warrant immediate attention before signing.',
  },
  {
    label: 'WARNING',
    color: 'bg-[#fffbeb] border-[#fde68a] text-[#d97706]',
    body: 'Clauses that are unfavorable, unusual, or worth understanding — not necessarily dealbreakers, but worth clarifying or negotiating.',
  },
  {
    label: 'INFO',
    color: 'bg-[#eff6ff] border-[#bfdbfe] text-[#2563eb]',
    body: 'Clauses worth knowing about: provisions that are standard but non-obvious, limitations that may matter later, or terms that differ from common defaults.',
  },
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
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
            }}
          >
            How Revealr Reviews Your Contract
          </h1>
          <p className="text-[#6b6560] text-lg leading-relaxed max-w-2xl">
            Transparency matters when you're making decisions about a legal document. Here's exactly what Revealr does
            with your contract, how it generates flags, and what the results mean.
          </p>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The 4-step process
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

      {/* ── How Flags Work ── */}
      <section className="py-14 px-6 bg-white border-y border-[#e8e4df]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How flags and severity levels work
          </h2>
          <p className="text-[#6b6560] mb-8 leading-relaxed">
            Each flag identifies a specific clause, explains what it means, and suggests what to do. Flags are assigned
            one of three severity levels:
          </p>
          <div className="space-y-4">
            {SEVERITY_LEVELS.map((level) => (
              <div
                key={level.label}
                className={`rounded-xl border p-5 ${level.color}`}
              >
                <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded border mb-2 ${level.color}`}>
                  {level.label}
                </span>
                <p className="text-sm text-[#444] leading-relaxed">{level.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How the Risk Score Works ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How the 0–100 risk score works
          </h2>
          <div className="space-y-4 text-[#444] leading-relaxed">
            <p>
              The risk score is a composite measure of the number and severity of flags found in your document. A higher
              score means more and more severe risks were identified. The score is not a legal assessment — it is a
              relative indicator designed to help you quickly understand whether a document warrants careful attention.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              {[
                { range: '0–30', label: 'Low risk', desc: 'Few or minor flags. Still worth reviewing each one.' },
                { range: '31–65', label: 'Moderate risk', desc: 'Several flags worth understanding before signing.' },
                { range: '66–100', label: 'High risk', desc: 'Multiple significant flags that may warrant negotiation or legal review.' },
              ].map(({ range, label, desc }) => (
                <div key={range} className="bg-white border border-[#e8e4df] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[#e8572a] mb-1">{range}</p>
                  <p className="font-semibold text-[#1a1814] text-sm mb-1">{label}</p>
                  <p className="text-xs text-[#9c9590] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What the AI Does and Doesn't Know ── */}
      <section className="py-14 px-6 bg-white border-y border-[#e8e4df]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Accuracy, limitations, and what to do with the results
          </h2>
          <div className="space-y-4 text-[#444] leading-relaxed">
            <p>
              Revealr's AI is trained to recognize common and significant contract risks with high accuracy. It performs
              well at: identifying non-standard clause language, flagging provisions that frequently cause problems,
              explaining what flagged language means, and suggesting what to ask or negotiate.
            </p>
            <p>
              It does not perform well at: jurisdiction-specific legal analysis, predicting how a specific court or
              arbitrator would interpret ambiguous language, or understanding context beyond the document itself (e.g.,
              who the counterparty is, what the market standard is for this type of deal in your city).
            </p>
            <p>
              Our recommendation: use Revealr as your first-pass analysis, then verify flagged clauses that concern you
              against your state's specific laws. For high-value or career-defining contracts, consult a licensed
              attorney — our analysis will make that conversation faster and more focused.
            </p>
          </div>
        </div>
      </section>

      {/* ── Supported File Types ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Supported file types and document requirements
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { type: 'PDF', note: 'Text-based PDFs work best. Scanned PDFs (image-only) require OCR processing and may produce less accurate results.' },
              { type: 'Word (.doc, .docx)', note: 'Standard Word documents are fully supported. Password-protected files cannot be processed.' },
              { type: 'Images (JPG, PNG)', note: 'Contract photos or scans. Ensure the image is well-lit and text is legible for best results.' },
              { type: 'File size', note: 'Maximum 20 MB per upload. Documents over 100 pages may take slightly longer to process.' },
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
            style={{ fontFamily: "'Playfair Display', serif" }}
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
