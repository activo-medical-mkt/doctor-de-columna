/* Generated English UI: edit the shared source/catalog, then run scripts/build_en_tijuana.py. */
/* Muted autoplay videos that only download when near the viewport (keeps LCP / page weight clean).
 * Markup: <video data-lazy-video data-src="..." poster="..." autoplay muted loop playsinline preload="none">
 * (no src until near the viewport, so `autoplay` downloads nothing up front).
 * Pauses off-screen; with prefers-reduced-motion only the poster is shown. */
(() => {
  const init = () => {
    if (window.__lazyVideoInit) return; // runs on load and again on partials-ready
    const vids = document.querySelectorAll('video[data-lazy-video]');
    if (!vids.length || !('IntersectionObserver' in window)) return;
    window.__lazyVideoInit = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ target: v, isIntersecting }) => {
        if (isIntersecting) {
          if (!v.src) { v.muted = true; v.src = v.dataset.src; v.load(); }
          const p = v.play(); if (p) p.catch(() => v.addEventListener('canplay', () => v.play().catch(() => {}), { once: true }));
        } else if (v.src) v.pause();
      });
    }, { rootMargin: '200px 0px' });
    vids.forEach((v) => io.observe(v));
  };
  document.addEventListener('partials-ready', init, { once: true });
  if (document.querySelector('.footer-b')) init();
})();
