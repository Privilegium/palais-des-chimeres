import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild
    ? {
        output: "export",
        basePath: "/palais-des-chimeres",
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
        turbopack: {
          resolveAlias: {
            "@/actions/send-inquiry": "./src/actions/send-inquiry.preview.ts",
          },
        },
      }
    : {}),
};

export default nextConfig;
