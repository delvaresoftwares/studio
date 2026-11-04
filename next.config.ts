import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  // There is a stray lockfile in the home directory, so Next would otherwise
  // trace output from /home/wave instead of this project.
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      // The journal moved from /blog to /blogs. Keep the old URLs working so
      // existing links and any indexed posts do not 404.
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/blog/:slug', destination: '/blogs/:slug', permanent: true },
    ];
  },
  async headers() {
    // Keep this list conservative: everything the site actually loads is
    // same-origin, Next's inline bootstrap scripts, or Google Analytics.
    //
    // `unsafe-eval` is only needed by the dev server (HMR/turbopack). A
    // production build never evaluates strings, so it is omitted there.
    // `unsafe-inline` remains for Next's bootstrap script and the GA snippet;
    // removing it needs build-time nonces, which conflict with static pages.
    const isDev = process.env.NODE_ENV !== 'production';
    const scriptSrc = [
      "script-src 'self' 'unsafe-inline'",
      isDev ? "'unsafe-eval'" : '',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
    ]
      .filter(Boolean)
      .join(' ');

    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      scriptSrc,
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "media-src 'self'",
      "worker-src 'self' blob:",
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.justinmind.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'c0.wallpaperflare.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.goodfon.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
