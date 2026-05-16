import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com', // заменить на реальный домен
  compressHTML: true,
  build: {
    assets: '_assets',
  },
});
