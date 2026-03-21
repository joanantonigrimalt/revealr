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
    <section className="bg-bg-base border-b border-border-base py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-accent-light border border-accent/20 rounded-full px-4 py-1.5 mb-6">
          <span className="text-accent text-xs font-semibold uppercase tracking-wider">AI Contract Analysis</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
          {h1}
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          {intro}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="bg-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-accent/90 transition-colors text-base"
          >
            {ctaPrimary}
          </Link>
          {ctaSecondary && (
            <Link
              href="#sample"
              className="border border-border-base text-text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-bg-card transition-colors text-base"
            >
              {ctaSecondary}
            </Link>
          )}
        </div>
        <p className="text-text-muted text-sm mt-3">{ctaMicrocopy}</p>
      </div>
    </section>
  );
}
