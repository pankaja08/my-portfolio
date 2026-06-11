import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for faster deployments
  // output: "standalone", // uncomment if deploying to a server

  images: {
    // Allow WebP/AVIF — dramatically smaller than PNG on mobile
    formats: ["image/avif", "image/webp"],
    // Serve the right size for each device — avoids loading 1.9 MB on a 390px phone
    deviceSizes: [390, 430, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 1 hour (Vercel default is 60s)
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod.spline.design",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;

