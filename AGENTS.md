# Agent Guidelines for SEO & Content Maintenance

**Last Updated:** November 2026
**Scope:** Maintaining and evolving the native Astro SEO implementation on `francescojames.dev`
**Locale:** English only (`en`). The Italian locale has been retired — see *Legacy `/it` URLs* below.
**Also read:** the `@agents/` folder (`agents/README.md` is the index; `agents/seo-improvements.md` is the implementation log with the reasoning behind each SEO decision). This file is the operational source of truth; `agents/` holds the history.

---

## Commit Style

Use **Conventional Commits** for every commit:
`<type>[optional scope]: <description>` (for example,
`fix(particles): enable responsive options`). Use an appropriate type such as
`feat`, `fix`, `docs`, `refactor`, `test`, or `chore`. Keep the description
imperative and the subject concise, without a final period. Add a body only
when it provides useful context beyond the subject.

Every commit is co-authored by the site owner, in addition to any agent
attribution:

```
Co-Authored-By: devsnakex34 <fantifrancescojames@gmail.com>
```

## Core Principles

### 1. No external SEO libraries
This site uses **native Astro** for all SEO signals. Do **not** introduce `astro-seo`, `@astrojs/seo`, or similar packages.

All SEO lives in:
- `src/layouts/Layout.astro` (the single layout)
- Page-level props & `<Fragment slot="head">` injections

### 2. Single locale: English only
The site is served from one unprefixed URL space (`/`, `/about`, `/skills`, `/works`, ...). There is no `/it` route space anymore.

- `astro.config.mjs` declares `i18n.locales: ["en"]` with `defaultLocale: "en"`.
- `og:locale` is `"en_GB"`, Layout `inLanguage` is `"en"`, `<html lang="en">`.
- `hreflang`: the layout emits exactly two alternates per page — `en` and `x-default` — both pointing at the page's canonical URL. Never emit an `it` alternate again unless the Italian locale is deliberately reintroduced.
- **Do not create `src/pages/it/...` pages.** They will not be built into `/it` routes and the redirect map will shadow them.

### 3. Legacy `/it` URLs
Every URL the old Italian site published still needs to resolve. Handled as static redirects in `astro.config.mjs`:

```js
redirects: {
  "/it": "/",
  "/it/about": "/about",
  "/it/skills": "/skills",
  "/it/works": "/works",
}
```

Rules:
- Never remove an entry from this map — those URLs are indexed and linked from outside the site.
- If you ever restore the Italian site, start from `old_locale_deprecated/README.md` (components, layout and pages are preserved there, and it lists exactly what was unhooked).

### 4. Brand identity is non-negotiable
The brand is **`Francesco James - Cloud Engineer`**. It appears in:
- Layout default title: `"Francesco James - Cloud Engineer"`
- All page titles follow: `"<Section> | Francesco James - Cloud Engineer"`
- Person schema `name` field
- OG `og:site_name`

This consistency is critical for:
- SERP brand anchor recognition
- Sitelink extraction (Google parses the `|` separator to extract clean labels)
- Knowledge Panel eligibility

### 5. Local SEO is foundational
Every page signals:
- **City:** Latina (`addressLocality: "Latina"`, `geo.placename: "Latina"`)
- **Region:** Lazio (`addressRegion: "Lazio"`, `geo.region: "IT-LT"`)
- **Service area:** Latina, Roma, Italy (`areaServed: [...]`)
- **Coordinates:** `41.4661, 12.9038` (Latina city center) in `geo.position` and `ICBM`

This enables ranking for geo-local queries like "cloud engineer in Latina" and discovery from local crawlers (Bing, DuckDuckGo).

---

## Checklist: Adding a New Page

### Step 1: Create the page file
```
src/pages/my-feature.astro
```
(No `/it` counterpart. See *Legacy `/it` URLs*.)

