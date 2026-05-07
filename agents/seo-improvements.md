# SEO Improvements — Native (no astro-seo)

**Date:** 2026  
**Scope:** `src/layouts/Layout.astro`, `src/layouts/it/Layout.astro`, `src/layouts/BlogPostLayout.astro`, `astro.config.mjs`  
**Goal:** Maximise on-page SEO signal natively in Astro, removing the dependency on the `astro-seo` package.

---

## Files Changed

| File | Type of change |
|---|---|
| `src/layouts/Layout.astro` | Full head rewrite + new props |
| `src/layouts/it/Layout.astro` | Full head rewrite + new props (IT variant) |
| `src/layouts/BlogPostLayout.astro` | SEO props wired + BlogPosting JSON-LD |
| `astro.config.mjs` | Sitemap i18n configuration |

---

## 1. `<meta charset>` and `<meta viewport>` moved to the top

**Both layouts — Priority: spec correctness**

The HTML spec requires `charset` to be within the first 1024 bytes of the document and before any content-dependent tags. Previously both were placed after `<title>` and other meta tags.

```html
<!-- Now first two tags in <head> -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width" />
```

---

## 2. Favicon re-enabled in EN layout

**`Layout.astro` — Priority: correctness**

The `<link rel="icon">` was commented out in the English layout, while the Italian one had it active. Both now declare it consistently. The MIME type was corrected from `image/svg+xml` to `image/x-icon` to match the `.ico` file served from `public/favicon.ico`.

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
```

---

## 3. `<meta name="author">` added

**Both layouts — Priority: minor signal**

```html
<meta name="author" content="Francesco James Fanti" />
```

---

## 4. `<meta name="theme-color">` added

**Both layouts — Priority: UX / mobile browsers**

Picked up by mobile browsers for address-bar tinting. Uses the DaisyUI `sunset` theme's `base-100` background colour.

```html
<meta name="theme-color" content="#1d1617" />
```

---

## 5. `og:url`, `og:locale`, `og:site_name` added

**Both layouts — Priority: high (Open Graph completeness)**

`og:url` must match the canonical URL. `og:locale` tells social platforms which language version is being shared. `og:site_name` provides consistent branding in link previews.

```html
<meta property="og:url"       content={canonical} />
<meta property="og:locale"    content="en_GB" />  <!-- it_IT in IT layout -->
<meta property="og:site_name" content="Francesco James Fanti" />
```

---

## 6. `twitter:image` bug fixed

**Both layouts — Priority: correctness**

Previously the Twitter image meta tag was conditionally rendered based on `ogImage` but then hardcoded the GitHub avatar URL, ignoring the actual `ogImage` value entirely. It now correctly uses the `ogImage` prop (which defaults to `/io.png`).

```html
<!-- Before (bug) -->
{ ogImage && <meta name="twitter:image" content="https://avatars.githubusercontent.com/u/97003970?v=4" /> }

<!-- After (fixed) -->
{ogImage && <meta name="twitter:image" content={ogImage} />}
```

---

## 7. `twitter:site` and `twitter:creator` added

**Both layouts — Priority: medium (Twitter/X Cards)**

These were referenced in the old commented-out `astro-seo` block but never actually emitted.

```html
<meta name="twitter:site"    content="@neosankex34" />
<meta name="twitter:creator" content="@neosankex34" />
```

---

## 8. `hreflang` alternate links — i18n duplicate content prevention

**Both layouts — Priority: HIGH (bilingual site)**

Without `hreflang`, Google may treat the EN and IT pages as duplicate content and suppress one from results. Each layout now declares both language alternates and an `x-default` pointing to the EN canonical.

**EN layout** derives the Italian URL by inserting `/it/` into the canonical:
```astro
const itCanonical = canonical
  ? canonical.replace("francescojames.dev", "francescojames.dev/it")
  : undefined;
```
```html
<link rel="alternate" hreflang="en"       href={canonical} />
<link rel="alternate" hreflang="it"       href={itCanonical} />
<link rel="alternate" hreflang="x-default" href={canonical} />
```

**IT layout** derives the English URL by stripping `/it/`:
```astro
const enCanonical = canonical
  ? canonical.replace("francescojames.dev/it", "francescojames.dev")
  : undefined;
```
```html
<link rel="alternate" hreflang="en"       href={enCanonical} />
<link rel="alternate" hreflang="it"       href={canonical} />
<link rel="alternate" hreflang="x-default" href={enCanonical} />
```

---

## 9. JSON-LD structured data — Person + WebSite schema

**Both layouts — Priority: medium (rich results eligibility)**

A `<script type="application/ld+json">` block is injected in every page via `set:html={JSON.stringify(jsonLd)}`. It uses a `@graph` with two nodes:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Francesco James Fanti",
      "url": "https://francescojames.dev",
      "sameAs": ["https://github.com/neosnakex34", "https://x.com/neosankex34"],
      "jobTitle": "Freelance Developer",
      "address": { "@type": "PostalAddress", "addressLocality": "Latina", "addressCountry": "IT" }
    },
    {
      "@type": "WebSite",
      "name": "Francesco James Fanti",
      "url": "https://francescojames.dev",
      "inLanguage": "en"
    }
  ]
}
```

