/* Fake-3D card art (see .cx3d in home-b.css).
 *  - Animations only run while the card is near the viewport (.cx3d-live), so off-screen cards cost nothing.
 *  - With a fine pointer, the art tilts toward the cursor (rAF-throttled CSS variables, transform only).
 *  - Does nothing for prefers-reduced-motion. */
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const MAX_TILT = 12; // degrees

  function init() {
    const arts = document.querySelectorAll('.cx3d');
    if (!arts.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.target.classList.toggle('cx3d-live', e.isIntersecting));
      }, { rootMargin: '100px 0px' });
      arts.forEach((a) => io.observe(a));
    } else {
      arts.forEach((a) => a.classList.add('cx3d-live'));
    }

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    arts.forEach((art) => {
      const card = art.closest('a, article, div') || art;
      const tilt = art.querySelector('.cx3d-tilt');
      let frame = 0, px = 0, py = 0;
      const apply = () => {
        frame = 0;
        tilt.style.setProperty('--cx-ry', (px * MAX_TILT).toFixed(2) + 'deg');
        tilt.style.setProperty('--cx-rx', (-py * MAX_TILT * 0.7).toFixed(2) + 'deg');
        tilt.style.setProperty('--cx-px', px.toFixed(3));
      };
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        px = (e.clientX - r.left) / r.width * 2 - 1;
        py = (e.clientY - r.top) / r.height * 2 - 1;
        if (!frame) frame = requestAnimationFrame(apply);
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        px = py = 0;
        if (!frame) frame = requestAnimationFrame(apply);
      });
    });
  }

  document.addEventListener('partials-ready', init, { once: true });
  if (document.querySelector('.footer-b')) init();
})();
