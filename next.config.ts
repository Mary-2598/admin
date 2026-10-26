import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: { root: path.join(__dirname) },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;