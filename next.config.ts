import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "https://bncc-computacao.vercel.app",
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
