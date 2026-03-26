// loader.js — Fetches HTML partials and injects them into [data-include] placeholders.
// Runs as type="module" (deferred). Fires "partials-ready" when all sections are in the DOM.
(async () => {
  function normalizeScriptType(type) {
    return (type || 'text/javascript').trim().toLowerCase();
  }

  const slots = Array.from(document.querySelectorAll('[data-include]'));
  if (!slots.length) {
    document.dispatchEvent(new Event('partials-ready'));
    return;
  }

  await Promise.all(slots.map(async slot => {
    const url = slot.dataset.include;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
      const html = await res.text();

      // Parse into a temp div (innerHTML does NOT execute <script> tags)
      const tmp = document.createElement('div');
      tmp.innerHTML = html;

      // Sanitize script tags from partials:
      // - Keep JSON-LD scripts intact for SEO
      // - Recreate external scripts so they can load after insertion
      // - Remove inline JS to avoid syntax errors breaking partial rendering
      tmp.querySelectorAll('script').forEach(orig => {
        const scriptType = normalizeScriptType(orig.getAttribute('type'));

        if (scriptType === 'application/ld+json') {
          return;
        }

        if (orig.src) {
          const copy = document.createElement('script');
          for (const attr of orig.attributes) copy.setAttribute(attr.name, attr.value);
          orig.replaceWith(copy);
          return;
        }

        orig.remove();
      });

      // Drain children into a DocumentFragment — avoids live-NodeList spread issues
      const frag = document.createDocumentFragment();
      while (tmp.firstChild) frag.appendChild(tmp.firstChild);

      slot.replaceWith(frag);
    } catch (err) {
      console.error('[loader] Failed to load partial:', err.message);
      // Leave a visible marker in dev so the broken section is obvious
      slot.insertAdjacentHTML('afterend',
        `<p style="color:red;font-family:monospace;padding:1rem">[loader error] ${err.message}</p>`);
      slot.remove();
    }
  }));

  document.dispatchEvent(new Event('partials-ready'));
})();
