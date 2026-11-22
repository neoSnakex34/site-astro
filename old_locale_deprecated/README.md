# old_locale_deprecated

Frozen dump of the old Italian localization layer of the site. Nothing in here is
built, type-checked or imported by `src/` anymore (excluded in `tsconfig.json`).
Kept for reference and in case the Italian version is restored later.

Moved here from `src/` on 2026-11-22 (branch `twopointo`):

```
old_locale_deprecated/
└── src/
    ├── components/
    │   ├── LocaleSelector.astro   ← was src/components/LocaleSelector.astro
    │   └── it/                    ← was src/components/it/  (Card, Footer, Landing, Navbar, NeroneModal)
    ├── layouts/
    │   └── it/Layout.astro        ← was src/layouts/it/Layout.astro
    └── pages/
        └── it/                    ← was src/pages/it/  (about, index, skills, works)
```

## What changed in the live site

Structural cleanup:

- `src/components/Navbar.astro`: removed the `LocaleSelector` import and its
  usage in `navbar-start`.
- `src/components/Footer.astro`: removed the `LocaleSelector` import and the
  whole `<nav>` block with the "Language" footer title.

Locale retirement:

- `astro.config.mjs`: `i18n.locales` is now `["en"]` (sitemap `i18n.locales` is
  `{ en: "en-GB" }`), and a `redirects` map sends every legacy Italian URL to its
  English counterpart:

  | Legacy URL | Redirects to |
  |---|---|
  | `/it` | `/` |
  | `/it/about` | `/about` |
  | `/it/skills` | `/skills` |
  | `/it/works` | `/works` |

  Static build → one `dist/it/**/index.html` stub per entry with a
  `<meta http-equiv="refresh">`, `noindex` and a canonical pointing at the target.
- `src/layouts/Layout.astro`: dropped `itCanonical`, so only `hreflang="en"` and
  `hreflang="x-default"` are emitted (both = the page's canonical URL).
- `src/layouts/Layout.astro`: the layout script now purges the legacy
  `localStorage["lang"]` key that `LocaleSelector` used to write.
- `src/components/Whoami.astro`: the `isItalian` / Italian `ariaLabel` branch is
  commented out, English label hardcoded.
- `src/pages/404.astro`: the `it` translations object and the client-side
  `pathname.startsWith("/it")` swap are commented out (kept for review).

The paths above mirror the old `src/` tree, so restoring a file is a plain
`git mv old_locale_deprecated/src/<path> src/<path>`.

## Notes for a future review

- There was **never** a locale cookie. The old selector stored the choice in
  `localStorage` under the key `lang` and navigated by prefixing/stripping `/it`
  on the current pathname. `LocaleSelector.astro` is preserved here intact.
- Keep the `redirects` entries in `astro.config.mjs` even if Italian never
  returns: those URLs are indexed and linked externally.
- To genuinely restore Italian you need: pages + components + layout here moved
  back into `src/`, the `it` locale re-added to `astro.config.mjs` (i18n +
  sitemap), the `hreflang="it"` alternate restored in `Layout.astro`, the
  redirects removed, and the language UI (selector or cookie/path strategy)
  reintroduced.
