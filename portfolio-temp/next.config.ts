import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "D:/MY_PORTFOLIO/portfolio-temp",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod.spline.design",
      },
    ],
  },
};

export default nextConfig;

