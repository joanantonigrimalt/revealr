import type { Metadata } from 'next';
import type { SEOPage } from '@/content/seo-pages';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://revealr.io';

export function generateSEOMetadata(page: SEOPage): Metadata {
  const canonical = `${APP_URL}/${page.slug}`;

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: canonical,
      siteName: 'Revealr',
      type: 'website',
      images: [
        {
          url: `${APP_URL}/og/${page.slug}.png`,
          width: 1200,
          height: 630,
          alt: page.h1,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription,
      images: [`${APP_URL}/og/${page.slug}.png`],
    },
  };
}

/**
 * FAQ schema (JSON-LD) — inject as <script> in the page
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
 * SoftwareApplication schema — only for hub/tool pages
 */
export function buildSoftwareAppSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Revealr',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '19',
      priceCurrency: 'USD',
    },
    description:
      'AI-powered contract and document analysis. Upload any contract and get a risk score, flagged clauses, and plain-English explanations in 60 seconds.',
    url: APP_URL,
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
