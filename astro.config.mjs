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
  // NOTE: Astro only accepts an object map here (no array/from-to syntax),
  // so the legacy /posts/<slug> URLs are listed explicitly.
  redirects: {
    "/it": "/",
    "/it/about": "/about",
    "/it/skills": "/skills",
    "/it/works": "/works",
    // Posts used to live under /posts/<slug>; they now live under
    // /blog/<slug>. Keep the old URLs resolving (they are indexed/linked).
    // Only posts that were published under /posts/ need an entry — new
    // posts go straight to /blog/ and never need one.
    "/posts/post-1": "/blog/post-1",
    "/posts/post-2": "/blog/post-2",
    "/posts/post-3": "/blog/post-3",
    // CVs live in the private Scaleway bucket (CI uploads) and are
    // served by the francescojames-cv Cloudflare Pages project at
    // cv.francescojames.dev, so Cloudflare's edge absorbs link
    // hammering and the bucket is never publicly readable. PDFs are
    // served inline. These stubs keep the short URLs working.
    "/cv": "https://cv.francescojames.dev/cv/cv.pdf",
    "/cv-ita": "https://cv.francescojames.dev/cv/cv-ita.pdf",
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@tsparticles/astro"],
    },
    build: {
      rollupOptions: {
        output: {
          // Give the Particles component script a stable, hash-free filename
          // so Layout.astro can <link rel="modulepreload"> it. The browser
          // then starts downloading the tsparticles chunks during <head>
          // parsing instead of waiting until the <script> tag in <body>.
          entryFileNames: (chunkInfo) =>
            chunkInfo.name.includes("Particles")
              ? "_astro/particles.js"
              : "_astro/[name].[hash].js",
        },
      },
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
