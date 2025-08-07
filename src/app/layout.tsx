import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap', // Optimize font loading
});

export const metadata: Metadata = {
  title: "Valdo Prosecco - Premium Italian Sparkling Wine",
  description: "Discover the legacy of Valdo Prosecco, crafted in the heart of Valdobbiadene with over 90 years of tradition. Experience the finest Italian sparkling wines.",
  keywords: "Valdo Prosecco, Italian sparkling wine, Valdobbiadene, DOCG, premium prosecco, Italian wine",
  authors: [{ name: "Valdo Americas" }],
  creator: "Valdo Americas",
  publisher: "Valdo Americas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://valdo-prosecco-aopb8wlbt-michael-capaces-projects-f6224d63.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Valdo Prosecco - Premium Italian Sparkling Wine",
    description: "Discover the legacy of Valdo Prosecco, crafted in the heart of Valdobbiadene with over 90 years of tradition.",
    url: 'https://valdo-prosecco-aopb8wlbt-michael-capaces-projects-f6224d63.vercel.app',
    siteName: 'Valdo Prosecco',
    images: [
      {
        url: '/images/Logos/Valdo Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Valdo Prosecco Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Valdo Prosecco - Premium Italian Sparkling Wine",
    description: "Discover the legacy of Valdo Prosecco, crafted in the heart of Valdobbiadene with over 90 years of tradition.",
    images: ['/images/Logos/Valdo Logo New.png'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/images/Vineyards/Copia di colline.jpg" as="image" />
        <link rel="preload" href="/images/Logos/Valdo Logo New.png" as="image" />
        <link rel="preload" href="/images/Bottle Shots/Marca Oro Prosecco DOC Brut USA.png" as="image" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//static.elfsight.com" />
        <link rel="dns-prefetch" href="//www.instagram.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://static.elfsight.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.instagram.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.variable}>
        {children}
        
        {/* Elfsight Instagram Feed Script - Loaded with optimization */}
        <Script
          src="https://static.elfsight.com/platform/platform.js"
          strategy="lazyOnload"
        />
        
        {/* Performance monitoring script */}
        <Script
          id="performance-monitoring"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize performance optimizations
              if (typeof window !== 'undefined') {
                // Monitor Core Web Vitals
                if ('PerformanceObserver' in window) {
                  // LCP
                  new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                  }).observe({ entryTypes: ['largest-contentful-paint'] });

                  // FID
                  new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    });
                  }).observe({ entryTypes: ['first-input'] });

                  // CLS
                  new PerformanceObserver((entryList) => {
                    let clsValue = 0;
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                      if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                      }
                    });
                    console.log('CLS:', clsValue);
                  }).observe({ entryTypes: ['layout-shift'] });
                }

                // Track page load time
                window.addEventListener('load', () => {
                  const loadTime = performance.now();
                  console.log('Page load time:', loadTime);
                });

                // Initialize Elfsight when script loads
                window.addEventListener('load', () => {
                  if (typeof window !== 'undefined' && window.elfsight) {
                    window.elfsight.init();
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
