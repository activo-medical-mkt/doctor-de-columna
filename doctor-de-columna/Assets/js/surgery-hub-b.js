/* The photographs unfold as the visitor scrolls through the hero. */
(() => {
  const hero = document.querySelector('.sh-hero');
  const photos = document.querySelector('.sh-photos');
  if (!hero || !photos) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let pending = false;
  function render() {
    pending = false;
    const distance = innerWidth < 700 ? 240 : 430;
    const progress = reduced.matches ? 1 : Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / distance));
    photos.style.setProperty('--spread', progress.toFixed(4));
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(render); }
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  reduced.addEventListener('change', schedule);
  render();
})();
