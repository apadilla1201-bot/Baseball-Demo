import type { NextConfig } from "next";

// GitHub Pages builds a static export under /<repo>; Vercel uses the default server build.
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? process.env.NEXT_PUBLIC_BASE_PATH ?? "" : "";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Cache Components / PPR are not available in export mode.
  cacheComponents: !pages,
  partialPrefetching: !pages,
  ...(pages
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
