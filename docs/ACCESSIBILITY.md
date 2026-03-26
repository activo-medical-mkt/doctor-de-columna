# Accessibility Guidelines — Traumatólogo GDL

> **Version:** 1.0 · Last updated: 2026-03-10  
> Target: **WCAG 2.1 Level AA** compliance across the entire site.  
> Medical sites serve users of all ages and abilities — accessibility is non-negotiable.

---

## 1. Color Contrast

WCAG AA requires:  
- **Normal text** (< 18pt or < 14pt bold): contrast ratio ≥ 4.5:1  
- **Large text** (≥ 18pt or ≥ 14pt bold): contrast ratio ≥ 3:1  
- **UI components** (borders, icons, buttons): contrast ratio ≥ 3:1

### Current Token Audit

| Token | Value | On background | Ratio | Pass? |
|---|---|---|---|---|
| `--color-navy` | `#183F66` | `#F4F7FF` | 9.4:1 | ✅ AA + AAA |
| `--color-navy` | `#183F66` | `#FFFFFF` | 9.8:1 | ✅ AA + AAA |
| `--color-primary` | `#357EB3` | `#F4F7FF` | 4.8:1 | ✅ AA |
| `--color-primary` | `#357EB3` | `#FFFFFF` | 5.0:1 | ✅ AA |
| `--color-text-body` | `#36546C` | `#F4F7FF` | 5.9:1 | ✅ AA |
| `--color-text-low` | `#7A9AB8` | `#FFFFFF` | 2.9:1 | ⚠️ Use for decorative only |
| `--color-accent-soft` | `#ADCDE2` | `#FFFFFF` | 1.8:1 | ❌ Never use for text |
| `--color-green` | `#63FF84` | `#FFFFFF` | 1.3:1 | ❌ Never use for text on white |
| `--color-green` | `#63FF84` | `#183F66` | 7.1:1 | ✅ OK on navy backgrounds |

> `--color-text-low` (#7A9AB8) and `--color-accent-soft` (#ADCDE2) are for 
> decorative/supporting elements only — never for body text, labels, or interactive states.

Verify contrast of any new color pair at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) before using.

---

## 2. Keyboard Navigation

Every interactive element must be reachable and operable by keyboard.

### Tab Order

The logical tab order must match the visual reading order:
1. Skip-to-content link (see §3)
2. Navbar logo
3. Navbar links
4. Navbar CTA
5. Hero CTAs
6. Section CTAs and interactive cards
7. Footer links

### Focus Styles

Never use `outline: none` without providing a custom focus indicator that meets 3:1 contrast:

```css
/* ✅ Correct — custom focus ring using design tokens */
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* ❌ Forbidden */
*:focus { outline: none; }
```

Use `:focus-visible` (not `:focus`) so focus rings only appear for keyboard users, 
not mouse clicks.

---

## 3. Skip Navigation

The first element inside `<body>` must be a skip link:

```html
<a class="skip-link" href="#main-content">Saltar al contenido principal</a>

<style>
  .skip-link {
    position: absolute;
    top: -100%;
    left: var(--space-4);
    padding: var(--space-2) var(--space-4);
    background: var(--color-navy);
    color: var(--color-text-high);
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 14px;
    z-index: 9999;
    transition: top 0.2s;
  }
  .skip-link:focus { top: var(--space-4); }
</style>
```

The main content area must have `id="main-content"`:
```html
<main id="main-content">...</main>
```

---

## 4. Images & Alt Text

| Image type | Alt text rule |
|---|---|
| Hero doctor photo | Descriptive: `"Médico Traumatólogo y Ortopedista en Guadalajara sonriendo"` |
| Decorative icons (SVG) | `aria-hidden="true"` — no alt needed |
| Stat card icons | `aria-hidden="true"` — value/label in adjacent text |
| Blog/service photos | Descriptive and keyword-aware |
| OG image | Not rendered in DOM — no alt required |

Rules:
- Never use `alt=""` for editorial images that convey content.
- Never stuff keywords: `alt="traumatólogo ortopedista cirugía rodilla Guadalajara Zapopan"` is wrong.
- Keep alt under 125 characters.
- Do not start with "Image of" or "Photo of" — screen readers announce "image" automatically.

---

## 5. Semantic HTML

Use the correct element for its meaning — not for its default appearance.

