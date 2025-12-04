import type { NextConfig } from "next";

/**
 * Utilisation d'un cast 'as unknown as NextConfig' pour contourner le typage strict
 * tout en gardant eslint.ignoreDuringBuilds
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
} as unknown as NextConfig;

export default nextConfig;
