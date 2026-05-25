import { defineConfig } from "astro/config";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const hasCustomSite = Boolean(process.env.SITE_URL);
const site = process.env.SITE_URL || (isGitHubPages ? "https://infernyacr.github.io" : "http://127.0.0.1:4321");
const base = process.env.BASE_PATH || (isGitHubPages && !hasCustomSite ? "/direct-site" : "/");

export default defineConfig({
  site,
  base,
  output: "static",
  compressHTML: true,
  build: {
    assets: "_assets",
  },
});
