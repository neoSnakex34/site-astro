# Agent Guidelines for SEO & Content Maintenance

**Last Updated:** 2026  
**Scope:** Maintaining and evolving the native Astro SEO implementation on `francescojames.dev`

---

## Core Principles

### 1. No external SEO libraries
This site uses **native Astro** for all SEO signals. Do **not** introduce `astro-seo`, `@astrojs/seo`, or similar packages.

All SEO lives in:
- `src/layouts/Layout.astro` (EN)
- `src/layouts/it/Layout.astro` (IT)
- Page-level props & `<Fragment slot="head">` injections

### 2. Bilingual consistency
Every SEO signal must exist in **both** EN and IT layouts, with appropriate locale translations:
- `og:locale`: `"en_GB"` vs. `"it_IT"`
- `inLanguage`: `"en"` vs. `"it"`
- `hreflang`: `rel="alternate" hreflang="en"` and `rel="alternate" hreflang="it"`

### 3. Brand identity is non-negotiable
The site brand appears in:
- Layout default title: `"Francesco James - Software Developer"` (EN) / `"Francesco James - Sviluppatore Software"` (IT)
- All page titles follow: `"<Section> | Francesco James - <Brand>"`
- Person schema `name` field
- OG `og:site_name`

This consistency is critical for:
- SERP brand anchor recognition
- Sitelink extraction (Google parses the `|` separator to extract clean labels)
- Knowledge Panel eligibility

### 4. Local SEO is foundational
Every page signals:
- **City:** Latina (`addressLocality: "Latina"`, `geo.placename: "Latina"`)
- **Region:** Lazio (`addressRegion: "Lazio"`, `geo.region: "IT-LT"`)
- **Service area:** Latina, Roma, Italy (`areaServed: [...]`)
- **Coordinates:** `41.4661, 12.9038` (Latina city center) in `geo.position` and `ICBM`

This enables ranking for geo-local queries like "developer in Latina" and discovery from local crawlers (Bing, DuckDuckGo).

---

## Checklist: Adding a New Page

### Step 1: Create the page file
```
src/pages/my-feature.astro  (EN)
src/pages/it/my-feature.astro  (IT)
```

### Step 2: Set page props (frontmatter or layout props)
```astro
<Layout
  title="My Feature | Francesco James - Software Developer"
  description="Keyword-rich description. Mention Latina/Roma/Italy if relevant. 155–160 chars."
  canonical="https://francescojames.dev/my-feature"
  justifyType="start"
  showFab={true}
>
```

**Title rules:**
- Format: `"<Section Name> | Francesco James - <Brand>"`
- Must include locale-specific keywords (Latina, Rome, Italy / Italia, Roma, Latina for IT)
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

### Step 4: Create the IT translation
- Translate title, description, and page content
- Set `title` with Italian keywords
- Set `canonical` to the `/it/` path variant
- Update breadcrumb `name` to Italian

### Step 5: Verify hreflang is auto-generated
The layout automatically emits `<link rel="alternate" hreflang="...">` based on the canonical URL. No manual action needed **unless you're doing something unconventional**.

### Step 6: Test
```bash
yarn astro check  # Verify no TypeScript errors
yarn astro build  # Verify build passes
```

---

## Checklist: Updating an Existing Page

### Title updates
- Keep the format: `"<Section> | Francesco James - <Brand>"`
- If changing the section name, update the breadcrumb `name` to match
- Always update both EN and IT pages

### Description updates
- Audit for keyword decay (do we still target "Latina developer"? Or should we add "Rome"?)
- Keep it under 155–160 chars
- Check that geo keywords are still contextually relevant

### Major content rewrites
- If the page focus changes (e.g., "Services" → "Case Studies"), update `title`, `description`, and breadcrumb in **both locales**
- Consider if this should get its own `SiteNavigationElement` entry in the layout's `@graph` (see below)

### Canonical URL changes
- **Never** move a page without a 301 redirect
- Update `canonical` prop in the Layout call
- Verify hreflang links automatically update (they should, since they derive from canonical)

---

## Checklist: Adding a SiteNavigationElement (Sitelink hint)

`SiteNavigationElement` nodes tell Google which pages are "important enough" to show as sitelinks beneath your brand name. Currently, only two are configured:

**IT:**
```json
{ "@type": "SiteNavigationElement", "name": "Chi Sono", "url": "https://francescojames.dev/it/about" },
{ "@type": "SiteNavigationElement", "name": "Skill", "url": "https://francescojames.dev/it/skills" }
```

**EN:**
```json
{ "@type": "SiteNavigationElement", "name": "About Me", "url": "https://francescojames.dev/about" },
{ "@type": "SiteNavigationElement", "name": "Skills", "url": "https://francescojames.dev/skills" }
```

