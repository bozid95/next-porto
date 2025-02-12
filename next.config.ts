import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "4.bp.blogspot.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
