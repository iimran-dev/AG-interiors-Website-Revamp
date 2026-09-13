import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/v36suites",
  images: {
    unoptimized: true,
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
