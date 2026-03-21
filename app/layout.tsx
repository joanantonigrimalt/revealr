import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

// Single source of truth for the canonical domain.
// Override via NEXT_PUBLIC_APP_URL in .env / Vercel dashboard.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://revealr.io';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Revealr — AI Contract Analysis. Know What You\'re Signing.',
    template: '%s | Revealr',
  },
  description:
    'Upload any contract — lease, employment, NDA, freelance — and get an AI risk analysis in 60 seconds. Risk score, flagged clauses, plain-English explanations, and an action plan. $19 one-time.',
  keywords: [
    'AI contract review',
    'contract analysis tool',
    'review contract online',
    'lease agreement analyzer',
    'employment contract review',
    'NDA review tool',
    'freelance contract checker',
    'contract risk checker',
    'AI document analysis',
    'contract red flags',
  ],
  authors: [{ name: 'Revealr' }],
  creator: 'Revealr',
  publisher: 'Revealr',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'Revealr',
    title: 'Revealr — AI Contract Analysis. Know What You\'re Signing.',
    description:
      'Upload any contract and get an AI risk analysis in 60 seconds. Risk score, flagged clauses, plain-English explanations, and a full action plan. $19 one-time.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Revealr — AI-Powered Contract Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revealr — AI Contract Analysis in 60 Seconds',
    description:
      'Upload any contract. Our AI flags every risky clause with plain-English explanations and a full action plan. $19, no subscription.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: { canonical: APP_URL },
};

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Revealr',
  url: APP_URL,
  logo: `${APP_URL}/og-image.png`,
  description:
    'Revealr is an AI-powered contract analysis tool. Upload any contract — lease, employment, NDA, freelance, service agreement — and get a full risk analysis in 60 seconds.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'hello@revealr.io',
  },
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Revealr',
  url: APP_URL,
  description:
    'AI-powered contract analysis for tenants, employees, freelancers, and anyone signing a legal document.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${APP_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const softwareSchema = {
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
    description:
      'Full contract analysis report — risk score, all flagged clauses, action plan, PDF download, email delivery.',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2400',
    bestRating: '5',
    worstRating: '1',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Epilogue:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema, softwareSchema]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
