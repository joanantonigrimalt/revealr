import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/content/seo-pages';
import { blogPosts } from '@/content/blog-posts';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://getrevealr.com';

// Static page creation dates (real content dates)
const STATIC_DATES: Record<string, string> = {
  '/':            new Date().toISOString(), // changes frequently
  '/how-it-works': '2025-01-10',
  '/about':        '2025-01-10',
  '/blog':         new Date().toISOString(), // index updates with each new post
  '/privacy':      '2025-01-10',
  '/terms':        '2025-01-10',
};

// SEO landing pages — content created/last updated date
const SEO_PAGE_DATES: Record<string, string> = {
  'lease-agreement-analyzer':             '2025-01-15',
  'analyze-my-lease':                     '2025-01-15',
  'security-deposit-clause-checker':      '2025-01-20',
  'lease-red-flags-before-signing':       '2025-01-20',
  'employment-contract-review':           '2025-01-25',
  'job-offer-review':                     '2025-01-25',
  'nda-review':                           '2025-02-01',
  'termination-clause-review':            '2025-02-01',
  'lease-renewal-review':                 '2025-02-05',
  'rental-lease-review':                  '2025-02-05',
  'non-compete-agreement-review':         '2025-02-10',
  'freelance-contract-review':            '2025-02-10',
  'service-agreement-review':             '2025-02-15',
  'independent-contractor-agreement-review': '2025-02-15',
  'ip-assignment-agreement-review':       '2025-02-20',
  'consulting-agreement-review':          '2025-02-20',
  'landlord-entry-notice-clause':         '2025-02-25',
  'maintenance-responsibility-in-lease':  '2025-02-25',
  'review-contract-before-signing':       '2025-03-01',
  'contract-risk-checker':                '2025-03-01',
  'purchase-agreement-review':            '2025-03-05',
};

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static / trust pages ─────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: APP_URL,
      lastModified: STATIC_DATES['/'],
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${APP_URL}/how-it-works`,
      lastModified: STATIC_DATES['/how-it-works'],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${APP_URL}/about`,
      lastModified: STATIC_DATES['/about'],
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${APP_URL}/blog`,
      lastModified: STATIC_DATES['/blog'],
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${APP_URL}/privacy`,
      lastModified: STATIC_DATES['/privacy'],
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${APP_URL}/terms`,
      lastModified: STATIC_DATES['/terms'],
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ── 21 programmatic SEO landing pages ───────────────────────────────────
  const seoPages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${APP_URL}/${slug}`,
    lastModified: SEO_PAGE_DATES[slug] ?? '2025-03-01',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ── Blog articles — real publishedAt dates ───────────────────────────────
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${APP_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...seoPages, ...blogPages];
}
