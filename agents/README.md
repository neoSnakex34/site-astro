# Agents Directory

This folder contains **documentation and guidelines** for maintaining and evolving the SEO and content strategy of `francescojames.dev`.

---

## Files

### 📋 `seo-improvements.md`
**Technical implementation log** of all native Astro SEO enhancements.

- Round 1: Core SEO fundamentals (charset, favicon, meta tags, hreflang, JSON-LD, blogs)
- Round 2: Local SEO (Latina, Rome, Lazio) + sitelink targeting

**Use this for:** Understanding *why* each SEO decision was made and *what* was implemented.

---

### 🛠️ `agents.md`
**Operational guidelines** for day-to-day maintenance and feature development.

Contains:
- **Core Principles** — no external SEO libraries, bilingual consistency, brand identity, local SEO
- **Checklists** — adding pages, updating pages, adding sitelinks
- **Layout Props Reference** — all available page props and defaults
- **Schema Strategy** — Person, WebSite, BreadcrumbList, BlogPosting
- **Common Pitfalls** — mistakes to avoid
- **Testing & Validation** — local and post-deployment checks
- **Keywords & Positioning** — primary, local, and skill-based keywords
- **Maintenance Cadence** — monthly, quarterly, annual tasks

**Use this for:** How to maintain the site, add content, and avoid breaking SEO signals.

---

## Quick Links

### For the next person who touches this site:
1. **Start here:** Read the "Core Principles" section in `agents.md`
2. **Adding a new page?** Follow the "Checklist: Adding a New Page" in `agents.md`
3. **Curious about the history?** Check `seo-improvements.md` for the full reasoning

### Tools & Testing
- Local: `yarn astro check` and `yarn astro build`
- Post-deploy: Google Rich Results Test, Facebook Sharing Debugger, hreflang Tester
- Analytics: Google Search Console (sitelink appearance, impressions, clicks)

### Contact
If something doesn't fit these guidelines or breaks SEO:
1. Check both documents
2. Run `astro check` + `astro build`
3. Consult schema.org for new schema types
4. Keep these documents in sync with any changes
