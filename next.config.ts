import { hiddenSections } from "./app/lib/sectionVisibility";
import type { NextConfig } from "next";

// @ts-ignore - next-pwa doesn't have TypeScript definitions
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  reactStrictMode: false, // Temporarily disable to prevent double-mounting in dev
  async redirects() {
    return [...hiddenSections, '/miracles'].map(path => ({
      source: `${path}/:path*`, destination: '/', permanent: false,
    }));
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/assetlinks.json',
        destination: '/api/assetlinks',
      },
    ];
  },
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
