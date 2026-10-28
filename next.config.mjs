const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https: https://www.google-analytics.com https://www.googletagmanager.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https: wss: https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://cloudflareinsights.com;
  frame-src 'self' https://www.googletagmanager.com https://tagassistant.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self' https://tagassistant.google.com;
  upgrade-insecure-requests;
`;

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
        key: 'X-XSS-Protection',
        value: '0'
    },
    {
        key: 'X-Frame-Options',
        value: 'DENY'
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(self), browsing-topics=()'
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
    },
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
    }
]



/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async headers() {
      return [
          {
              source: '/(.*)',
              headers: securityHeaders,
          },
      ]
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  reactCompiler: true,
  productionBrowserSourceMaps: false,
  useFileSystemPublicRoutes: true,
  poweredByHeader: false,
  allowedDevOrigins: [
    'a5f1-2a09-bac1-3680-00-10c-35.ngrok-free.app'
  ],
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'date-fns', '@headlessui/react', 'framer-motion'],
  },
  generateBuildId: async () => {
      // You can, for example, get the latest git commit hash here
      return '2.5.2'
  },
};

export default nextConfig;
