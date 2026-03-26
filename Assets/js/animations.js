/**
 * LEGACY NOTE:
 * This file is retained for reference and is not loaded by index.html at runtime.
 * Active production behavior is in Assets/js/main.js.
 *
 * animations.js — Scroll reveal (IntersectionObserver)
 * Traumatólogo GDL
 *
 * Responsibilities:
 *   - Observe all .reveal elements
 *   - Add .visible once they enter the viewport (fires once, then unobserves)
 *   - Immediately reveal hero elements already in view on page load
 *
 * Exports: initAnimations()
 */

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));

  // Hero elements are already in the viewport on load.
  // Slight delay lets the browser paint the initial frame first.
  const heroReveals = document.querySelectorAll('.hero .reveal');
  if (heroReveals.length) {
    setTimeout(() => {
      heroReveals.forEach((el) => el.classList.add('visible'));
    }, 100);
  }
}

export function initAnimations() {
  initReveal();
}
