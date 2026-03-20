import type { Metadata } from 'next';
import './globals.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://revealr.app';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Revealr — Know What You\'re Signing',
  description:
    'Upload your lease, pay $19, and get an AI-powered analysis that reveals every risk, flag, and action step — in under 60 seconds.',
  keywords: ['lease review', 'tenant rights', 'rental agreement', 'AI legal', 'lease analysis'],
  authors: [{ name: 'Revealr' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${APP_URL}/lease`,
    siteName: 'Revealr',
    title: 'Revealr — Know What You\'re Signing',
    description: 'AI-powered lease analysis. Upload your lease, pay $19, get a full risk report in seconds.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Revealr Lease Analysis' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revealr — Know What You\'re Signing',
    description: 'AI-powered lease analysis. Know every risk before you sign.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
