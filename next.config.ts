import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    minimumCacheTTL: 60,
    unoptimized: true // This will prevent Next.js from trying to optimize Cloudinary images
  }
};

export default nextConfig;
