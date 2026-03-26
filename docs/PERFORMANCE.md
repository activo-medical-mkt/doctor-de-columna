# Performance Guidelines — Traumatólogo GDL

> **Version:** 1.0 · Last updated: 2026-03-10  
> Target: Lighthouse ≥ 90 on all four categories on mobile.

---

## 1. Core Web Vitals Targets

| Metric | Target | Tool |
|---|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5 s | Lighthouse, CrUX |
| INP (Interaction to Next Paint) | ≤ 200 ms | Lighthouse, CrUX |
| CLS (Cumulative Layout Shift) | ≤ 0.10 | Lighthouse, CrUX |
| FCP (First Contentful Paint) | ≤ 1.8 s | Lighthouse |
| TTFB (Time to First Byte) | ≤ 600 ms | WebPageTest |

LCP element is the hero doctor photo (`Assets/Images/hero.jpg`). 
Every image optimization decision below prioritizes reducing LCP.

---

## 2. Images

### Format

Always serve WebP with JPEG fallback:

```html
<picture>
  <source srcset="Assets/Images/hero.webp" type="image/webp" />
  <img src="Assets/Images/hero.jpg" alt="..." loading="eager" fetchpriority="high" />
</picture>
```

### Sizing

| Image | Max dimensions | Max file size | Notes |
|---|---|---|---|
| Hero (LCP) | 900 × 1200 px | 150 KB WebP | `fetchpriority="high"`, no lazy load |
| Section thumbnails | 600 × 400 px | 60 KB WebP | `loading="lazy"` |
| Doctor portrait cards | 400 × 500 px | 50 KB WebP | `loading="lazy"` |
| Stock / blog | 800 × 500 px | 80 KB WebP | `loading="lazy"` |

### Responsive Images

Use `srcset` + `sizes` for above-fold images:

```html
<img
  srcset="Assets/Images/hero-480.webp 480w,
          Assets/Images/hero-900.webp 900w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="Assets/Images/hero-900.webp"
  alt="..."
  loading="eager"
  fetchpriority="high"
/>
```

### Conversion Workflow

Convert images before committing using either:
- [Squoosh](https://squoosh.app/) — browser-based, free
- `cwebp -q 82 input.jpg -o output.webp` (CLI tool)

---

## 3. Fonts

### Strategy: `font-display: swap` + preload critical weights

Preload only the two fonts rendered above the fold (Inter 900 Bold for headline, 
Work Sans 400 for body text):

```html
<!-- In <head>, before stylesheets -->
<link rel="preload" as="font" type="font/truetype" crossorigin
  href="Assets/Fonts/Inter/Inter_28pt-Bold.ttf" />
<link rel="preload" as="font" type="font/truetype" crossorigin
  href="Assets/Fonts/Work Sans/WorkSans-Regular.ttf" />
```

All `@font-face` declarations must include `font-display: swap`:

```css
@font-face {
  font-family: 'Inter';
  src: url('Assets/Fonts/Inter/Inter_28pt-Bold.ttf') format('truetype');
  font-weight: 700;
  font-display: swap;
}
```

> **Future improvement:** Convert `.ttf` files to `.woff2` format (30-40% smaller). 
> Use `pyftsubset` or [fonttools](https://github.com/fonttools/fonttools) to subset to Latin + Spanish characters only.

---

## 4. CSS

- **Critical CSS** (tokens + navbar + hero): inline in `<style>` — cap at 14 KB unminified.
- **Below-fold CSS**: load async using the print trick:

```html
<link rel="stylesheet" href="assets/css/components.css"
      media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="assets/css/components.css" /></noscript>
```

- **Minify** at deploy time — do NOT commit minified files (see ARCHITECTURE.md §9).
- Audit for unused CSS before adding to a release. Remove rules for removed sections.

---

## 5. JavaScript

- All `<script>` tags use `defer` or `type="module"` (which is deferred by default).
- No render-blocking scripts in `<head>`.
- No `document.write()` — ever.
- Avoid layout thrash: batch DOM reads before writes.
- Debounce scroll/resize handlers:

```js
let scrollTick = false;
window.addEventListener('scroll', () => {
  if (scrollTick) return;
  scrollTick = true;
  requestAnimationFrame(() => {
    onScroll();
    scrollTick = false;
  });
}, { passive: true });
```

- All IntersectionObservers call `observer.unobserve(entry.target)` once triggered.

---

## 6. HTML

- `<meta charset>` and `<meta viewport>` must be the first two tags in `<head>`.
- Set explicit `width` and `height` attributes on all `<img>` to prevent CLS:

```html
<img src="..." width="420" height="560" alt="..." />
```

- Use `<link rel="preconnect">` for any external origin used (analytics, 
  WhatsApp API, etc.):

```html
<link rel="preconnect" href="https://www.google-analytics.com" crossorigin />
```

---

## 7. Caching & Hosting

Configure your hosting/CDN to serve these cache headers:

| Asset type | Cache-Control |
|---|---|
| HTML | `no-cache` (always revalidate) |
| CSS / JS (hashed filenames) | `public, max-age=31536000, immutable` |
| Images (WebP/JPEG) | `public, max-age=2592000` (30 days) |
| Fonts (.ttf / .woff2) | `public, max-age=31536000, immutable` |

Use **content-hashed filenames** (`components.a1b2c3.css`) for CSS/JS so they can 
be cached forever while still busting on change.

---

## 8. Lighthouse Audit Workflow

Run before every section release and fix any regression above orange:

```bash
# Install Lighthouse CLI (one time)
npm install -g lighthouse

# Run audit on local dev server
lighthouse http://localhost:5500 --output=html --output-path=./audit.html
```

Or use [PageSpeed Insights](https://pagespeed.web.dev/) with the final URL.

**Hard gates (must pass before deploy):**

| Category | Min score |
|---|---|
| Performance | 85 |
| Accessibility | 95 |
| Best Practices | 95 |
| SEO | 95 |

---

## 9. Google Search Console & Analytics Impact

- Verified CrUX data in Search Console is the ground truth for ranking.
- Monitor the **Core Web Vitals** report — aim for 100% URLs in "Good" status.
- Real-user LCP on mobile over 3G is typically 2× the Lighthouse score — 
  keep LCP asset (hero image) under 100 KB.

---

## 10. Performance Checklist Pre-Launch

- [ ] Hero image converted to WebP and < 150 KB
- [ ] `font-display: swap` on all `@font-face`
- [ ] Preload tags on above-fold fonts
- [ ] No render-blocking scripts in `<head>`
- [ ] All below-fold images have `loading="lazy"`
- [ ] All `<img>` have explicit `width` + `height` (CLS = 0)
- [ ] Lighthouse Performance ≥ 85 on mobile
- [ ] Total page weight (initial load) ≤ 1 MB
- [ ] TTFB ≤ 600 ms (hosting / CDN configured)
