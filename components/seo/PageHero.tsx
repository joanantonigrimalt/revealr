'use client';

import Link from 'next/link';

type Props = {
  h1: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  ctaMicrocopy: string;
};

export default function PageHero({ h1, intro, ctaPrimary, ctaSecondary, ctaMicrocopy }: Props) {
  return (
    <section className="border-b border-[#f0ece8] bg-white py-14 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#fdf0eb] border border-[#e8572a]/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8572a]" />
          <span className="text-[#e8572a] text-xs font-semibold uppercase tracking-wider">
            AI Contract Analysis
          </span>
        </div>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1814] leading-tight mb-5"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}
        >
          {h1}
        </h1>

        <p className="text-[#6b6560] text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          {intro}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold px-7 py-3.5 rounded-xl transition-all text-base shadow-lg shadow-[#e8572a]/20"
          >
            {ctaPrimary}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          {ctaSecondary && (
            <a
              href="#sample"
              className="inline-flex items-center gap-2 border border-[#e8e4df] bg-white text-[#1a1814] font-semibold px-7 py-3.5 rounded-xl hover:border-[#e8572a]/40 hover:text-[#e8572a] transition-colors text-base"
            >
              {ctaSecondary}
            </a>
          )}
        </div>

        <p className="text-[#9c9590] text-sm mt-4">{ctaMicrocopy}</p>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-xs text-[#9c9590]">
          {[
            '✓ Results in 60 seconds',
            '✓ Plain-English explanations',
            '✓ No subscription',
            '✓ Document deleted after analysis',
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
