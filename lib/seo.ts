import type { Metadata } from 'next';
import type { SEOPage } from '@/content/seo-pages';

// Single source of truth — matches app/layout.tsx
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://revealr.io';

/**
 * Per-page metadata for the 20 programmatic SEO pages.
 * Uses `title.absolute` so the root layout template ("%s | Revealr") is
 * NOT applied — pages already include the brand in their title field.
 */
export function generateSEOMetadata(page: SEOPage): Metadata {
  const canonical = `${APP_URL}/${page.slug}`;

  // Use the default OG image since per-page images don't exist yet.
  // Swap to `${APP_URL}/og/${page.slug}.png` once you generate them.
  const ogImage = `${APP_URL}/og-image.png`;

  return {
    title: { absolute: page.title },
    description: page.metaDescription,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: canonical,
      siteName: 'Revealr',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription,
      images: [ogImage],
    },
  };
}

/**
 * FAQ schema (JSON-LD) — inject as <script type="application/ld+json"> in each page
 */
export function buildFAQSchema(page: SEOPage): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return JSON.stringify(schema);
}

/**
 * Breadcrumb schema — Home > page name
 */
export function buildBreadcrumbSchema(page: SEOPage): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: APP_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.h1,
        item: `${APP_URL}/${page.slug}`,
      },
    ],
  };
  return JSON.stringify(schema);
}

/**
 * SoftwareApplication schema — only for hub/tool pages (see TOOL_PAGE_SLUGS below)
 */
export function buildSoftwareAppSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Revealr',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: APP_URL,
    description:
      'AI-powered contract and document analysis. Upload any contract and get a risk score, flagged clauses, and plain-English explanations in 60 seconds.',
    offers: {
      '@type': 'Offer',
      price: '19',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2400',
      bestRating: '5',
      worstRating: '1',
    },
  };
  return JSON.stringify(schema);
}

/**
 * Article schema — for blog posts
 */
export function buildArticleSchema(params: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
}): string {
  const { title, description, slug, publishedAt, updatedAt } = params;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${APP_URL}/blog/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Revealr',
      url: APP_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Revealr',
      url: APP_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${APP_URL}/blog/${slug}`,
    },
  };
  return JSON.stringify(schema);
}

// Slugs for which we also inject SoftwareApplication schema
export const TOOL_PAGE_SLUGS = new Set([
  'lease-agreement-analyzer',
  'contract-risk-checker',
  'employment-contract-review',
  'nda-review',
  'freelance-contract-review',
]);
