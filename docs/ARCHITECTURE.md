# Site Architecture — Traumatólogo GDL

> **Version:** 1.0 · Last updated: 2026-03-10  
> Companion to `DESIGN_GUIDE.md`. Defines how the codebase is organized, 
> how files are split, and the conventions every contributor must follow.

---

## 1. Project Root

```
gdl/
├── docs/
│   ├── ARCHITECTURE.md   ← this file
│   ├── SECURITY.md
│   ├── PERFORMANCE.md
│   ├── SEO.md
│   └── ACCESSIBILITY.md
├── assets/
│   ├── css/
│   │   ├── base.css          base reset, tokens, typography
│   │   ├── layout.css        grid, sections, containers
│   │   ├── components.css    reusable UI components (buttons, cards, badges…)
│   │   ├── animations.css    keyframes, scroll-reveal, transitions
│   │   └── pages/
│   │       └── home.css      page-specific overrides (Hero, S2…)
│   ├── js/
│   │   ├── core.js           scroll events, navbar, progress bar
│   │   ├── animations.js     IntersectionObserver, reveal logic
│   │   └── pages/
│   │       └── home.js       page-specific interactions
│   ├── Fonts/                (existing — do not rename)
│   │   ├── Inter/
│   │   └── Work Sans/
│   └── Images/               (existing — do not rename)
│       ├── Stock/
│       └── hero.jpg
├── pages/
│   ├── servicios.html
│   ├── doctor.html
│   ├── blog/
│   └── contacto.html
├── index.html                Homepage (entry point)
├── DESIGN_GUIDE.md
└── README.md
```

> **Note on casing:** All new paths under `assets/` use lowercase-with-hyphens.
> The legacy `Assets/` folder (capital A) is kept as-is to avoid breaking image references.

---

## 2. HTML Structure Per Page

Every page follows this shell:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <!-- 1. Meta charset + viewport (FIRST) -->
  <!-- 2. Title + meta description -->
  <!-- 3. Canonical + Open Graph tags -->
  <!-- 4. Preconnect hints (fonts, analytics) -->
  <!-- 5. Critical CSS inline (max 14 KB) -->
  <!-- 6. Non-critical CSS async (components, animations) -->
  <!-- 7. Favicon + PWA manifest -->
</head>
<body>
  <!-- a. Skip-to-content link (accessibility) -->
  <!-- b. <nav class="navbar"> -->
  <!-- c. <main id="main-content"> -->
  <!--      <section> ... </section> -->
  <!-- d. <footer> -->
  <!-- e. JS modules (deferred, before </body>) -->
</body>
</html>
```

### Critical vs. Non-Critical CSS

| Layer | Delivery | Max size |
|---|---|---|
| CSS tokens + base reset | `<style>` inline in `<head>` | 6 KB |
| Layout + above-fold section | `<style>` inline or first `<link>` | 8 KB |
| Below-fold components | `<link rel="stylesheet" media="print" onload="this.media='all'">` | no limit |
| Animations / keyframes | deferred stylesheet | no limit |

---

## 3. CSS Architecture — Naming Convention

All classes follow **BEM-lite** with a section prefix:

```
[section]-[element]
[section]-[element]--[modifier]

Examples:
  .hero-badge
  .hero-badge--dark
  .stat-card
  .stat-card--featured
  .btn-primary
  .btn-primary--sm
```

### CSS Custom Properties

All design tokens live in `:root` inside `base.css`.  
**Never** hardcode colors or font sizes directly in component rules.  
Always reference a `--variable`.

```css
/* ✅ Correct */
color: var(--color-navy);