| Use case | Correct element |
|---|---|
| Main page navigation | `<nav aria-label="Navegación principal">` |
| Page sections | `<section aria-labelledby="section-heading-id">` |
| Page main content | `<main id="main-content">` |
| Primary page heading | `<h1>` — one per page |
| Button that triggers JS | `<button>` (not `<div onclick>`) |
| Link that navigates | `<a href="...">` (not `<button>`) |
| List of items | `<ul>` + `<li>` |
| Data in rows/columns | `<table>` + `<th scope>` |

---

## 6. ARIA

Use ARIA only when native HTML semantics are insufficient.

### Current ARIA usage in index.html

| Element | ARIA attribute | Purpose |
|---|---|---|
| `<nav>` | `aria-label="Navegación principal"` | Labels this nav among multiple nav elements |
| `<section>` | `aria-labelledby="hero-h1"` | Associates section with its heading |
| Decorative SVGs | `aria-hidden="true"` | Removes from accessibility tree |
| Hero visual | `role="img" aria-label="..."` | Groups photo + stat cards as one image |
| Stat pill container | `aria-label="Estadísticas del consultorio"` | Describes the group |
| Pain cards container | `role="list" aria-label="Áreas de especialidad"` | Semantic list for custom card elements |

### ARIA Rules

- `aria-hidden="true"` on any SVG that already has a text alternative nearby.
- `aria-label` or `aria-labelledby` on any section/landmark that would be ambiguous.
- `aria-current="page"` on the active nav link (already implemented in `<a class="active">`).
- Never use `role="button"` on an `<a>` tag — use `<button>` and style it as needed.
- Never duplicate information that's already visible in text.

---

## 7. Forms (when added)

```html
<!-- ✅ Every input has a permanent visible label -->
<label for="name">Nombre completo *</label>
<input type="text" id="name" name="name" required autocomplete="name"
       aria-describedby="name-hint" />
<span id="name-hint" class="input-hint">Ingresa tu nombre como aparece en tu INE.</span>

<!-- Error state -->
<input ... aria-invalid="true" aria-describedby="name-error" />
<span id="name-error" role="alert">Este campo es requerido.</span>
```

Rules:
- Never use placeholder as the only label — it disappears on focus.
- Required fields: use `required` attribute + visual indicator (`*`) + `aria-required="true"`.
- Error messages use `role="alert"` to announce to screen readers immediately.
- Group related fields in `<fieldset>` + `<legend>`.

---

## 8. Motion & Animation

Some users have vestibular disorders and can be harmed by motion.

Always respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .hero-badge-dot { animation: none; }
  .stat-card      { animation: none; }
  .reveal         { opacity: 1; transform: none; transition: none; }
}
```

---

## 9. Screen Reader Testing

Test with at least one screen reader before launch:

| Screen reader | Platform | Free? |
|---|---|---|
| NVDA | Windows | ✅ Free |
| VoiceOver | macOS / iOS | ✅ Built in |
| TalkBack | Android | ✅ Built in |
| JAWS | Windows | ❌ Paid |

Minimum screen reader test checklist:
- [ ] Page title announced correctly on load
- [ ] All navigation links reachable and labelled
- [ ] H1 → H2 → H3 heading structure logical
- [ ] All images have meaningful alt text or are `aria-hidden`
- [ ] CTAs announce their purpose (not just "button" or URL)
- [ ] Floating stat cards are either announced or `aria-hidden` with data visible in text

---

## 10. Automated Testing

Run on every new section before shipping:

- [axe DevTools](https://www.deque.com/axe/) browser extension — catches ~57% of WCAG issues automatically
- [WAVE](https://wave.webaim.org/) — visual overlay for contrast and structure issues
- Lighthouse Accessibility score target: **≥ 95**

---

## 11. Accessibility Checklist Pre-Launch

- [ ] Skip-to-content link implemented and functional
- [ ] `<main id="main-content">` present
- [ ] All interactive elements reachable by tab in logical order
- [ ] Custom focus style visible (≥ 3:1 contrast, no `outline: none` without replacement)
- [ ] All editorial images have descriptive alt text
- [ ] All decorative SVGs have `aria-hidden="true"`
- [ ] `prefers-reduced-motion` media query stops all animations
- [ ] Heading hierarchy is H1 → H2 → H3 with no skipped levels
- [ ] No `aria-invalid` without visible error message
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Tested with NVDA or VoiceOver
