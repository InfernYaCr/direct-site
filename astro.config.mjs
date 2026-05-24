import { defineConfig } from "astro/config";

// ЗАМЕНИТЬ на реальный домен перед запуском (или задать через SITE_URL при сборке).
const site = process.env.SITE_URL || "https://navigator.example";

export default defineConfig({
  site,
  output: "static",
});
