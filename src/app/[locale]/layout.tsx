import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/common/Navigation';

import '../globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
  variable: '--font-inter',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: "Valdo Prosecco - Premium Italian Sparkling Wine",
    description: "Discover the legacy of Valdo Prosecco, crafted in the heart of Valdobbiadene with over 90 years of tradition. Experience the finest Italian sparkling wines.",
    keywords: "Valdo Prosecco, Italian sparkling wine, Valdobbiadene, premium prosecco, DOCG, wine, champagne alternative",
    authors: [{ name: "Valdo Prosecco" }],
    creator: "Valdo Prosecco",
    publisher: "Valdo Prosecco",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://valdoprosecco.com'),
    openGraph: {
      title: "Valdo Prosecco - Premium Italian Sparkling Wine",
      description: "Discover the legacy of Valdo Prosecco, crafted in the heart of Valdobbiadene with over 90 years of tradition.",
      url: 'https://valdoprosecco.com',
      siteName: 'Valdo Prosecco',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Valdo Prosecco - Premium Italian Sparkling Wine',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Valdo Prosecco - Premium Italian Sparkling Wine",
      description: "Discover the legacy of Valdo Prosecco, crafted in the heart of Valdobbiadene with over 90 years of tradition.",
      images: ['/images/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
    alternates: {
      canonical: `https://valdoprosecco.com/${locale}`,
      languages: {
        'en': 'https://valdoprosecco.com/en',
        'it': 'https://valdoprosecco.com/it',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        {/* Preconnect to optimize font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#D4AF37" />
        <meta name="msapplication-TileColor" content="#D4AF37" />
        
        {/* Viewport and mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Performance optimizations */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
      </head>
      <body className={inter.variable}>
        <Navigation />
        {children}
      </body>
    </html>
  );
} 