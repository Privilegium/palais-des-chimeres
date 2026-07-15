import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // Lets a phone on the same Wi‑Fi load the development client bundle, so
  // interactive controls (menu, carousels, modals) hydrate correctly.
  allowedDevOrigins: ["192.168.1.157", "127.0.0.1"],
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
