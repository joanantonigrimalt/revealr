import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  blogPosts,
  getBlogPostBySlug,
  getAllBlogSlugs,
} from '@/content/blog-posts';
import { buildArticleSchema } from '@/lib/seo';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://getrevealr.com';

// ─────────────────────────────────────────────────────────────────────────────
// Static params — pre-render all 10 articles at build time
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  const canonical = `${APP_URL}/blog/${post.slug}`;

  return {
    title: { absolute: `${post.title} | Revealr` },
    description: post.metaDescription,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: canonical,
      siteName: 'Revealr',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: `${APP_URL}/og-image.png`, width: 1200, height: 630, alt: post.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [`${APP_URL}/og-image.png`],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.metaDescription,
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  });

  // Breadcrumb schema
  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${APP_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.h1, item: `${APP_URL}/blog/${post.slug}` },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />

      <main className="bg-[#faf9f7] min-h-screen">
        {/* ── Article header ── */}
        <section className="bg-white border-b border-[#e8e4df] py-12 px-6">
          <div className="max-w-2xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#9c9590] mb-6">
              <Link href="/" className="hover:text-[#e8572a] transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="hover:text-[#e8572a] transition-colors">Blog</Link>
              <span aria-hidden="true">/</span>
              <span className="text-[#6b6560]">{post.h1}</span>
            </nav>

            <h1
              className="text-[#1a1814] font-bold leading-tight mb-4"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.02em',
              }}
            >
              {post.h1}
            </h1>

            <div className="flex items-center gap-3 text-xs text-[#9c9590]">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
              {post.updatedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Updated {formatDate(post.updatedAt)}</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── Article body ── */}
        <section className="py-12 px-6">
          <div className="max-w-2xl mx-auto">
            {/* Inline CTA — relevant landing */}
            <div className="bg-[#fdf0eb] border border-[#f0cfc0] rounded-xl p-4 mb-10 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm text-[#1a1814]">
                <span className="font-semibold">Skip the reading?</span> Upload your contract and get an AI analysis in
                60 seconds.
              </p>
              <Link
                href={post.relatedLanding.href}
                className="flex-shrink-0 text-xs font-bold text-white bg-[#e8572a] hover:bg-[#c94820] px-4 py-2 rounded-lg transition-colors"
              >
                {post.relatedLanding.anchor} →
              </Link>
            </div>

            {/* Sections */}
            {post.sections.map((section, i) => (
              <div key={i} className="mb-10">
                <h2
                  className="text-xl font-bold text-[#1a1814] mb-4"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {section.h2}
                </h2>

                {section.paragraphs.map((para, j) =>
                  para.trim() ? (
                    <p key={j} className="text-[#444] leading-relaxed mb-4">
                      {para}
                    </p>
                  ) : null
                )}

                {section.h3s?.map((h3, k) => (
                  <div key={k} className="mb-5 pl-4 border-l-2 border-[#e8e4df]">
                    <h3 className="font-bold text-[#1a1814] mb-1.5">{h3.heading}</h3>
                    <p className="text-sm text-[#6b6560] leading-relaxed">{h3.body}</p>
                  </div>
                ))}
              </div>
            ))}

            {/* Legal disclaimer */}
            <div className="bg-[#faf9f7] border border-[#e8e4df] rounded-xl p-5 mt-10">
              <p className="text-xs text-[#9c9590] leading-relaxed">
                <strong className="text-[#6b6560]">Not legal advice.</strong> This article is for informational
                purposes only. It does not constitute legal advice and is not a substitute for consultation with a
                licensed attorney in your jurisdiction. Laws vary significantly by state and country.
              </p>
            </div>
          </div>
        </section>

        {/* ── Related posts ── */}
        {post.relatedPosts.length > 0 && (
          <section className="py-12 px-6 bg-white border-t border-[#e8e4df]">
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-lg font-bold text-[#1a1814] mb-5"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Related guides
              </h2>
              <div className="space-y-3">
                {post.relatedPosts.map(({ href, anchor }) => {
                  const related = blogPosts.find((p) => `/blog/${p.slug}` === href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-start gap-3 group p-4 bg-[#faf9f7] border border-[#e8e4df] rounded-xl hover:border-[#e8572a] transition-colors"
                    >
                      <svg
                        width="14" height="14"
                        viewBox="0 0 24 24" fill="none"
                        stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className="flex-shrink-0 mt-0.5" aria-hidden="true"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <div>
                        <p className="font-semibold text-sm text-[#1a1814] group-hover:text-[#e8572a] transition-colors">
                          {anchor}
                        </p>
                        {related && (
                          <p className="text-xs text-[#9c9590] mt-0.5">{related.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section className="py-14 px-6 bg-[#1a1814]">
          <div className="max-w-xl mx-auto text-center">
            <h2
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Analyze your contract now
            </h2>
            <p className="text-white/60 mb-7 leading-relaxed">
              Upload any contract and get a full risk analysis in 60 seconds. Free preview, $19 to unlock.
            </p>
            <Link
              href={post.relatedLanding.href}
              className="inline-flex items-center gap-2 bg-[#e8572a] hover:bg-[#c94820] text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              {post.relatedLanding.anchor} →
            </Link>
            <p className="text-white/40 text-xs mt-4">
              No account required · Encrypted in transit · Results in 60 seconds
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
