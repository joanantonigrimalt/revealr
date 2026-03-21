import Link from 'next/link';
import type { InternalLink } from '@/content/seo-pages';

type Props = {
  pages: InternalLink[];
};

export default function RelatedPages({ pages }: Props) {
  return (
    <section className="py-10 px-4 bg-bg-base">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Related tools</h3>
        <div className="flex flex-wrap gap-3">
          {pages.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="inline-flex items-center gap-1.5 text-sm text-accent font-medium border border-accent/20 bg-accent-light px-4 py-2 rounded-full hover:bg-accent/10 transition-colors"
            >
              {link.anchor}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
