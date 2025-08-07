import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.elfsight.com https://www.googletagmanager.com https://www.google-analytics.com https://*.elfsight.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.elfsight.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob: https://*.elfsight.com https://*.instagram.com",
              "connect-src 'self' https://static.elfsight.com https://www.google-analytics.com https://*.elfsight.com https://*.instagram.com",
              "frame-src 'self' https://static.elfsight.com https://*.elfsight.com https://*.instagram.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
