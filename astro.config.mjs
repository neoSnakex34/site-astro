// @ts-nocheck
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // English-only site. The Italian locale was retired: its pages now live in
  // old_locale_deprecated/ and every legacy /it/* URL redirects to its English
  // counterpart (see `redirects` below).
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // Static build: Astro emits a small HTML page per entry with a <meta refresh>
  // and a <link rel="canonical"> so crawlers follow the hop.
  redirects: {
    "/it": "/",
    "/it/about": "/about",
    "/it/skills": "/skills",
    "/it/works": "/works",
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@tsparticles/astro"],
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  site: "https://francescojames.dev",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-GB",
        },
      },
    }),
    ],
    server: {
        host: true,
        port: 4321
    }
});
