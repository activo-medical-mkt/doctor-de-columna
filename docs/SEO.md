# SEO Guidelines — Traumatólogo GDL

> **Version:** 1.0 · Last updated: 2026-03-10  
> Local medical SEO strategy for "traumatólogo en Guadalajara" and related queries.

---

## 1. Keyword Strategy

### Primary Keywords (highest intent, target on homepage)

| Keyword | Monthly searches (MX) | Priority |
|---|---|---|
| traumatólogo en Guadalajara | High | P0 |
| ortopedista en Guadalajara | High | P0 |
| médico ortopédico Guadalajara | Medium | P0 |
| traumatólogo Zapopan | Medium | P1 |
| cirujano ortopédico GDL | Medium | P1 |
| doctor especialista en huesos Guadalajara | Medium | P1 |

### Secondary Keywords (target on service pages)

| Keyword | Target page |
|---|---|
| cirugía de rodilla Guadalajara | /paginas/rodilla |
| hernia de disco Guadalajara | /paginas/columna |
| artroscopia de rodilla GDL | /paginas/rodilla |
| lesiones deportivas traumatólogo | /paginas/deportivas |
| ortopedista urgencias Guadalajara | /paginas/urgencias |
| reemplazo de cadera Guadalajara | /paginas/cadera |

### Long-tail / Question Keywords (target on blog)

- "qué hace un traumatólogo ortopedista"
- "cuánto cuesta una cirugía de rodilla en Guadalajara"
- "cuándo ir al traumatólogo por un esguince"
- "diferencia entre traumatólogo y ortopedista"
- "señales de que necesitas cirugía de rodilla"

---

## 2. On-Page SEO — Per-Page Checklist

### Title Tag

```html
<title>Traumatólogo y Ortopedista en Guadalajara | Dr. [Apellido] · GDL</title>
```

Rules:
- Max 60 characters (including spaces)
- Primary keyword near the start
- Brand name at the end after `|` or `·`
- Each page has a **unique** title

### Meta Description

```html
<meta name="description" content="Médico Traumatólogo y Ortopedista en Guadalajara y Zapopan. Cirugía artroscópica, fracturas, columna vertebral y lesiones deportivas. Cita en 24 h." />
```

Rules:
- 140–160 characters
- One call to action
- Includes primary keyword naturally
- Unique per page

### Canonical Tag

```html
<link rel="canonical" href="https://yourdomain.com/" />
```

- Always points to the preferred URL (trailing slash consistent).
- Prevents duplicate content from UTM parameters.

### Heading Hierarchy

```
H1  → One per page. Primary keyword. Never just "Bienvenido".
H2  → Major sections. Include secondary keywords.
H3  → Subsections. Can use long-tail terms.
H4+ → Only for content-heavy pages (blog).
```

Example for homepage:
- H1: "Médico Traumatólogo y Ortopedista en Guadalajara y Zapopan"
- H2: "Tu Cirujano Ortopédico Cerca de Mí: Dile adiós al dolor articular y óseo"
- H2: "Servicios de Traumatología y Ortopedia en GDL"
- H3: "Cirugía Artroscópica de Rodilla", "Tratamiento de Columna Vertebral"…

---

## 3. Schema Markup (Structured Data)

Add JSON-LD blocks in `<script type="application/ld+json">` for every page.

### Homepage — Physician + MedicalOrganization

```json
{
  "@context": "https://schema.org",
  "@type": ["Physician", "LocalBusiness"],
  "name": "Dr. [Nombre Completo] — Traumatólogo y Ortopedista",
  "description": "Médico Traumatólogo y Ortopedista en Guadalajara y Zapopan. Especialista en cirugía artroscópica, columna vertebral y lesiones deportivas.",
  "url": "https://yourdomain.com",
  "telephone": "+52-33-XXXX-XXXX",
  "email": "contacto@yourdomain.com",
  "image": "https://yourdomain.com/Assets/Images/hero.jpg",
  "logo": "https://yourdomain.com/Assets/Images/logo.webp",
  "priceRange": "$$",
  "currenciesAccepted": "MXN",
  "paymentAccepted": "Cash, Credit Card",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Calle y número]",
    "addressLocality": "Guadalajara",
    "addressRegion": "Jalisco",
    "postalCode": "XXXXX",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 20.6597,
    "longitude": -103.3496
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/YOUR_PAGE",
    "https://www.instagram.com/YOUR_PROFILE",
    "https://www.doctoralia.com.mx/YOUR_PROFILE"
  ],
  "medicalSpecialty": "Orthopedic Surgery",
  "availableService": [
    {"@type": "MedicalProcedure", "name": "Artroscopia de Rodilla"},
    {"@type": "MedicalProcedure", "name": "Cirugía de Columna Vertebral"},
    {"@type": "MedicalProcedure", "name": "Fijación de Fracturas"},
    {"@type": "MedicalProcedure", "name": "Tratamiento de Lesiones Deportivas"}
  ]
}
```

