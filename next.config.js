const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts');

// Comprehensive security headers configuration
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.elfsight.com *.google-analytics.com *.googletagmanager.com *.mixpanel.com *.sentry.io https://vercel.live;
      connect-src 'self' https://*.elfsight.com https://*.instagram.com https://api.instagram.com *.google-analytics.com *.mixpanel.com *.sentry.io https://vercel.live https://api.vercel.com;
      frame-src https://*.elfsight.com https://*.instagram.com https://www.instagram.com https://vercel.live https://www.google.com https://maps.google.com https://www.google.com/maps https://maps.googleapis.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.elfsight.com https://www.instagram.com https://cdn.jsdelivr.net;
      font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
      img-src 'self' data: https: blob: https://*.elfsight.com https://*.instagram.com https://scontent.cdninstagram.com *.google-analytics.com *.mixpanel.com *.sentry.io https://images.unsplash.com *.google.com *.googleapis.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
    `.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'X-Permitted-Cross-Domain-Policies',
    value: 'none'
  }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'cdn.jsdelivr.net'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // ESLint configuration - ignore errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuration - ignore errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  
  // Redirects - temporarily disabled
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/en',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = withNextIntl(nextConfig); 