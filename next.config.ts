import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
    minimumCacheTTL: 60,
    unoptimized: true // This will prevent Next.js from trying to optimize Cloudinary images
  }
};

export default nextConfig;