/* ❌ Wrong */
color: #183F66;
```

### Property Order (per rule block)

1. `content`, `display`, `position` + offsets  
2. Box model: `width`, `height`, `margin`, `padding`  
3. Flex / Grid properties  
4. Visual: `background`, `border`, `border-radius`, `box-shadow`  
5. Typography: `font-*`, `line-height`, `letter-spacing`, `color`  
6. Transforms + transitions + animations  
7. Misc: `cursor`, `pointer-events`, `overflow`

---

## 4. JavaScript Architecture

### Runtime Pattern (Current)

The homepage currently uses two runtime files loaded with `defer`:

```html
<!-- index.html — bottom of <body> -->
<script defer src="Assets/js/loader.js"></script>
<script defer src="Assets/js/main.js"></script>
```

- `Assets/js/loader.js`: fetches and injects all `[data-include]` partial sections.
- `Assets/js/main.js`: initializes navbar behavior, reveals, FAQ, reviews, Doctoralia sync, and counters.
- `Assets/js/main.js` waits for the custom `partials-ready` event when includes are present.

### Legacy Split Modules

`Assets/js/core.js` and `Assets/js/animations.js` remain in the repository for reference only and are **not** loaded by `index.html` at runtime.

### Rules

- **No global variables.** Wrap everything in module scope.
- **No inline event handlers** (`onclick="..."`) in HTML.
- **No jQuery.** Vanilla JS only (Design Guide rule #9).
- One responsibility per file. If a file exceeds ~120 lines, split it.
- Console logs must be removed before commit. Use a `DEBUG` flag if needed.

---

## 5. Page Sections — Naming & ID Map

Section IDs are used by anchor links and analytics events. Keep them stable.

| Section | ID | File |
|---|---|---|
| Hero | `#hero` | index.html |
| Problem / Empatía | `#problema` | index.html |
| Servicios | `#servicios` | index.html → pages/servicios.html |
| El Doctor | `#doctor` | index.html → pages/doctor.html |
| Testimonios | `#testimonios` | index.html |
| Blog | `#blog` | index.html → pages/blog/ |
| Contacto / CTA final | `#contacto` | index.html → pages/contacto.html |

---

## 6. Image Conventions

| Rule | Detail |
|---|---|
| Format | Prefer **WebP** with JPEG fallback (`<picture>`) |
| Hero image | Max 1200 × 1600 px, < 200 KB |
| Card / thumbnail | Max 600 × 400 px, < 80 KB |
| Alt text | Descriptive, keyword-aware, never empty for editorial images |
| Lazy loading | `loading="lazy"` on all images **below** the fold |
| Above-fold | `loading="eager"` + `fetchpriority="high"` on `hero.jpg` only |
| Naming | `kebab-case.webp` — no spaces, no accents in filenames |

---

## 7. Migration Plan — From Single `index.html` to Split Files

The current `index.html` contains all CSS and JS inline. Migrate in this order:

1. **Extract CSS tokens → `assets/css/base.css`** *(no visual change)*
2. **Extract component CSS → `assets/css/components.css`**
3. **Extract animations → `assets/css/animations.css`**
4. **Extract hero + section styles → `assets/css/pages/home.css`**
5. **Consolidate JS runtime in `assets/js/main.js` (current production path)**
6. **Replace `<style>` and `<script>` in index.html with `<link>` and `<script type="module">`**
7. Validate: run Lighthouse before and after — score must not drop.

Do NOT migrate everything in one commit. One step per commit, PR or save checkpoint.

---

## 8. Adding a New Page

1. Copy `index.html` as the shell.
2. Remove page-specific sections, keep navbar + footer.
3. Add page-specific CSS in `assets/css/pages/[page].css`.
4. Add page-specific JS in `assets/js/pages/[page].js`.
5. Update navbar `<a>` active state.
6. Add `<link rel="canonical">` with the final URL.
7. Add a `<script type="application/ld+json">` block with page-relevant schema.

---

## 9. What NOT to Do

- ❌ Do not add CSS frameworks (Bootstrap, Tailwind, etc.)
- ❌ Do not add JS frameworks (React, Vue, etc.)
- ❌ Do not import Google Fonts via `<link>` — always use local `@font-face`
- ❌ Do not store API keys or phone numbers in JS variables — use `data-*` attributes or environment-injected HTML
- ❌ Do not commit minified files — keep source readable; minify at build/deploy time
