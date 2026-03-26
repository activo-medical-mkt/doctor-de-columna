// main.js — Page interaction logic for traumatologoengdl.com
// Boots after partial injection when [data-include] slots are present.

// ── Navbar scroll + progress bar ────────────────────────────────────
function initCore() {
  const navbar   = document.getElementById('navbar');
  const progress = document.getElementById('scrollProgress');
  if (!navbar && !progress) return;

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (navbar)   navbar.classList.toggle('scrolled', scrollY > 60);
        if (progress) progress.style.width = (maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0) + '%';
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Mobile hamburger menu ──────────────────────────────────────────
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
      mobileMenu.classList.toggle('open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Close on any link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on scroll
    window.addEventListener('scroll', () => {
      if (mobileMenu.classList.contains('open')) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    }, { passive: true });
  }

  // Detect when navbar is over a dark section
  if (navbar) {
    const darkSections = document.querySelectorAll('[data-nav-dark]');
    if (darkSections.length) {
      const navH = navbar.offsetHeight || 68;
      // rootMargin must be plain px/% — calc() is NOT supported by IntersectionObserver
      const bottomMargin = -(window.innerHeight - navH);
      const active = new Set();
      const darkObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) active.add(e.target);
          else active.delete(e.target);
        });
        navbar.classList.toggle('navbar--on-dark', active.size > 0);
      }, {
        rootMargin: `0px 0px ${bottomMargin}px 0px`,
        threshold: 0
      });
      darkSections.forEach(s => darkObserver.observe(s));
    }
  }
}

function initOnVisible(selector, callback, rootMargin = '0px') {
  const target = document.querySelector(selector);
  if (!target) return;

  if (!('IntersectionObserver' in window)) {
    callback();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      callback();
    });
  }, { rootMargin, threshold: 0.01 });

  observer.observe(target);
}

// ── Scroll reveal (IntersectionObserver) ────────────────────────────
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Double rAF: wait for layout pass after partial injection
  requestAnimationFrame(() => requestAnimationFrame(() => {

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -10px 0px' });

    const vh = window.innerHeight;
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < vh + 100 && rect.bottom > 0;

      if (inView) {
        // Already on screen — just mark visible, no shift
        el.classList.add('visible');
      } else {
        // Below fold — shift down now, slide in on scroll
        el.classList.add('will-animate');
        observer.observe(el);
      }
    });

  }));
}

// ── FAQ accordion ───────────────────────────────────────────────────
function initFaq() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      document.querySelectorAll('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const a = document.getElementById(b.getAttribute('aria-controls'));
        if (a) a.hidden = true;
      });
      // Open clicked (unless it was already open)
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        const answer = document.getElementById(btn.getAttribute('aria-controls'));
        if (answer) answer.hidden = false;
      }
    });
  });

  // "Ver más / Ver menos" toggle
  const moreBtn = document.getElementById('faq-more-btn');
  const extraList = document.getElementById('faq-list-extra');
  if (moreBtn && extraList) {
    moreBtn.addEventListener('click', () => {
      const isExpanded = moreBtn.getAttribute('aria-expanded') === 'true';
      moreBtn.setAttribute('aria-expanded', String(!isExpanded));
      extraList.hidden = isExpanded;
      moreBtn.querySelector('.faq-more-label').textContent =
        isExpanded ? 'Ver más preguntas' : 'Ver menos preguntas';
    });
  }
}

// ── Reviews carousel ────────────────────────────────────────────────
function initReviews() {
  const track = document.getElementById('rev-track');
  if (!track) return;
  const cards = Array.from(track.querySelectorAll('.rev-card'));
  const dotsEl = document.getElementById('rev-dots');
  const prevBtn = document.getElementById('rev-prev');
  const nextBtn = document.getElementById('rev-next');
  const viewport = track.parentElement;
  if (!dotsEl || !viewport || !cards.length) return;

  function visibleCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1023) return 2;
    return 3;
  }

  let perPage = visibleCount();
  let totalPages = Math.ceil(cards.length / perPage);
  let current = 0;
  let timer;

  function buildDots() {
    dotsEl.innerHTML = '';
    totalPages = Math.ceil(cards.length / perPage);
    for (let i = 0; i < totalPages; i++) {
      const d = document.createElement('button');
      d.className = 'rev-dot' + (i === 0 ? ' rev-dot--active' : '');
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', 'Página ' + (i + 1));
      d.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(d);
    }
  }

  function goTo(page) {
    current = (page + totalPages) % totalPages;
    const gap = window.innerWidth <= 600 ? 16 : 24;
    const cardW = cards[0].offsetWidth;
    const shift = current * (cardW * perPage + gap * perPage);
    track.style.transform = 'translateX(-' + shift + 'px)';
    dotsEl.querySelectorAll('.rev-dot').forEach((d, i) => {
      d.classList.toggle('rev-dot--active', i === current);
    });
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === totalPages - 1;
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo((current + 1) % totalPages), 4800);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); restartTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); restartTimer(); });

  viewport.addEventListener('mouseenter', () => clearInterval(timer));
  viewport.addEventListener('mouseleave', restartTimer);

  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); restartTimer(); }
  }, { passive: true });

  window.addEventListener('resize', () => {
    const newPer = visibleCount();
    if (newPer !== perPage) { perPage = newPer; current = 0; buildDots(); }
    goTo(current);
  });

  buildDots();
  goTo(0);
  restartTimer();
}

