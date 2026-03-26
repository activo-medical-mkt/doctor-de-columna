# Security Guidelines — Traumatólogo GDL

> **Version:** 1.0 · Last updated: 2026-03-10  
> Applies to the entire site. Review before every deployment.

---

## 1. HTTPS & Transport Security

| Requirement | Detail |
|---|---|
| SSL/TLS | Enforce HTTPS everywhere. No HTTP fallback. |
| HSTS | Add `Strict-Transport-Security: max-age=31536000; includeSubDomains` header |
| Redirect | 301 redirect all `http://` → `https://` at server/CDN level |
| Mixed content | Zero tolerance — no HTTP resources loaded on an HTTPS page |

---

## 2. HTTP Security Headers

Configure these on your hosting provider (Cloudflare, Netlify, Vercel, Apache, Nginx):

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Content Security Policy (CSP)

Start with a strict policy and loosen only what is required:

```
Content-Security-Policy:
  default-src 'self';
  script-src  'self';
  style-src   'self' 'unsafe-inline';
  img-src     'self' data: https:;
  font-src    'self';
  connect-src 'self' https://wa.me https://api.whatsapp.com;
  frame-src   'none';
  object-src  'none';
  base-uri    'self';
  form-action 'self' https://formspree.io https://wa.me;
```

> `unsafe-inline` is currently required for inline `<style>` blocks. Once CSS is 
> extracted to external files (see ARCHITECTURE.md §7), replace with 
> a `style-src 'self'` directive.

---

## 3. Contact Form & User Input

The site has no server-side logic today, but when a contact form is added:

- **Never trust client input.** All validation is cosmetic on the frontend; 
  enforce it server-side or via the form provider (Formspree, Netlify Forms, etc.).
- **Honeypot field:** Add a hidden `<input name="_gotcha" style="display:none">` 
  to catch simple bots without CAPTCHA friction.
- **Rate limiting:** Use the form provider's built-in rate limiting. 
  Set to max 5 submissions per IP per hour.
- **No PII in URLs:** Never put patient name, email, or phone as query params.
- **Redirect after submit:** Always redirect to a `/gracias` page to prevent 
  duplicate form submissions on refresh.

### WhatsApp CTA Links

The current CTAs use `https://wa.me/` deep links. Rules:

- Phone in the `href` must use international format: `+52133XXXXXXXX`
- Never expose the raw phone number as visible text on pages indexed by Google 
  (use `<a href="tel:...">Llámanos</a>` or obfuscate with CSS `::before` content trick 
  to reduce scraper harvesting for spam).
- For the displayed number, split it visually: `(33) 1234-5678` not `3312345678`.

---

## 4. Dependency Security

The site is intentionally dependency-free (Design Guide rule #9). Maintain this.

If third-party scripts are ever added (analytics, chat widget, etc.):

1. Pin to a specific version — never load from `@latest`.
2. Add the script's domain to the CSP `script-src` allowlist.
3. Use `integrity="sha384-..."` (SRI) for any `<script src>` from a CDN.
4. Add `crossorigin="anonymous"` alongside every SRI attribute.

```html
<!-- Example with SRI -->
<script
  src="https://cdn.example.com/lib@2.1.0/script.min.js"
  integrity="sha384-XXXXXXXXXXXXXXXX"
  crossorigin="anonymous"
  defer>
</script>
```

---

## 5. Analytics & Privacy

Mexican law (LFPDPPP) and GDPR (if EU visitors) require informed consent before tracking.

| Requirement | Implementation |
|---|---|
| Cookie banner | Show before any analytics fires. Store consent in `localStorage`. |
| Analytics activation | Fire Google Analytics / Meta Pixel only after `consent = true`. |
| Privacy policy page | Required. Link in footer. Must describe data collection and patient rights. |
| Medical data | NEVER store patient symptoms, diagnoses, or history client-side. |
| Form data | Use HTTPS + encrypted form providers only. |

### Minimal Consent Cookie Pattern

```js
const hasConsent = () => localStorage.getItem('cookie_consent') === 'accepted';

function loadAnalytics() {
  if (!hasConsent()) return;
  // dynamically inject analytics script
}
```

---

## 6. SEO & Brand Reputation Security

- **Google Search Console** verification file or meta tag must be added before launch.
- **Favicon** prevents brand confusion in browser tabs — use a custom one, not default.
- **robots.txt** — allow all by default; explicitly disallow `/admin`, `/draft`, `/test`:

```
User-agent: *
Disallow: /admin/
Disallow: /draft/
Disallow: /test/
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 7. Image & File Upload Security

Images are currently static assets served from `assets/`. No uploads are handled.  
When a CMS or file upload is added:

- Restrict accepted MIME types: `image/jpeg`, `image/webp`, `image/png` only.
- Limit upload size to 5 MB.
- Rename uploaded files server-side (never use original filename).
- Serve uploaded files from a separate subdomain with no `execute` permission.

---

## 8. Hosting Checklist Pre-Launch

- [ ] SSL certificate installed and auto-renewing
- [ ] All HTTP → HTTPS redirects active
- [ ] Security headers verified via [securityheaders.com](https://securityheaders.com)
- [ ] robots.txt in place
- [ ] No `.env` or config files in the web root
- [ ] Directory listing disabled on server
- [ ] 404 custom error page returns status code 404 (not 200)
- [ ] CSP header set and tested (no CSP violations in DevTools console)
