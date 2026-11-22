# Centering the Hero Component Vertically (Accounting for Navbar & Layout Padding)

## 1. Why is the Navbar height calculated in `rem`?

Both **Tailwind CSS** and **DaisyUI** define all of their sizing, spacing, padding, and margins using `rem` ("root em") units rather than hardcoded `px` values.

### What is `1rem`?
- `1rem` equals the font size of the root `<html>` element.
- In all modern browsers, the default root font size is **`16px`** (`1rem = 16px`).
- **Why frameworks use `rem` instead of `px`:** Accessibility and responsiveness. If a user changes their browser's default font size (for example, from `16px` to `20px` for better readability), everything sized in `rem` scales proportionally—including the navbar, buttons, and paddings. If you hardcoded `px` in `calc(100dvh - 64px)` while the navbar grew with `rem`, the math would break for those users.

### How Tailwind's spacing scale maps to `rem`
In Tailwind CSS, **1 spacing unit = `0.25rem` (`4px` at default font size)**:
- `m-2` / `p-2` → `2 × 0.25rem` = **`0.5rem`** (`8px`)
- `p-6` → `6 × 0.25rem` = **`1.5rem`** (`24px`)
- `p-8` → `8 × 0.25rem` = **`2rem`** (`32px`)
- `p-20` → `20 × 0.25rem` = **`5rem`** (`80px`)

---

## 2. How the Navbar's exact height in `rem` is derived

In `src/components/Navbar.astro` (and `src/components/it/Navbar.astro`), the `<nav>` uses DaisyUI's `navbar` component (`class="font-montserrat navbar bg-base-100 shadow-sm"`).

### Mobile (`< 768px`) and Tablet (`md: ≥ 768px`) → `4rem` (`64px`)
- On screens smaller than `lg` (`1024px`), `.navbar-center` has `hidden lg:flex`, so the horizontal menu is hidden.
- DaisyUI's `.navbar` class has a built-in CSS rule:
  ```css
  .navbar {
    min-height: 4rem; /* 64px */
    padding: 0.5rem;  /* 8px top + 8px bottom */
  }
  ```
- The buttons inside `.navbar-start` and `.navbar-end` have DaisyUI's `.btn` height of `2.5rem` (`40px`). With `0.5rem` top + `0.5rem` bottom navbar padding (`2.5rem + 1rem = 3.5rem`), the content is smaller than `min-height: 4rem`.
- Therefore, on mobile and tablet, the navbar is locked at **`4rem` (`64px`)**.

### Desktop (`lg: ≥ 1024px`) → `5.5rem` (`88px`)
- At `lg`, `.navbar-center` switches from `hidden` to `flex` (`hidden lg:flex`).
- Inside `.navbar-center`, several vertical sizes stack together:
  1. **`.btn` height**: DaisyUI's `.btn` is **`2.5rem`** (`40px`) tall.
  2. **`m-2` on `<a class="btn ... m-2">`**: Adds `0.5rem` margin top + `0.5rem` margin bottom = **`1rem`** (`16px`).
  3. **`.menu` padding on `<ul class="menu menu-horizontal px-1">`**: DaisyUI's `.menu` adds `0.5rem` padding top + `0.5rem` padding bottom = **`1rem`** (`16px`).
  4. **`.navbar` padding on `<nav class="navbar">`**: DaisyUI's `.navbar` adds `0.5rem` padding top + `0.5rem` padding bottom = **`1rem`** (`16px`).
- Adding those up:
  ```text
  2.5rem (.btn) + 1rem (m-2) + 1rem (.menu padding) + 1rem (.navbar padding) = 5.5rem (88px)
  ```
- Because `5.5rem` is taller than `.navbar`'s `min-height: 4rem`, the navbar expands to **`5.5rem` (`88px`)** on desktop.

---

## 3. Why `min-h-dvh` alone did not center the Hero text

There were two separate layout factors pushing the hero text below the center of the screen:

### Factor A: `100dvh` did not subtract the Navbar height
`<Navbar />` is in normal document flow above `<main>`. When `.hero` had `min-h-dvh` (`100dvh`), the hero started **below** the navbar and took a full `100%` of the viewport height on top of the navbar height, extending past the bottom of the screen.

### Factor B: Asymmetric top padding in `Layout.astro`
In `src/layouts/Layout.astro`, the `<slot />` is wrapped in a padded `<div>`:
```astro
<Navbar />
<main class="...">
  <div class="lg:p-20 md:p-8 p-6 bg-inherit">
    <slot class="bg-inherit"/>
  </div>
</main>
```
On the landing page (`src/components/Landing.astro`), `<slot />` contains `<Hero />`, `<PhoneMockup />`, and `<section id="scroll-section">`:
- The wrapper's **top padding** (`p-6` = `1.5rem`, `md:p-8` = `2rem`, `lg:p-20` = `5rem`) sits **immediately above `<Hero />`** in the initial viewport.
- The wrapper's **bottom padding** sits at the very bottom of the entire page (below `#scroll-section`), **not** below `<Hero />`.

Without counteracting that top padding, `<Hero />` was pushed down by an extra `1.5rem` (mobile), `2rem` (tablet), or `5rem` (desktop) before it even started.

---

## 4. The Final Solution in `src/components/Hero.astro`

```astro
<div class="hero bg-base-200 -mt-6 md:-mt-8 lg:-mt-20 min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-5.5rem)]">
```

### How each class works:
1. **`-mt-6 md:-mt-8 lg:-mt-20`**:
   Pulls `.hero` upward by the exact amount of top padding added by `Layout.astro` (`p-6`, `md:p-8`, `lg:p-20`), so the top edge of `.hero` sits flush against the bottom edge of `<Navbar />`.
2. **`min-h-[calc(100dvh-4rem)]`**:
   On mobile and tablet, sets the hero's minimum height to the viewport height (`100dvh`) minus the `4rem` navbar height.
3. **`lg:min-h-[calc(100dvh-5.5rem)]`**:
   On desktop (`lg`), sets the hero's minimum height to the viewport height (`100dvh`) minus the `5.5rem` desktop navbar height.
   *(Note: Tailwind requires square brackets `[...]` around custom `calc(...)` values.)*
