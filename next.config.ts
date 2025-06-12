import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static export for Chrome Extension or static hosting

  eslint: {
    ignoreDuringBuilds: true, // Optional: skips ESLint during build
  },

  // You can add other config options below as needed
};

export default nextConfig;