// ── Third-party Doctoralia widget + fallback sync ───────────────────
function initDoctoralia() {
  const hasAnchor = document.querySelector('.zl-url');
  if (!hasAnchor) return;

  // Skip widget on localhost — it's domain-locked and always returns 403
  const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  if (isLocal) return;

  if (!document.getElementById('zl-widget-s')) {
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      const widgetScript = document.createElement('script');
      widgetScript.id = 'zl-widget-s';
      widgetScript.src = 'https://platform.docplanner.com/js/widget.js';
      firstScript.parentNode.insertBefore(widgetScript, firstScript);
    }
  }

  const anchor = document.getElementById('zl-url-book');
  const fallback = document.getElementById('book-widget-static');
  const wrapper = document.querySelector('.book-widget-wrap');
  if (!anchor || !fallback || !wrapper) return;

  const hasLiveWidget = () => {
    if (anchor.children.length > 0) return true;
    if (wrapper.querySelector('iframe')) return true;
    if (wrapper.querySelector('[class*="docplanner"], [class*="zlw"], [id*="zlw"], [id*="doctoralia"]')) return true;

    return Array.from(wrapper.children).some(node => {
      const el = node;
      return el.id !== 'zl-url-book' && !el.classList.contains('book-widget-static') && !el.classList.contains('zl-url');
    });
  };

  const revealLiveWidget = () => {
    if (fallback.style.display !== 'none') {
      fallback.style.display = 'none';
      wrapper.classList.add('has-live-widget');
    }
  };

  if (hasLiveWidget()) {
    revealLiveWidget();
    return;
  }

  const observer = new MutationObserver(() => {
    if (hasLiveWidget()) {
      revealLiveWidget();
      observer.disconnect();
    }
  });

  observer.observe(wrapper, { childList: true, subtree: true });

  // Fallback polling for widgets that mutate late or outside observer timing.
  let tries = 0;
  const timer = setInterval(() => {
    if (hasLiveWidget()) {
      clearInterval(timer);
      observer.disconnect();
      revealLiveWidget();
      return;
    }
    if (tries > 30) {
      clearInterval(timer);
      observer.disconnect();
    }
    tries += 1;
  }, 250);
}

// ── Count-up animation for stats strip ─────────────────────────────
function initCountUp() {
  const nums = document.querySelectorAll('.stats-strip-num[data-target]');
  if (!nums.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1500;
      const startTime = performance.now();
      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(ease * target);
        el.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.45 });

  nums.forEach(el => observer.observe(el));
}

// ── Boot ─────────────────────────────────────────────────────────────
let coreBooted = false;
let contentBooted = false;

function bootCore() {
  if (coreBooted) return;
  coreBooted = true;
  initCore();
}

function bootContent() {
  if (contentBooted) return;
  contentBooted = true;
  initReveal();
  initFaq();
  initOnVisible('.section-stats-strip', initCountUp, '150px 0px');
  initOnVisible('#resenas', initReviews, '250px 0px');

  const scheduleDoctoralia = () => initOnVisible('#agendar', initDoctoralia, '300px 0px');
  if ('requestIdleCallback' in window) {
    requestIdleCallback(scheduleDoctoralia, { timeout: 2000 });
  } else {
    setTimeout(scheduleDoctoralia, 400);
  }
}

const hasIncludes = !!document.querySelector('[data-include]');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootCore, { once: true });
} else {
  bootCore();
}

if (hasIncludes) {
  document.addEventListener('partials-ready', () => {
    bootCore();
    bootContent();
  }, { once: true });
} else if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootContent, { once: true });
} else {
  bootContent();
}
