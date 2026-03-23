'use client';

import UploadWidget from '@/components/UploadWidget';

type Props = {
  h1: string;
  intro: string;
  ctaMicrocopy: string;
  pageContext?: string;
};

const BENEFITS = [
  { bold: 'Full clause-by-clause review', rest: ' — every section, not just the highlights' },
  { bold: 'Risk score 0–100', rest: ' — understand severity at a glance' },
  { bold: 'Plain-English explanations', rest: ' — no legal jargon required' },
  { bold: 'Specific action steps', rest: ' — exactly what to negotiate or ask' },
  { bold: 'PDF + email delivery', rest: ' — share with the other party or an attorney' },
];

export default function PageHero({ h1, intro, ctaMicrocopy, pageContext }: Props) {
  return (
    <section className="border-b border-[#f0ece8] bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* ── Left: Upload widget ── */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <UploadWidget pageContext={pageContext} />
          </div>

          {/* ── Right: H1, intro, benefits ── */}
          <div className="flex-1 pt-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fdf0eb] border border-[#f0cfc0] text-[#e8572a] text-xs font-semibold tracking-wider uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8572a] animate-pulse" aria-hidden="true" />
              AI Contract Analysis · $19 · 60 Seconds
            </div>

            <h1
              className="font-bold text-[#1a1814] leading-tight mb-4"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)',
                letterSpacing: '-0.02em',
              }}
            >
              {h1}
            </h1>

            <p className="text-[#6b6560] text-lg leading-relaxed mb-6 max-w-lg">
              {intro}
            </p>

            {/* Benefits */}
            <ul className="space-y-2.5 mb-7" aria-label="Key benefits">
              {BENEFITS.map(({ bold, rest }) => (
                <li key={bold} className="flex items-start gap-2.5 text-sm text-[#444]">
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="flex-shrink-0 mt-0.5" aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    <strong className="text-[#1a1814]">{bold}</strong>{rest}
                  </span>
                </li>
              ))}
            </ul>

            {/* Trust strip — no fake metrics */}
            <div className="flex items-center gap-2 text-xs text-[#9c9590]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Secured by Stripe</span>
              <span className="text-[#d5d0cb]">·</span>
              <span>Results in ~60 sec</span>
              <span className="text-[#d5d0cb]">·</span>
              <span>No subscription</span>
            </div>

            {/* Microcopy */}
            <p className="text-xs text-[#9c9590] mt-4">{ctaMicrocopy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
