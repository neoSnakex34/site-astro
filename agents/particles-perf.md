# Particles — First-Load Performance

**Date:** November 2026
**Scope:** `src/components/Particles.astro`, `src/layouts/Layout.astro`, `astro.config.mjs`
**Goal:** Reduce the time between page load and first visible particle on a cold cache.

---

## Problem

On cache miss the hero looked empty for 1.5–3s. The cause was a chain of
sequential awaits plus an artificial delay, all before the first frame:

```
download tsparticles chunks → loadSlim → loadResponsivePlugin → init
→ requestAnimationFrame wait → tsParticles.load → 800ms CSS fade-in
```

## Changes

### 1. Parallel plugin registration — `Particles.astro`

`loadSlim(tsParticles)` and `loadResponsivePlugin(tsParticles)` were awaited
sequentially. They are now wrapped in `Promise.all` so both register at the
same time. `tsParticles.init()` still runs after both, preserving the
no-race guarantee.

### 2. Removed the `requestAnimationFrame` wait — `Particles.astro`

The `mount()` function waited one frame ("so the canvas gets the real hero
size") before calling `tsParticles.load()`. tsParticles measures the container
itself on load, so the wait was unnecessary. Removed.

### 3. Fade-in shortened — `Particles.astro`

The canvas `particles-fade-in` animation went from **800ms → 200ms**.
Particles are now visible almost immediately after the engine mounts.

### 4. Modulepreload — `astro.config.mjs` + `Layout.astro`

The browser only discovered the particles `<script type="module">` when it
reached the tag in `<body>`. Now the chunk is preloaded during `<head>`
parsing:

- `astro.config.mjs` sets a stable, hash-free output name for the Particles
  component script via `rollupOptions.output.entryFileNames`:
  `/_astro/particles.js`. Without this the filename carries a content hash
  and a static `<link>` would break on every edit.
- `Layout.astro` adds `<link rel="modulepreload" href="/_astro/particles.js">`
  in `<head>`, guarded by `import.meta.env.PROD`. The guard is required
  because `entryFileNames` only applies to production builds — in `astro dev`
  Vite serves the component script at a different URL and the preload path
  would 404. `modulepreload` also fetches the module's static imports, so
  the tsparticles engine/slim/responsive chunks start downloading early too.

## Verification

- `yarn astro check` — 0 errors
- `yarn build` — passes; `dist/_astro/particles.js` exists with the stable name
- `dist/index.html` contains both the `modulepreload` link and the matching
  `<script type="module" src="/_astro/particles.js">`
- Built CSS confirms `particles-fade-in .2s`

## Not done (deliberately)

- **CSS-only fallback starfield** behind the canvas — rejected to keep the
  component simple and single-purpose. If first-paint emptiness becomes a
  problem on slow connections, this is the next lever to pull.
