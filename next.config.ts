import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // 개발 환경에서는 basePath를 사용하지 않음 (localhost:3000에서 바로 접근 가능)
  basePath: process.env.NODE_ENV === "production" ? "/greater-love-church" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/greater-love-church/" : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
