import Link from 'next/link';

type Props = {
  ctaPrimary: string;
  ctaSecondary?: string;
  ctaMicrocopy: string;
};

export default function PageCTA({ ctaPrimary, ctaSecondary, ctaMicrocopy }: Props) {
  return (
    <section className="py-16 px-6 bg-[#1a1814]">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}
        >
          Ready to review your document?
        </h2>
        <p className="text-white/60 mb-8 text-base leading-relaxed">
          Upload your contract and get a complete risk analysis in under 60 seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold px-7 py-3.5 rounded-xl transition-all text-base shadow-lg shadow-[#e8572a]/30"
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
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 font-semibold px-7 py-3.5 rounded-xl hover:border-white/40 hover:text-white transition-colors text-base"
            >
              {ctaSecondary}
            </a>
          )}
        </div>
        <p className="text-white/40 text-sm mt-4">{ctaMicrocopy}</p>
      </div>
    </section>
  );
}
