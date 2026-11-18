/* Generated English UI: edit the shared source/catalog, then run scripts/build_en_tijuana.py. */
/* Scroll-reveal transitions for the version-B pages (fade + rise, cards also scale up, staggered).
 * Core Web Vitals safety:
 *  - Only opacity and the standalone `translate` / `scale` properties animate: compositor-only,
 *    no layout work, no CLS (transforms never count as layout shifts).
 *  - Nothing in the viewport when the script runs is hidden, and the hero is never touched,
 *    so LCP and first paint are unaffected. Content is only hidden by JS, so no-JS users see everything.
 *  - One IntersectionObserver, no scroll listeners; each element is unobserved after it reveals and
 *    its reveal attributes are removed, so its own hover/flip transitions work as before.
 *  - Disabled for prefers-reduced-motion.
 */
(() => {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // [selector, variant]; elements matched by the same selector inside the same parent are staggered.
  const GROUPS = [
    // Section intros: eyebrow, heading, copy, actions rise one after another.
    ['.clinic-intro-content > *', 'up'],
    ['.doctor-profile-header > *', 'up'],
    ['.doctor-profile-content > *:not(.doctor-profile-credentials)', 'up'],
    ['.patient-stories-header > *', 'up'],
    ['.care-hub-header > *', 'up'],
    ['.faq-b-intro > *', 'up'],
    ['.spine-care-title, .spine-care-label', 'up'],
    ['.footer-b-top > *', 'up'],
    // Cards: rise + scale in, staggered across the row.
    ['.condition-card', 'card'],
    ['.doctor-profile-credential', 'card'],
    ['.patient-video', 'card'],
    ['.procedure-flip-card', 'card'],
    ['.journal-card', 'card'],
    ['.condition-hub-item', 'up'],
    ['.faq-b-item', 'up'],
    // Large media blocks: soft fade + gentle scale.
    ['.clinic-intro-visual', 'media'],
    ['.spine-care-main, .spine-care-side', 'media'],
    ['.doctor-profile-photo, .doctor-profile-card', 'media'],
    ['.condition-hub-figure', 'media'],
    ['.procedure-hub-feature', 'media'],
    ['.contact-b-card, .contact-b-map', 'media'],
    // Inner pages (condiciones / servicios): headings, cards, steps and figures.
    ['.cb-section-head > *, .cb-feature-copy > *, .cb-diagnosis-intro > *, .cb-type-forms > *', 'up'],
    ['.endo-recovery-header > *, .endo-tech-header > *, .sh-hub-header > *, .sh-followup-head > *', 'up'],
    ['.cb-expand', 'up'],
    ['.cb-cause-grid > article', 'card'],
    ['.cb-steps > li, .cb-endo-process > *, .sh-followup-steps > *, .endo-tech-rows > *, .sh-condition-list > *', 'up'],
    ['.cb-urgent, .cb-note', 'up'],
    ['.cb-anatomy, .cb-treatment-image, .endo-conditions-visual, .endo-recovery-photo, .endo-tech-photo, .endo-video-card, .sh-condition-visual', 'media'],
  ];
  const STEP = 80;      // ms between staggered siblings
  const MAX_DELAY = 480;
  const DURATION = 800; // keep in sync with --rv-dur in home-b.css

  const done = (el) => {
    el.removeAttribute('data-rv');
    el.classList.remove('rv-in');
    el.style.removeProperty('--rv-delay');
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      el.classList.add('rv-in');
      const delay = parseInt(el.style.getPropertyValue('--rv-delay'), 10) || 0;
      setTimeout(() => done(el), delay + DURATION + 60);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  function init() {
    if (document.documentElement.classList.contains('rv-on')) return;
    const vh = window.innerHeight;
    const seen = new Set();
    GROUPS.forEach(([selector, variant]) => {
      const counters = new Map();
      document.querySelectorAll(selector).forEach((el) => {
        if (seen.has(el) || el.closest('.hero') || el.classList.contains('reveal')) return;
        seen.add(el);
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) return;          // already on screen: leave it alone
        if (r.width < 4 || r.height < 4) return;         // hidden or screen-reader-only content
        if (r.left >= window.innerWidth || r.right <= 0) return; // off to the side in a swipe carousel
        const parent = el.parentElement;
        const i = counters.get(parent) || 0;
        counters.set(parent, i + 1);
        el.setAttribute('data-rv', variant);
        el.style.setProperty('--rv-delay', Math.min(i * STEP, MAX_DELAY) + 'ms');
        io.observe(el);
      });
    });
    document.documentElement.classList.add('rv-on');
  }

  // Sections arrive as partials; run once they are in the DOM.
  // Inner pages have their footer inline but still load the doctor/reseñas/contacto partials,
  // so wait while any include slot is still empty.
  document.addEventListener('partials-ready', init, { once: true });
  if (document.querySelector('.footer-b') && !document.querySelector('[data-include]:empty')) init(); // partials were already in place
})();
