import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { seoPages, getPageBySlug, getAllSlugs } from '@/content/seo-pages';
import {
  generateSEOMetadata,
  buildFAQSchema,
  buildBreadcrumbSchema,
  buildSoftwareAppSchema,
  buildProductSchema,
  TOOL_PAGE_SLUGS,
} from '@/lib/seo';
import PageHero from '@/components/seo/PageHero';
import WhatRevealrChecks from '@/components/seo/WhatRevealrChecks';
import SampleOutput from '@/components/seo/SampleOutput';
import WhoThisIsFor from '@/components/seo/WhoThisIsFor';
import PageFAQ from '@/components/seo/PageFAQ';
import RelatedPages from '@/components/seo/RelatedPages';
import PageCTA from '@/components/seo/PageCTA';
import LegalDisclaimer from '@/components/seo/LegalDisclaimer';

// ─────────────────────────────────────────────────────────────────────────────
// Static params — generates all 20 pages at build time
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = getPageBySlug(params.slug);
  if (!page) return {};
  return generateSEOMetadata(page);
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function SEOPage({ params }: { params: { slug: string } }) {
  const page = getPageBySlug(params.slug);
  if (!page) notFound();

  const isToolPage = TOOL_PAGE_SLUGS.has(page.slug);

  return (
    <>
      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFAQSchema(page) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildBreadcrumbSchema(page) }}
      />
      {isToolPage && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: buildSoftwareAppSchema() }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: buildProductSchema() }}
          />
        </>
      )}

      <main>
        {/* 1. Hero — upload widget + H1 */}
        <PageHero
          h1={page.h1}
          intro={page.intro}
          ctaMicrocopy={page.ctaMicrocopy}
        />

        {/* 2. What Revealr checks */}
        <WhatRevealrChecks
          title={page.checksTitle}
          h2={page.h2s[0]}
          checks={page.checks}
        />

        {/* 3. Sample output */}
        <SampleOutput
          h2={page.h2s[1]}
          documentLabel={page.sampleDocumentLabel}
          flags={page.sampleFlags}
        />

        {/* 4. Who this is for + why review stat */}
        <WhoThisIsFor
          h2={page.h2s[2]}
          items={page.whoThisIsFor}
          whyReviewStat={page.whyReviewStat}
        />

        {/* 5. FAQ */}
        <PageFAQ h2="Frequently Asked Questions" faqs={page.faqs} />

        {/* 6. Related pages interlinking */}
        <RelatedPages pages={page.relatedPages} />

        {/* 7. Final CTA with upload widget */}
        <PageCTA ctaMicrocopy={page.ctaMicrocopy} />

        {/* 8. Legal disclaimer */}
        <LegalDisclaimer disclaimer={page.disclaimer} />
      </main>
    </>
  );
}
