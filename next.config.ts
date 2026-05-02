import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export: serve images directly without Next/Image optimization.
    unoptimized: true,
  },
};

export default nextConfig;
