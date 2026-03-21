import Link from 'next/link';
import type { InternalLink } from '@/content/seo-pages';

type Props = {
  pages: InternalLink[];
};

export default function RelatedPages({ pages }: Props) {
  return (
    <section className="py-10 px-6 bg-[#faf9f7] border-b border-[#e8e4df]">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xs font-bold text-[#9c9590] uppercase tracking-wider mb-4">
          Related tools
        </h3>
        <div className="flex flex-wrap gap-3">
          {pages.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="inline-flex items-center gap-1.5 text-xs text-[#e8572a] font-semibold border border-[#e8572a]/25 bg-[#fdf0eb] px-4 py-2 rounded-full hover:bg-[#fde8dc] transition-colors"
            >
              {link.anchor}
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
