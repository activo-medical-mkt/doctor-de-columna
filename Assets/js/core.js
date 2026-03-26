/**
 * core.js — Navbar scroll effect + scroll progress bar
 * Traumatólogo GDL
 *
 * Responsibilities:
 *   - Toggle .scrolled class on <nav id="navbar"> based on scroll position
 *   - Update width of #scrollProgress bar as percentage of page scrolled
 *
 * Exports: initCore()
 */

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Set initial state without waiting for first scroll
  updateNavbar();

  window.addEventListener('scroll', updateNavbar, { passive: true });
}

function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  let ticking = false;

  function updateProgress() {
    const scrollY = window.scrollY;
    const docH    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docH > 0 ? (scrollY / docH) * 100 : 0) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateProgress);
  }, { passive: true });
}

export function initCore() {
  initNavbar();
  initScrollProgress();
}
