import type { NextConfig } from "next";

// @ts-ignore - next-pwa doesn't have TypeScript definitions
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Temporarily disable to prevent double-mounting in dev
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