### Step 2: Set page props (frontmatter or layout props)
```astro
<Layout
  title="My Feature | Francesco James - Cloud Engineer"
  description="Keyword-rich description. Mention Latina/Roma/Italy if relevant. 155–160 chars."
  canonical="https://francescojames.dev/my-feature"
  justifyType="start"
  showFab={true}
>
```

**Title rules:**
- Format: `"<Section Name> | Francesco James - <Brand>"`
- Must include locale-relevant keywords (Latina, Rome, Italy)
- Keep under 60 chars if possible; Google typically truncates at ~60 in SERPs

**Description rules:**
- 155–160 chars (Google's SERP limit)
- Lead with the unique value proposition
- Include geo modifiers (Latina, Roma, Italy) **if contextually relevant**
- Include 1–2 target keywords naturally

### Step 3: Add BreadcrumbList JSON-LD (if not homepage)
```astro
const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://francescojames.dev" },
    { "@type": "ListItem", "position": 2, "name": "My Feature", "item": "https://francescojames.dev/my-feature" }
  ]
};
```

Inject it:
```astro
<Fragment slot="head">
  <script type="application/ld+json" set:html={JSON.stringify(breadcrumb)} />
</Fragment>
```

**Why:** Reinforces page hierarchy for sitelink eligibility and breadcrumb SERP features.

### Step 4: Verify hreflang is auto-generated
The layout automatically emits `<link rel="alternate" hreflang="en">` and
`hreflang="x-default"` from the `canonical` prop. No manual action needed **unless you're doing something unconventional**.

### Step 5: Test
```bash
yarn astro check  # Verify no TypeScript errors
yarn astro build  # Verify build passes
```

---

## Checklist: Updating an Existing Page

### Title updates
- Keep the format: `"<Section> | Francesco James - <Brand>"`
- If changing the section name, update the breadcrumb `name` to match

### Description updates
- Audit for keyword decay (do we still target "cloud engineer in Latina"? Or should we add "Rome"?)
- Keep it under 155–160 chars
- Check that geo keywords are still contextually relevant

### Major content rewrites
- If the page focus changes (e.g., "Services" → "Case Studies"), update `title`, `description`, and breadcrumb together
- Consider if this should get its own `SiteNavigationElement` entry in the layout's `@graph` (see below)

### Canonical URL changes
- **Never** move a page without a 301 redirect
- Update `canonical` prop in the Layout call
- Verify hreflang links automatically update (they do, since they derive from canonical)
- If the old URL was an `/it/...` path, add it to the `redirects` map in `astro.config.mjs`

---

## Checklist: Adding a SiteNavigationElement (Sitelink hint)

`SiteNavigationElement` nodes tell Google which pages are "important enough" to show as sitelinks beneath your brand name. Currently, two are configured:

```json
{ "@type": "SiteNavigationElement", "name": "About Me", "url": "https://francescojames.dev/about" },
{ "@type": "SiteNavigationElement", "name": "Skills", "url": "https://francescojames.dev/skills" }
```

### When to add more
- Only if the page becomes a **structural pillar** of the site (e.g., a full services portfolio, certification page, testimonials hub)
- Google typically shows 2–4 sitelinks; adding more doesn't guarantee they'll all appear
- **Keep it sparse:** more isn't better

### How to add
1. Edit `src/layouts/Layout.astro`
2. Add a new object to the `@graph` array:
   ```json
   {
     "@type": "SiteNavigationElement",
     "name": "<Exact Title from page>",
     "url": "<Canonical URL>"
   }
   ```
3. Ensure the `"name"` exactly matches the page's title prefix (e.g., "Services" not "Services & Pricing")
4. Run `astro check` and verify no errors

---

## Layout Props Reference

```astro
<Layout
  title="string"              // Required; full <title> value
  description="string"        // Required; full meta description
  canonical="string"          // Required; absolute URL with https://

  justifyType="string"        // Optional; Tailwind justify-* class (default: "center")
  alignType="string"          // Optional; Tailwind items-* class (default: "center")
  bgColor="string"            // Optional; Tailwind bg-* class (default: "base-200")
  showFab={boolean}           // Optional; show scroll-to-top button (default: false)
  fullBleed={boolean}         // Optional; drop the padded content wrapper (default: false)

  ogImage="string"            // Optional; absolute URL to social image (default: "/io.png")
  robots="string"             // Optional; robots meta value (default: "index, follow")
  ogType="string"             // Optional; OG type, e.g. "article" (default: "website")
  pubDate={Date|string}       // Optional; publication date (for articles)
  articleAuthor="string"      // Optional; article author name (for articles)
>
  <!-- Page content -->
</Layout>
```

### Special note: `robots` meta
- Use `"index, follow"` (default) for normal pages
- Use `"noindex, follow"` for blog posts and low-priority pages (to keep them out of Google's main index while keeping them crawlable)

---

## JSON-LD Schema Strategy

### Person schema (every page)
Emitted by the layout. Key fields:
- `@id`: stable IRI anchor (`https://francescojames.dev/#person`)
- `name`, `givenName`, `familyName`
- `jobTitle`: `"Cloud Engineer"`
- `address` + `areaServed`: local SEO signals
- `knowsAbout`: array of skill/topic strings (used by Google for relevance)
- `image`: headshot URL
- `description`: bio with local keywords

### WebSite schema (every page)
```json
{
  "@type": "WebSite",
  "@id": "https://francescojames.dev/#website",
  "name": "Francesco James Fanti",
  "url": "https://francescojames.dev",
  "inLanguage": "en",
  "author": { "@id": "https://francescojames.dev/#person" }
}
```

### BreadcrumbList schema (all non-home pages)
Injected via `<Fragment slot="head">`. Structure:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://francescojames.dev" },
    { "@type": "ListItem", "position": 2, "name": "<Section>", "item": "https://francescojames.dev/<path>" }
  ]
}
```

The **position 2 name must exactly match** the page title prefix for sitelink consistency.

### BlogPosting schema (blog posts only)
Injected via `<Fragment slot="head">` in `BlogPostLayout.astro`. See existing layout for structure.

---

## Common Pitfalls to Avoid

### ❌ Duplicate titles
```astro
<!-- WRONG: two title props -->
<Layout
  title="My Page"
  title="Actually My Page"
