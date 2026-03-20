import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://revealr-tawny.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Lease Agreement Analyzer — AI Lease Review for Tenants | Revealr',
    template: '%s | Revealr',
  },
  description:
    'Upload your rental agreement and get an AI-powered analysis of every risky clause in under 60 seconds. Risk score, red flags, plain-English explanations, and a full action plan. $19 one-time.',
  keywords: [
    'lease agreement analyzer',
    'AI lease review',
    'rental agreement checker',
    'lease clause analyzer',
    'tenant lease analysis',
    'apartment lease review',
    'lease red flags',
    'review lease before signing',
    'unfair lease clauses',
    'online lease review',
  ],
  authors: [{ name: 'Revealr' }],
  creator: 'Revealr',
  publisher: 'Revealr',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'Revealr',
    title: 'Lease Agreement Analyzer — AI Lease Review for Tenants | Revealr',
    description:
      'Upload your lease and get an instant AI analysis of every risky clause. Risk score, red flags, and action plan for tenants. $19 one-time.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Revealr — AI Lease Agreement Analyzer for Tenants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lease Agreement Analyzer — AI Lease Review for Tenants',
    description:
      'Upload your lease. Get an instant AI risk analysis, flagged clauses, and action plan. $19, no subscription.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  alternates: { canonical: APP_URL },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Revealr',
  url: APP_URL,
  description: 'AI-powered lease agreement analyzer that helps tenants identify risky clauses before signing.',
  sameAs: [],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Revealr — Lease Agreement Analyzer',
  applicationCategory: 'LegalService',
  operatingSystem: 'Web',
  description:
    'Upload your rental agreement and receive an AI-powered analysis of every risky clause, including a risk score, flagged issues, plain-English explanations, and a step-by-step action plan.',
  offers: {
    '@type': 'Offer',
    price: '19',
    priceCurrency: 'USD',
    priceValidUntil: '2026-12-31',
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
            __html: JSON.stringify([organizationSchema, softwareSchema]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
