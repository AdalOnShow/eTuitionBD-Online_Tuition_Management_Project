import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.ibb.co.com" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  allowedDevOrigins: [
    "*.lvh.me",
    "lvh.me",
    "*.risetogetherbd.shop",
    "risetogetherbd.shop",
  ],
};

export default nextConfig;
