// @ts-nocheck
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";


import sitemap from "@astrojs/sitemap";


// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "en",
  },
  vite: {
      plugins: [tailwindcss()],
  },
  site: "https://francescojames.dev",
  integrations: [sitemap()],
});