>
```

### ❌ Mismatched hreflang links
The layout auto-derives alternate hreflang URLs from `canonical`. If you manually set `canonical` incorrectly, hreflang will be broken.

A correct page emits only:
```html
<link rel="alternate" hreflang="en" href="https://francescojames.dev/about" />
<link rel="alternate" hreflang="x-default" href="https://francescojames.dev/about" />
```

This is automatic. Don't override it — and don't hand-add an `it` alternate.

### ❌ Forgotten `canonical` on new pages
Every page **must** have an absolute canonical URL. Without it:
- OG tags won't include `og:url`
- hreflang links won't be emitted
- Google may treat pages as duplicate content

### ❌ Using `noindex` carelessly
Only use `robots="noindex, follow"` for:
- Blog posts (to keep the blog discoverable but individual posts out of main SERP)
- Low-value pages (e.g., old tutorials, internal tools)

**Never** use it on core pages (About, Skills, Homepage, Works).

### ❌ Reintroducing `/it` by half
Do not add `src/pages/it/*` pages, an `it` locale in `astro.config.mjs`, or an `it` hreflang alternate on their own. Restoring Italian is a coordinated change (pages + components + layout + config + redirects) and starts from `old_locale_deprecated/README.md`.

### ❌ Dead locale plumbing left behind
Anything locale-shaped in a single-language site is a bug: no `localStorage`/cookie language preference, no `pathname.startsWith("/it")` branches, no `/it` links in content. The retired pieces are preserved as comments only for review — see `src/components/Whoami.astro` and `src/pages/404.astro`.

### ❌ Hardcoding sitelink names
`SiteNavigationElement` names must **exactly match** the page title prefix. If you change a page title from "About Me" to "Who I Am", you must also update the schema.

---

## Testing & Validation

### Local validation
```bash
yarn astro check        # TypeScript + Astro type checking
yarn astro build        # Full build; detects missing props, broken hreflang, etc.
```

Note: `old_locale_deprecated/` is excluded from `tsconfig.json`, so it is never type-checked or built.

### Before deploying
1. Run `astro check` and fix all errors
2. Run `astro build` and verify `dist/sitemap-index.xml` contains all pages
3. Verify `dist/` contains only English pages plus the legacy redirect stubs (`dist/it/index.html`, `dist/it/about/index.html`, `dist/it/skills/index.html`, `dist/it/works/index.html`) that point at their English counterpart
4. Spot-check a built page's `<head>`: exactly one `hreflang="en"` and one `hreflang="x-default"`, no `hreflang="it"`

### Post-deployment validation
- [Google Rich Results Test](https://search.google.com/test/rich-results) — check Person + WebSite + BreadcrumbList schemas
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — verify OG tags
- [Google Search Console](https://search.google.com/search-console/) — monitor indexation and sitelink appearance
- Fetch an old `/it/...` URL and confirm it lands on the English page

---

## Keywords & Positioning

### Positioning
Francesco is a **cloud engineer**: currently a **backup specialist** in an **Accenture internship**, inside a team working on **infrastructure and cloud transformation**. That is the primary identity for titles, descriptions and schema — not "software developer" and not "freelance". Frontend / full-stack work is presented as the background he brings to cloud work.

The visible page copy is the author's own; this document only governs SEO strings (`title`, `description`, canonical, schema). Do not rewrite page body content to match the keywords below.

### Primary keywords
- "cloud engineer", "cloud engineer Italy", "cloud transformation", "infrastructure engineer"

### Backup & recovery keywords (the current specialisation)
- "backup specialist", "backup and recovery", "disaster recovery", "data backup", "backup strategy"

### Local keywords (Latina / Rome / Lazio)
- "cloud engineer in Latina", "cloud engineer in Rome", "cloud engineer Italy", "Latina cloud engineer"

### Skill-based keywords
- Azure, AWS, Cloud Computing, Linux, Infrastructure, Networking, CI/CD, Terraform, Go, Python, TypeScript, React, Astro, Node.js

These should appear naturally in:
- Page descriptions
- `knowsAbout` array in Person schema
- Page body content

### Retired Italian keywords (only when Italian returns)
Kept for reference: "sviluppatore software", "sviluppatore freelance", "sviluppatore full-stack", "sviluppatore a Latina", "sviluppatore a Roma", "sviluppatore Italia". Do not target these from English pages.

---

## Maintenance Cadence

### Monthly
- Audit SERP appearance in Google Search Console (are we getting impressions? Clicks?)
- Check if sitelinks are appearing below brand SERP result
- Verify no new crawl errors
- Check Search Console "Pages" for 404s under `/it/` (a 404 there means a redirect entry is missing)

### Quarterly
- Run [Google Rich Results Test](https://search.google.com/test/rich-results) on homepage
- Audit page titles/descriptions for keyword drift
- Consider if any page titles need updating (new skills learned? New service area?)

### Annually
- Full site audit (check for broken links, missing hreflang, stale content)
- Evaluate if new `SiteNavigationElement` entries should be added (new structural pillars?)
- Update the `knowsAbout` array if skill set has changed
- Refresh location coordinates if you move (Latina coordinates: `41.4661, 12.9038`)
- Re-read `old_locale_deprecated/README.md` and decide whether the Italian site should come back

---

## Contact & Escalation

If you encounter an SEO issue not covered in this guide:
1. Check `agents/seo-improvements.md` for the reasoning behind current implementations
2. Run `astro check` and `astro build` to isolate technical errors
3. Use Google Search Console to identify crawl/indexing issues
4. Consult schema.org documentation if adding new schema types

Keep this document and `agents/seo-improvements.md` in sync during maintenance.
