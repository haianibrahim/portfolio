import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // disables automatic image optimization (works better on non-Vercel platforms)
  },
  distDir: 'out', // optional; just make sure your server references the right build output
  reactStrictMode: true, // good practice
  poweredByHeader: false, // hides "X-Powered-By: Next.js"
  trailingSlash: true, // adds trailing slash to all routes
};

export default nextConfig;
