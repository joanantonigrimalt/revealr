import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts, getBlogPostsByCategory } from '@/content/blog-posts';
import type { BlogCategory } from '@/content/blog-posts';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://getrevealr.com';

export const metadata: Metadata = {
  title: 'Contract Review Guides & Resources',
  description:
    'Practical guides on reading contracts before you sign. Covers rental leases, employment agreements, NDAs, freelance contracts, and how AI contract review works.',
  alternates: { canonical: `${APP_URL}/blog` },
  openGraph: {
    title: 'Contract Review Guides & Resources | Revealr',
    description: 'Practical guides on reading contracts — leases, employment, NDAs, freelance, and more.',
    url: `${APP_URL}/blog`,
    siteName: 'Revealr',
    type: 'website',
  },
};

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  lease: 'Lease & Rental',
  employment: 'Employment',
  nda: 'NDA & Restrictive',
  freelance: 'Freelance & Services',
  general: 'Contract Review',
};

const CATEGORY_LANDING: Record<BlogCategory, { href: string; label: string }> = {
  lease: { href: '/lease-agreement-analyzer', label: 'Lease Analyzer' },
  employment: { href: '/employment-contract-review', label: 'Employment Review' },
  nda: { href: '/nda-review', label: 'NDA Review' },
  freelance: { href: '/freelance-contract-review', label: 'Freelance Review' },
  general: { href: '/contract-risk-checker', label: 'Contract Risk Checker' },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogIndexPage() {
  const categories = (Object.keys(CATEGORY_LABELS) as BlogCategory[]).filter(
    (cat) => getBlogPostsByCategory(cat).length > 0
  );

  return (
    <main className="bg-[#faf9f7] min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-white border-b border-[#e8e4df] py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-[#e8572a] uppercase tracking-widest mb-4">Resources</p>
          <h1
            className="text-[#1a1814] font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Contract Review Guides
          </h1>
          <p className="text-[#6b6560] text-lg leading-relaxed max-w-2xl">
            Practical, jargon-free guides on what to check in rental leases, employment contracts, NDAs, freelance
            agreements, and any other document you're asked to sign.
          </p>
        </div>
      </section>

      {/* ── Articles by category ── */}
      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {categories.map((cat) => {
            const posts = getBlogPostsByCategory(cat);
            const landing = CATEGORY_LANDING[cat];
            return (
              <div key={cat}>
                {/* Category header */}
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-bold text-[#1a1814]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </h2>
                  <Link
                    href={landing.href}
                    className="text-xs text-[#e8572a] hover:underline font-semibold"
                  >
                    {landing.label} →
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group bg-white border border-[#e8e4df] rounded-xl p-6 hover:border-[#e8572a] hover:shadow-sm transition-all"
                    >
                      <p className="text-xs text-[#9c9590] mb-2">
                        {formatDate(post.publishedAt)} · {post.readingTime} min read
                      </p>
                      <h3 className="font-bold text-[#1a1814] leading-snug mb-2 group-hover:text-[#e8572a] transition-colors">
                        {post.h1}
                      </h3>
                      <p className="text-sm text-[#6b6560] leading-relaxed">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Inline CTA ── */}
      <section className="py-14 px-6 bg-[#1a1814]">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Ready to analyze your contract?
          </h2>
          <p className="text-white/60 mb-7 leading-relaxed">
            Upload any contract and get a full AI risk analysis in 60 seconds. Free preview.
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
