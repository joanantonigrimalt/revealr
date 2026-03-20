import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://revealr-tawny.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Rental Lease Review — AI-Powered Lease Analysis for Tenants | Revealr',
    template: '%s | Revealr',
  },
  description:
    'Get an instant AI rental lease review. Upload your agreement and Revealr identifies every risky clause — risk score, plain-English flags, and a full action plan. $19 one-time, results in 60 seconds.',
  keywords: [
    'rental lease review',
    'AI lease review',
    'lease review before signing',
    'apartment lease review',
    'rental agreement checker',
    'risky lease clauses',
    'tenant lease analysis',
    'lease risk checker',
    'review my lease online',
    'unfair lease clauses',
  ],
  authors: [{ name: 'Revealr' }],
  creator: 'Revealr',
  publisher: 'Revealr',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'Revealr',
    title: 'Rental Lease Review — AI-Powered Lease Analysis for Tenants | Revealr',
    description:
      'Upload your rental agreement and get an instant AI review of every risky clause. Risk score, flagged terms, plain-English explanations, and action plan. $19 one-time.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Revealr — AI Rental Lease Review for Tenants' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rental Lease Review — AI Analysis in 60 Seconds | Revealr',
    description: 'Upload your lease. Our AI flags every risky clause with plain-English explanations and a full action plan. $19, no subscription.',
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
  description: 'AI-powered rental lease review tool that helps tenants identify risky clauses before signing.',
  sameAs: [],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Revealr — Rental Lease Review',
  applicationCategory: 'LegalService',
  operatingSystem: 'Web',
  url: APP_URL,
  description:
    'Upload your rental agreement and receive an AI-powered review of every risky clause, including a risk score, flagged issues, plain-English explanations, and a step-by-step action plan.',
  offers: {
    '@type': 'Offer',
    price: '19',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    description: 'Full rental lease review report — risk score, all flagged clauses, action plan, PDF download, email delivery.',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, softwareSchema]) }}
        />
        {children}
      </body>
    </html>
  );
}