The IT layout uses `"inLanguage": "it"` and `"jobTitle": "Sviluppatore Freelance"`.

---

## 10. `ogType` prop + article metadata support

**Both layouts — Priority: high for blog posts**

A new `ogType` prop (default `"website"`) allows callers to declare the Open Graph type. When set to `"article"`, two additional conditional meta tags are rendered:

```html
{ogType === "article" && pubDate &&
  <meta property="article:published_time" content={new Date(pubDate).toISOString()} />}
{ogType === "article" && articleAuthor &&
  <meta property="article:author" content={articleAuthor} />}
```

New Layout props:
| Prop | Type | Default | Description |
|---|---|---|---|
| `ogType` | `string` | `"website"` | OG type, e.g. `"article"` for blog posts |
| `pubDate` | `Date \| string` | `undefined` | Publication date for articles |
| `articleAuthor` | `string` | `undefined` | Author name for articles |

---

## 11. `<slot name="head" />` — per-page head injection

**Both layouts — Priority: extensibility**

A named slot was added inside `<head>` so that individual pages or layouts can inject additional tags without touching the base layout.

```html
<!-- in Layout.astro -->
<slot name="head" />
```

```astro
<!-- usage in a child layout -->
<Fragment slot="head">
  <script type="application/ld+json" set:html={...} />
</Fragment>
```

---

## 12. `BlogPostLayout.astro` — full SEO wiring

**`BlogPostLayout.astro` — Priority: HIGH (blog posts had zero custom SEO)**

Previously blog posts fell back to the generic Layout defaults, so every post shared the same title, description, and OG image. Now each post forwards its frontmatter to the Layout:

```astro
const canonical = `https://francescojames.dev${Astro.url.pathname}`;
const ogImage = frontmatter.image?.url
  ? `https://francescojames.dev${frontmatter.image.url}`
  : undefined;
```

Props passed to `<Layout>`:
- `title={frontmatter.title}`
- `description={frontmatter.description}`
- `ogImage={ogImage}`
- `ogType="article"`
- `pubDate={frontmatter.pubDate}`
- `articleAuthor={frontmatter.author}`
- `canonical={canonical}`

A `BlogPosting` JSON-LD schema is also injected via the new `head` slot:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "description": "...",
  "image": "...",
  "author": { "@type": "Person", "name": "...", "url": "https://francescojames.dev" },
  "datePublished": "YYYY-MM-DD",
  "url": "https://francescojames.dev/posts/...",
  "publisher": { "@type": "Person", "name": "Francesco James Fanti", "url": "https://francescojames.dev" }
}
```

---

## 13. Sitemap i18n configuration

**`astro.config.mjs` — Priority: medium (crawl efficiency)**

The `@astrojs/sitemap` integration now receives an `i18n` config, which causes it to emit `<xhtml:link rel="alternate">` entries in the generated XML for each page that has both an EN and IT version. This gives crawlers a machine-readable map of all language alternates.

```js
sitemap({
  i18n: {
    defaultLocale: "en",
    locales: {
      en: "en-GB",
      it: "it-IT",
    },
  },
}),
```

---

## Dead code removed

- `import { SEO } from "astro-seo"` (EN layout — was unused)
- `// import { SEO } from "astro-seo"` + `// TODO remove astro seo` comment (IT layout)
- Entire commented-out `<!-- <SEO ...> -->` block in both layouts
- `<!-- TODO SITEMAP ? -->` comment
- `<!-- <title>neosnakex34</title> -->` comment
- Hardcoded GitHub avatar URL from `twitter:image`

---

---

# SEO Round 2 — Local SEO (Latina / Rome) + Sitelink Targeting

**Date:** 2026  
**Scope:** Both layouts, all 8 pages  
**Goal:** Rank for "Francesco James - Sviluppatore Software" with "Chi Sono" / "Skill" sitelinks (IT) and the English equivalents; establish local authority for Latina, Rome and the Lazio region.

---

## 14. Default title brand identity

**Both layouts — Priority: HIGH (SERP brand anchor)**

The layout default titles now carry the brand identity used as the target SERP headline:

```
EN: "Francesco James - Software Developer"
IT: "Francesco James - Sviluppatore Software"
```

All inner pages use the format `"<Section> | Francesco James - <Title>"` so Google's sitelinks generator can extract clean section labels.

---

## 15. Per-page titles and descriptions — SERP-ready

**All 8 pages — Priority: HIGH**

