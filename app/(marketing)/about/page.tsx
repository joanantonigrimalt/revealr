import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Revealr — AI Contract Analysis Tool',
  description:
    'Learn what Revealr is, how it works, and what it can and can\'t do. Revealr is an AI tool that helps people understand contracts before signing — not a law firm.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://getrevealr.com'}/about` },
};

export default function AboutPage() {
  return (
    <main className="bg-[#faf9f7] min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-white border-b border-[#e8e4df] py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-[#e8572a] uppercase tracking-widest mb-4">About</p>
          <h1
            className="text-[#1a1814] font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
            }}
          >
            We built the contract review we wish existed
          </h1>
          <p className="text-[#6b6560] text-lg leading-relaxed max-w-2xl">
            Revealr is an AI-powered tool that reads contracts and surfaces risks — so you know what you're signing
            before you sign it. No legal jargon. No hours of reading. No expensive attorney fees for routine documents.
          </p>
        </div>
      </section>

      {/* ── What Revealr Is ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            What Revealr is
          </h2>
          <div className="space-y-4 text-[#444] leading-relaxed">
            <p>
              Revealr is an AI-powered document analysis tool. You upload a contract — a rental lease, an employment
              offer, an NDA, a freelance agreement, or any other legal document — and our AI reads every clause and flags
              anything that could cost you money, limit your rights, or create unexpected obligations.
            </p>
            <p>
              You get a risk score from 0 to 100, a list of flagged clauses organized by severity (Critical, Warning,
              Info), a plain-English explanation of what each clause means, and a specific recommended action for each
              flag. The full report is downloadable as a PDF and sent to your email.
            </p>
            <p>
              Most analyses complete in under 60 seconds. The preview is free. The full report is $19 — one-time, no
              subscription.
            </p>
          </div>
        </div>
      </section>

      {/* ── What Revealr Is Not ── */}
      <section className="py-14 px-6 bg-white border-y border-[#e8e4df]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            What Revealr is not
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: 'Not a law firm',
                body: 'Revealr is a software tool, not a law firm. We do not provide legal advice, and using Revealr does not create an attorney-client relationship. Our analysis is informational.',
              },
              {
                title: 'Not jurisdiction-specific',
                body: "Our AI flags clauses that deviate from common standards, but it does not know your state's specific tenant protection law, employment statutes, or local regulations. Research enforceability in your jurisdiction.",
              },
              {
                title: 'Not a substitute for an attorney',
                body: 'For high-value agreements, complex disputes, or contracts with unusual terms, consulting a licensed attorney in your jurisdiction remains the right move. Revealr helps you prepare for that conversation.',
              },
              {
                title: 'Not infallible',
                body: 'AI analysis can miss nuanced language, jurisdiction-specific exceptions, or context that changes how a clause should be interpreted. We recommend treating our output as a thorough first draft, not a final opinion.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-[#faf9f7] rounded-xl border border-[#e8e4df] p-5">
                <h3 className="font-bold text-[#1a1814] mb-2">{title}</h3>
                <p className="text-sm text-[#6b6560] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Handle Your Documents ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            How we handle your documents
          </h2>
          <div className="space-y-4 text-[#444] leading-relaxed">
            <p>
              Your document is encrypted in transit using TLS. It is stored temporarily only to generate your analysis,
              and deleted from our servers after the report is complete. We do not share your documents with third
              parties, and we do not use your documents to train AI models.
            </p>
            <p>
              We use industry-standard cloud infrastructure (Vercel) for hosting and storage. You can read more in our{' '}
              <Link href="/privacy" className="text-[#e8572a] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── The Problem We Solve ── */}
      <section className="py-14 px-6 bg-white border-y border-[#e8e4df]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            The problem we're solving
          </h2>
          <div className="space-y-4 text-[#444] leading-relaxed">
            <p>
              Most people sign contracts they haven't fully understood. A residential lease is 12–20 pages of legal
              language. An employment contract can contain non-compete clauses, IP assignments, and arbitration
              provisions that affect your career for years. An NDA might include restrictions far beyond what the
              situation warrants.
            </p>
            <p>
              Getting a lawyer to review a routine contract costs $200–$500+ per hour — more than most contracts are
              worth individually. So most people skip it and hope for the best.
            </p>
            <p>
              Revealr exists in the middle: faster and broader than manual reading, much cheaper than professional
              review, and designed to get you to the information you need quickly enough to actually use it before you
              sign.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-2xl font-bold text-[#1a1814] mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Ready to review your next contract?
          </h2>
          <p className="text-[#6b6560] mb-7 leading-relaxed">
            Upload any contract and get a full risk analysis in 60 seconds. Free preview, $19 to unlock.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Analyze a Contract →
          </Link>
          <p className="text-xs text-[#9c9590] mt-4">
            No account required · Encrypted in transit · Deleted after analysis
          </p>
        </div>
      </section>
    </main>
  );
}
