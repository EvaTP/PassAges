import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ❌ Ignore les erreurs ESLint lors du build
    ignoreDuringBuilds: true,
  },

  /* config options here */
};

export default nextConfig;