### Blog Posts — Article schema

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "headline": "...",
  "description": "...",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "author": {
    "@type": "Physician",
    "name": "Dr. [Nombre Completo]"
  }
}
```

---

## 4. Open Graph & Social Tags

Add to every page `<head>`:

```html
<meta property="og:type"        content="website" />
<meta property="og:url"         content="https://yourdomain.com/" />
<meta property="og:title"       content="Traumatólogo y Ortopedista en Guadalajara" />
<meta property="og:description" content="Atención traumatológica integral. Cita en 24 h." />
<meta property="og:image"       content="https://yourdomain.com/Assets/Images/og-home.jpg" />
<meta property="og:locale"      content="es_MX" />
<meta name="twitter:card"       content="summary_large_image" />
```

OG image specs: **1200 × 630 px**, < 300 KB JPEG, text legible at small sizes.

---

## 5. Local SEO — Google Business Profile

Critical for "near me" and map pack visibility.

- [ ] Claim and verify Google Business Profile (GBP)
- [ ] Name must exactly match the site: "Dr. [Nombre] — Traumatólogo y Ortopedista"
- [ ] Category: **"Orthopedic surgeon"** (primary) + "Doctor" (secondary)
- [ ] Add all consultation locations (Guadalajara + Zapopan) as separate listings or service areas
- [ ] Upload minimum 10 photos (exterior, interior, doctor, equipment)
- [ ] Add services with descriptions and prices if possible
- [ ] Enable messaging and respond within 1 hour
- [ ] Respond to every review (positive and negative) within 24 hours

### NAP Consistency

Name, Address, and Phone must be **identical** across:
- This website (footer)
- Google Business Profile
- Doctoralia listing
- Facebook Page
- Any health directory listings

---

## 6. Technical SEO

### Sitemap

Create `sitemap.xml` and submit to Google Search Console:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yourdomain.com/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://yourdomain.com/pages/servicios.html</loc><priority>0.9</priority></url>
  <url><loc>https://yourdomain.com/pages/doctor.html</loc><priority>0.8</priority></url>
  <url><loc>https://yourdomain.com/pages/contacto.html</loc><priority>0.8</priority></url>
</urlset>
```

### URL Structure

- Short, lowercase, hyphenated, keyword-aware
- Spanish URLs for Spanish content

```
✅  /pages/cirugia-rodilla-guadalajara
❌  /pages/page2.html
❌  /pages/CirugiaRodilla
```

### Internal Linking

- Every service mentioned in body text links to the corresponding service page
- Blog posts link back to the most relevant service page (+ homepage)
- Anchor text = descriptive keyword phrase, never "click here" or "ver más"

---

## 7. Medical Content Rules

- All medical claims must be accurate and verifiable
- Add a disclaimer on blog/informational pages: 
  "Este contenido es informativo y no sustituye una consulta médica profesional."
- Do not make guarantees about outcomes (legal risk + Google YMYL guidelines)
- Build E-E-A-T signals:
  - Doctor's credentials, board certifications, medical school visible on the site
  - Author byline on every blog post
  - Date published + date reviewed/updated on medical articles

---

## 8. SEO Checklist Pre-Launch

- [ ] Unique `<title>` and `<meta description>` on every page
- [ ] One H1 per page containing primary keyword
- [ ] Canonical tags on all pages
- [ ] Sitemap.xml created and submitted to Google Search Console
- [ ] robots.txt in place
- [ ] Schema markup validated at [schema.org/validator](https://validator.schema.org/)
- [ ] Open Graph tags on all pages + OG image created (1200×630)
- [ ] Google Business Profile claimed and fully filled out
- [ ] NAP consistent across all citations
- [ ] Google Search Console property verified
- [ ] All images have descriptive alt text