### When to add more
- Only if the page becomes a **structural pillar** of the site (e.g., a full services portfolio, certification page, testimonials hub)
- Google typically shows 2–4 sitelinks; adding more doesn't guarantee they'll all appear
- **Keep it sparse:** more isn't better

### How to add
1. Edit `src/layouts/Layout.astro` (EN) and `src/layouts/it/Layout.astro` (IT)
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

### Common props (both EN and IT layouts)
```astro
<Layout
  title="string"              // Required; full <title> value
  description="string"        // Required; full meta description
  canonical="string"          // Required; absolute URL with https://
  
  justifyType="string"        // Optional; Tailwind justify-* class (default: "center")
  alignType="string"          // Optional; Tailwind items-* class (default: "center")
  bgColor="string"            // Optional; Tailwind bg-* class (default: "base-200")
  showFab={boolean}           // Optional; show scroll-to-top button (default: false)
  
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
Emitted by both layouts. Key fields:
- `@id`: stable IRI anchor (`https://francescojames.dev/#person`)
- `name`, `givenName`, `familyName`
- `jobTitle`: locale-specific (EN: "Freelance Software Developer", IT: "Sviluppatore Software Freelance")
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
  "inLanguage": "en" or "it",
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
The layouts auto-derive alternate hreflang URLs from `canonical`. If you manually set `canonical` incorrectly, hreflang will be broken.

Example: if EN page has `canonical="https://francescojames.dev/about"`, the layout will emit:
```html
<link rel="alternate" hreflang="en" href="https://francescojames.dev/about" />
<link rel="alternate" hreflang="it" href="https://francescojames.dev/it/about" />
```

This is automatic. Don't override it.

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

### ❌ Skipping Italian translations
Every page needs an EN and IT version. Bilingual consistency is non-negotiable for:
- hreflang correctness
- User experience
- SEO fairness (you don't want Google to suppress either language version as duplicate)

### ❌ Hardcoding sitelink names
`SiteNavigationElement` names must **exactly match** the page title prefix. If you change a page title from "About Me" to "Who I Am", you must also update the schema.

---

## Testing & Validation

### Local validation
```bash
yarn astro check        # TypeScript + Astro type checking
yarn astro build        # Full build; detects missing props, broken hreflang, etc.
```

### Before deploying
1. Run `astro check` and fix all errors
2. Run `astro build` and verify `dist/sitemap-index.xml` contains all pages
3. Verify `dist/` has both EN and IT variants of each page (e.g., `about/index.html` and `it/about/index.html`)

### Post-deployment validation
- [Google Rich Results Test](https://search.google.com/test/rich-results) — check Person + WebSite + BreadcrumbList schemas
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — verify OG tags
- [hreflang Tester](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/) — verify bilingual links
- [Google Search Console](https://search.google.com/search-console/) — monitor indexation and sitelink appearance

---

## Keywords & Positioning

### Primary keywords (Freelance / General)
- **EN:** "software developer", "freelance developer", "full-stack developer"
- **IT:** "sviluppatore software", "sviluppatore freelance", "sviluppatore full-stack"

### Local keywords (Latina / Rome / Lazio)
- **EN:** "developer in Latina", "developer in Rome", "developer Italy", "Latina software developer"
- **IT:** "sviluppatore a Latina", "sviluppatore a Roma", "sviluppatore Italia", "sviluppatore freelance Latina"

### Skill-based keywords
- React, Astro, Node.js, Go, Python, TypeScript, Cloud Computing, etc.

These should appear naturally in:
- Page descriptions
- `knowsAbout` array in Person schema
- Page body content

---

## Maintenance Cadence

### Monthly
- Audit SERP appearance in Google Search Console (are we getting impressions? Clicks?)
- Check if sitelinks are appearing below brand SERP result
- Verify no new crawl errors

### Quarterly
- Run [Google Rich Results Test](https://search.google.com/test/rich-results) on homepage
- Audit page titles/descriptions for keyword drift
- Consider if any page titles need updating (new skills learned? New service area?)

### Annually
- Full site audit (check for broken links, missing hreflang, stale content)
- Evaluate if new `SiteNavigationElement` entries should be added (new structural pillars?)
- Update the `knowsAbout` array if skill set has changed
- Refresh location coordinates if you move (Latina coordinates: `41.4661, 12.9038`)

---

## Contact & Escalation

If you encounter an SEO issue not covered in this guide:
1. Check `seo-improvements.md` for the reasoning behind current implementations
2. Run `astro check` and `astro build` to isolate technical errors
3. Use Google Search Console to identify crawl/indexing issues
4. Consult schema.org documentation if adding new schema types

Keep both documents in sync during maintenance.
