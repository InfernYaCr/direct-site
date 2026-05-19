import { defineConfig } from 'astro/config';

declare const process: {
  env: Record<string, string | undefined>;
};

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: isGitHubPages ? 'https://infernyacr.github.io' : 'http://127.0.0.1:4321',
  base: isGitHubPages ? '/direct-site' : '/',
  compressHTML: true,
  build: {
    assets: '_assets',
  },
});
