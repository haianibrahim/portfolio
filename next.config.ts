import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // disables automatic image optimization (works better on non-Vercel platforms)
  },
  distDir: 'out', // optional; just make sure your server references the right build output
  output: 'standalone', // bundles only the necessary server files for deployment
  reactStrictMode: true, // good practice
  poweredByHeader: false, // hides "X-Powered-By: Next.js"
};

export default nextConfig;