| Page | Title (IT) | Title (EN) |
|---|---|---|
| Homepage | `Francesco James - Sviluppatore Software \| Latina, Italia` | `Francesco James - Software Developer \| Latina, Italy` |
| About | `Chi Sono \| Francesco James - Sviluppatore Software` | `About Me \| Francesco James - Software Developer` |
| Skills | `Skill \| Francesco James - Sviluppatore Software` | `Skills \| Francesco James - Software Developer` |
| Works | `Lavori \| Francesco James - Sviluppatore Software` | `Works \| Francesco James - Software Developer` |

Descriptions are now geo-targeted (mention Latina, Roma, Italia / Italy) and keyword-rich.

Bonus: the duplicate `title` prop bug on `skills.astro` and `it/skills.astro` (two `title=` attributes) was removed.

---

## 16. Enhanced Person JSON-LD schema

**Both layouts — Priority: HIGH (entity disambiguation + local rich results)**

The `Person` node in the `@graph` now includes:

```json
{
  "@type": "Person",
  "@id": "https://francescojames.dev/#person",
  "givenName": "Francesco",
  "familyName": "Fanti",
  "image": "https://francescojames.dev/io.png",
  "description": "Freelance software developer based in Latina ...",
  "jobTitle": "Freelance Software Developer",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Latina",
    "addressRegion": "Lazio",
    "addressCountry": "IT"
  },
  "areaServed": ["Latina", "Roma", "Italy"],
  "knowsAbout": ["JavaScript", "TypeScript", "React", "Astro", "Node.js", "Go", "Python", "Cloud Computing", ...]
}
```

New fields vs. round 1:
- `@id` — stable IRI so Google can link the Person across pages
- `givenName` / `familyName` — helps entity disambiguation
- `image` — links the headshot for Knowledge Panel eligibility
- `description` — crawlable bio with local keywords
- `addressRegion: "Lazio"` — region added (was only city before)
- `areaServed` — signals Latina + Roma service area
- `knowsAbout` — links the Person to skill topics

The `WebSite` node gains `@id` + `author` back-reference:

```json
{
  "@type": "WebSite",
  "@id": "https://francescojames.dev/#website",
  "author": { "@id": "https://francescojames.dev/#person" }
}
```

---

## 17. SiteNavigationElement — sitelink hints

**Both layouts — Priority: HIGH (sitelink targeting)**

Two `SiteNavigationElement` nodes are added to every page's `@graph`, explicitly naming the pages Google should surface as sitelinks:

**IT layout:**
```json
{ "@type": "SiteNavigationElement", "name": "Chi Sono", "url": "https://francescojames.dev/it/about" },
{ "@type": "SiteNavigationElement", "name": "Skill",    "url": "https://francescojames.dev/it/skills" }
```

**EN layout:**
```json
{ "@type": "SiteNavigationElement", "name": "About Me", "url": "https://francescojames.dev/about" },
{ "@type": "SiteNavigationElement", "name": "Skills",   "url": "https://francescojames.dev/skills" }
```

---

## 18. Geo meta tags — local SEO for Latina

**Both layouts — Priority: medium (Bing + local crawlers)**

Added to every page:

```html
<meta name="geo.region"    content="IT-LT" />
<meta name="geo.placename" content="Latina" />
<meta name="geo.position"  content="41.4661;12.9038" />
<meta name="ICBM"          content="41.4661, 12.9038" />
```

`IT-LT` is the ISO 3166-2 code for the Province of Latina. Google doesn't officially consume these tags, but Bing, DuckDuckGo and many local-SEO auditing tools do.

---

## 19. BreadcrumbList JSON-LD on all inner pages

**6 inner pages (about, skills, works × 2 locales) — Priority: HIGH (sitelink hierarchy)**

Each non-home page now injects a `BreadcrumbList` via `<Fragment slot="head">` to reinforce its position in the site hierarchy and strengthen sitelink eligibility:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://francescojames.dev/it" },
    { "@type": "ListItem", "position": 2, "name": "Chi Sono", "item": "https://francescojames.dev/it/about" }
  ]
}
```

Sitelink labels (`name`) exactly match the page `<title>` prefix (`Chi Sono`, `Skill`, `About Me`, `Skills`, etc.) for maximum signal consistency.

---

## 20. Canonical bug fix — IT Works page

**`it/works.astro` — Priority: correctness**

The Italian Works page had `canonical="https://francescojames.dev/works"` (pointing at the EN URL). Fixed to:

```html
canonical="https://francescojames.dev/it/works"
```

---

## Validation

All 10 modified files pass `astro check` with **0 errors, 0 warnings**.

## Validation

All four modified files pass Astro diagnostics with zero errors and zero warnings.

To verify structured data and OG tags after deploying, use:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [hreflang Tags Testing Tool](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/)
