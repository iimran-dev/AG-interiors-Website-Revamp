import type { NextConfig } from "next";

// Configured base path for static hosting (e.g. GitHub Pages or subdirectory)
// Can be customized via NEXT_PUBLIC_BASE_PATH environment variable
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/ag-interiors").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath === "" ? undefined : basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  devIndicators: false,
};

export default nextConfig;
