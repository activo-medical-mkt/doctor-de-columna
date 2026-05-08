// main.js — Page interaction logic for traumatologoengdl.com
// Boots after partial injection when [data-include] slots are present.

// ── Navbar scroll + progress bar ────────────────────────────────────
let darkSections = [];

function refreshDarkSections() {
  darkSections = Array.from(document.querySelectorAll('[data-nav-dark]'));
}

function applyNavbarThemeBySection(navbar) {
  if (!navbar) return;
  if (!darkSections.length) {
    navbar.classList.remove('navbar--on-dark');
    return;
  }

  const navBandTop = 0;
  const navBandBottom = navbar.offsetHeight || 68;
  const onDark = darkSections.some(section => {
    const rect = section.getBoundingClientRect();
    return rect.top < navBandBottom && rect.bottom > navBandTop;
  });

  navbar.classList.toggle('navbar--on-dark', onDark);
}

function initCore() {
  const navbar   = document.getElementById('navbar');
  const progress = document.getElementById('scrollProgress');
  if (!navbar && !progress) return false;

  // Safety reset in case browser restores a previous menu-open state.
  document.body.style.overflow = '';

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        // Look up navbar fresh each tick — it may not have been in the DOM
        // when initCore() first ran (partial not yet injected).
        const nav = document.getElementById('navbar');
        if (nav)   nav.classList.toggle('scrolled', scrollY > 60);
        if (nav)   applyNavbarThemeBySection(nav);
        if (progress) progress.style.width = (maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0) + '%';
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  refreshDarkSections();
  // Apply correct scroll-dependent navbar state immediately on first paint.
  onScroll();

  // ── Mobile hamburger menu ──────────────────────────────────────────
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.classList.remove('open');

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

  // ── Desktop dropdown (click + keyboard, CSS handles hover) ────────
  document.querySelectorAll('.nav-item-drop').forEach(item => {
    const trigger = item.querySelector('.nav-drop-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  function closeAllDropdowns() {
    document.querySelectorAll('.nav-item-drop.open').forEach(item => {
      item.classList.remove('open');
      const t = item.querySelector('.nav-drop-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', closeAllDropdowns);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const openItem = document.querySelector('.nav-item-drop.open');
      if (openItem) {
        closeAllDropdowns();
        const t = openItem.querySelector('.nav-drop-trigger');
        if (t) t.focus();
      }
    }
  });

  // ── Mobile accordion ──────────────────────────────────────────────
  document.querySelectorAll('.mobile-nav-group-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const target = document.getElementById(targetId);
      if (!target) return;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      target.classList.toggle('open', !isOpen);
    });
  });

  // ── City sub-accordion (inside Ubicaciones) ───────────────────────
  document.querySelectorAll('.mobile-nav-city-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const target = document.getElementById(targetId);
      if (!target) return;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      target.classList.toggle('open', !isOpen);
    });
  });

  return true;

  window.addEventListener('resize', () => {
    refreshDarkSections();
    onScroll();
  }, { passive: true });
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
      // Scroll to the toggle's new position at the very bottom when expanding
      if (isExpanded === false) {
        setTimeout(() => {
          moreBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 80);
      }
    });
  }
}

// ── Services city switcher ───────────────────────────────────────────────
function initServiceCitySwitcher() {
  const switcher = document.getElementById('serv-city-switch');
  if (!switcher) return;

  const chips = Array.from(switcher.querySelectorAll('[data-serv-city]'));
  const note = document.getElementById('serv-city-note');
  const links = Array.from(document.querySelectorAll('.serv-card-h3 a[data-serv-slug]'));
  if (!chips.length || !links.length) return;

  const cityLabels = {
    guadalajara: 'Guadalajara',
    tijuana: 'Tijuana',
    rosarito: 'Rosarito'
  };

  const gdlPaths = {
    'endoscopia-de-columna': '/servicios/endoscopia-de-columna-guadalajara/',
    'microdiscectomia': '/servicios/microdiscectomia-guadalajara/',
    'cirugia-descompresion-lumbar': '/servicios/cirugia-descompresion-lumbar-guadalajara/',
    'fusion-vertebral': '/servicios/fusion-vertebral-guadalajara/',
    'bloqueos-epidurales-columna': '/servicios/bloqueos-epidurales-columna-guadalajara/',
    'rehabilitacion-columna': '/servicios/rehabilitacion-columna-guadalajara/'
  };

  const whatsappBase = 'https://wa.me/526641596633';

  links.forEach(link => {
    link.dataset.gdlHref = link.getAttribute('href') || '';
  });

  function buildWhatsAppUrl(serviceName, city) {
    const msg = `Hola, quiero información sobre ${serviceName} en ${city}.`;
    return `${whatsappBase}?text=${encodeURIComponent(msg)}`;
  }

  function applyCity(city) {
    chips.forEach(chip => {
      const isActive = chip.dataset.servCity === city;
      chip.classList.toggle('is-active', isActive);
      chip.setAttribute('aria-pressed', String(isActive));
    });

    links.forEach(link => {
      const slug = link.dataset.servSlug || '';
      const serviceName = link.dataset.servName || link.textContent.trim();

      if (city === 'guadalajara') {
        link.setAttribute('href', gdlPaths[slug] || link.dataset.gdlHref || '/servicios/');
        link.removeAttribute('target');
        link.removeAttribute('rel');
      } else if (city === 'tijuana') {
        link.setAttribute('href', '/tijuana/servicios/');
        link.removeAttribute('target');
        link.removeAttribute('rel');
      } else {
        const cityLabel = cityLabels[city] || 'tu ciudad';
        link.setAttribute('href', buildWhatsAppUrl(serviceName, cityLabel));
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
      }
    });

    if (!note) return;
    if (city === 'guadalajara') {
      note.textContent = 'Mostrando páginas de servicio para Guadalajara.';
    } else if (city === 'tijuana') {
      note.textContent = 'Mostrando páginas de servicio para Tijuana.';
    } else {
      note.textContent = `Para ${cityLabels[city]}, agenda tu cita por WhatsApp.`;
    }
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const city = chip.dataset.servCity;
      if (!city) return;
      applyCity(city);
    });
  });

  applyCity('guadalajara');
}

// ── Conditions city switcher ───────────────────────────────────────────────
function initConditionCitySwitcher() {
  const switcher = document.getElementById('cond-city-switch');
  if (!switcher) return;

  const chips = Array.from(switcher.querySelectorAll('[data-cond-city]'));
  const note  = document.getElementById('cond-city-note');
  const links = Array.from(document.querySelectorAll('.cond-panel-title-link[data-cond-slug]'));
  if (!chips.length || !links.length) return;

  const cityLabels = {
    guadalajara: 'Guadalajara',
    tijuana:     'Tijuana',
    rosarito:    'Rosarito'
  };

  const gdlPaths = {
    'dolor-ciatica':              '/condiciones/dolor-ciatica-guadalajara/',
    'hernia-de-disco-lumbar':     '/condiciones/hernia-de-disco-lumbar-guadalajara/',
    'estenosis-espinal':          '/condiciones/estenosis-espinal-guadalajara/',
    'espondilolistesis':          '/condiciones/espondilolistesis-guadalajara/',
    'hernia-discal-cervical':     '/condiciones/hernia-discal-cervical-guadalajara/',
    'dolor-cervical-radiculopatia': '/condiciones/dolor-cervical-radiculopatia-guadalajara/',
    'dolor-lumbar':               '/condiciones/dolor-lumbar-guadalajara/',
    'escoliosis-adulto':          '/condiciones/escoliosis-adulto-guadalajara/'
  };

  const tijuanaPaths = {
    'dolor-ciatica':          '/tijuana/condiciones/dolor-ciatica/',
    'hernia-de-disco-lumbar': '/tijuana/condiciones/hernia-de-disco-lumbar/',
    'hernia-discal-cervical': '/tijuana/condiciones/hernia-de-disco-cervical/'
  };

  const whatsappBase = 'https://wa.me/526641596633';

  links.forEach(link => {
    link.dataset.gdlHref = link.getAttribute('href') || '';
  });

  function applyCity(city) {
    chips.forEach(chip => {
      const isActive = chip.dataset.condCity === city;
      chip.classList.toggle('is-active', isActive);
      chip.setAttribute('aria-pressed', String(isActive));
    });

    links.forEach(link => {
      const slug        = link.dataset.condSlug || '';
      const condName    = link.dataset.condName || link.textContent.trim();
      const cityLabel   = cityLabels[city] || 'tu ciudad';

      if (city === 'guadalajara') {
        link.setAttribute('href', gdlPaths[slug] || link.dataset.gdlHref || '/condiciones/');
        link.removeAttribute('target');
        link.removeAttribute('rel');
      } else if (city === 'tijuana') {
        link.setAttribute('href', tijuanaPaths[slug] || '/tijuana/condiciones/');
        link.removeAttribute('target');
        link.removeAttribute('rel');
      } else {
        const msg = `Hola, quiero información sobre ${condName} en ${cityLabel}.`;
        link.setAttribute('href', `${whatsappBase}?text=${encodeURIComponent(msg)}`);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
      }
    });

    if (!note) return;
    if (city === 'guadalajara') {
      note.textContent = 'Mostrando páginas de condición para Guadalajara.';
    } else if (city === 'tijuana') {
      note.textContent = 'Mostrando páginas de condición para Tijuana.';
    } else {
      note.textContent = `Para ${cityLabels[city]}, agenda tu cita por WhatsApp.`;
    }
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const city = chip.dataset.condCity;
      if (!city) return;
      applyCity(city);
    });
  });

  applyCity('guadalajara');
}

// ── Locations switcher (cards -> single dynamic map) ─────────────────────
function initLocationsSwitcher() {
  const grid = document.getElementById('loc-city-grid');
  const mapFrame = document.getElementById('loc-map-iframe');
  const mapLabel = document.getElementById('loc-map-label');
  const directions = document.getElementById('loc-map-directions');
  if (!grid || !mapFrame || !mapLabel || !directions) return;

  const cards = Array.from(grid.querySelectorAll('[data-loc-card]'));
  if (!cards.length) return;

  function applyCard(card) {
    cards.forEach(c => {
      const active = c === card;
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-pressed', String(active));
      c.setAttribute('tabindex', active ? '0' : '-1');
    });

    const nextSrc = card.dataset.mapSrc;
    const nextLabel = card.dataset.mapLabel;
    const nextDirections = card.dataset.directions;
    const city = card.dataset.locCard || 'la ciudad seleccionada';

    if (nextSrc) mapFrame.src = nextSrc;
    if (nextLabel) mapLabel.textContent = nextLabel;
    if (nextDirections) directions.href = nextDirections;
    directions.setAttribute('aria-label', 'Cómo llegar al consultorio en ' + city);
  }

  cards.forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '-1');

    card.addEventListener('click', e => {
      if (e.target.closest('a, button')) return;
      applyCard(card);
    });

    card.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      applyCard(card);
    });
  });

  applyCard(cards.find(c => c.classList.contains('is-active')) || cards[0]);
}

// ── Reviews carousel ────────────────────────────────────────────────────
function initReviews() {
  const track = document.getElementById('rev-track');
  if (!track) return;
  const realCards = Array.from(track.querySelectorAll('.rev-card'));
  const dotsEl = document.getElementById('rev-dots');
  const prevBtn = document.getElementById('rev-prev');
  const nextBtn = document.getElementById('rev-next');
  const viewport = track.parentElement;
  if (!dotsEl || !viewport || !realCards.length) return;

  const TRANSITION_MS = 550;

  // Clone every card to both sides so transforms can wrap without visible jumps.
  realCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.dataset.clone = '1';
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  const prepend = realCards.map(card => {
    const clone = card.cloneNode(true);
    clone.dataset.clone = '1';
    clone.setAttribute('aria-hidden', 'true');
    return clone;
  });
  prepend.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));

  function visibleCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1023) return 2;
    return 3;
  }

  const realCount = realCards.length;
  let perPage = visibleCount();
  let totalPages = Math.ceil(realCount / perPage);
  let currentIndex = 0;
  let extIndex = 0;
  let timer;
  let jumping = false;

  function prependCount() {
    return realCount;
  }

  function getShift(index) {
    const allCards = track.querySelectorAll('.rev-card');
    if (!allCards[0]) return 0;
    const cardW = allCards[0].offsetWidth;
    const gap = window.innerWidth <= 600 ? 16 : 24;
    return index * (cardW + gap);
  }

  function setTransform(index, animated) {
    const shift = getShift(index);
    if (!animated) {
      track.style.transition = 'none';
      track.style.transform = 'translateX(-' + shift + 'px)';
      track.getBoundingClientRect();
      track.style.transition = '';
      return;
    }

    track.style.transform = 'translateX(-' + shift + 'px)';
  }

  function updateDots() {
    const currentPage = Math.floor(currentIndex / perPage) % totalPages;
    dotsEl.querySelectorAll('.rev-dot').forEach((dot, i) => {
      dot.classList.toggle('rev-dot--active', i === currentPage);
    });
  }

  function toCurrentFromExt(index) {
    return ((index - prependCount()) % realCount + realCount) % realCount;
  }

  function silentTeleport(targetExtIndex) {
    extIndex = targetExtIndex;
    currentIndex = toCurrentFromExt(extIndex);
    setTransform(extIndex, false);
    updateDots();
    jumping = false;
  }

  function goNext() {
    if (jumping) return;
    extIndex += 1;
    currentIndex = toCurrentFromExt(extIndex);
    setTransform(extIndex, true);
    updateDots();

    if (extIndex >= prependCount() + realCount) {
      jumping = true;
      setTimeout(() => silentTeleport(extIndex - realCount), TRANSITION_MS + 20);
    }
  }

  function goPrev() {
    if (jumping) return;
    extIndex -= 1;
    currentIndex = toCurrentFromExt(extIndex);
    setTransform(extIndex, true);
    updateDots();

    if (extIndex < prependCount()) {
      jumping = true;
      setTimeout(() => silentTeleport(extIndex + realCount), TRANSITION_MS + 20);
    }
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    totalPages = Math.ceil(realCount / perPage);
    for (let i = 0; i < totalPages; i++) {
      const d = document.createElement('button');
      d.className = 'rev-dot' + (i === 0 ? ' rev-dot--active' : '');
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', 'Página ' + (i + 1));
      d.addEventListener('click', () => {
        goTo(i);
        restartTimer();
      });
      dotsEl.appendChild(d);
    }
  }

  function goTo(page) {
    const safePage = ((page % totalPages) + totalPages) % totalPages;
    currentIndex = safePage * perPage;
    if (currentIndex > realCount - 1) currentIndex = realCount - 1;
    extIndex = prependCount() + currentIndex;
    setTransform(extIndex, true);
    updateDots();
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(goNext, 4800);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goPrev(); restartTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goNext(); restartTimer(); });

  viewport.addEventListener('mouseenter', () => clearInterval(timer));
  viewport.addEventListener('mouseleave', restartTimer);

  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext(); else goPrev();
      restartTimer();
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    const newPer = visibleCount();
    if (newPer !== perPage) {
      perPage = newPer;
      currentIndex = 0;
      buildDots();
    }
    extIndex = prependCount() + currentIndex;
    setTransform(extIndex, false);
  });

  buildDots();
  extIndex = prependCount();
  setTransform(extIndex, false);
  restartTimer();
}

// ── Third-party Doctoralia widget + fallback sync ───────────────────
function initDoctoralia() {
  const hasAnchor = document.getElementById('zl-url-book');
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

  const bindFallbackSync = ({ container, anchor, fallback, maxTries = 30, tickMs = 250, readyClass = '' }) => {
    if (!container || !anchor || !fallback) return;

    const hasLiveWidget = () => {
      if (anchor.children.length > 0) return true;
      if (container.querySelector('iframe')) return true;
      if (container.querySelector('[class*="docplanner"], [class*="zlw"], [id*="zlw"], [id*="doctoralia"]')) return true;

      return Array.from(container.children).some(node => {
        const el = node;
        return el !== anchor && el !== fallback && !el.classList.contains('zl-url');
      });
    };

    const revealLiveWidget = () => {
      if (fallback.style.display !== 'none') {
        fallback.style.display = 'none';
      }
      if (readyClass) container.classList.add(readyClass);
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

    observer.observe(container, { childList: true, subtree: true });

    let tries = 0;
    const timer = setInterval(() => {
      if (hasLiveWidget()) {
        clearInterval(timer);
        observer.disconnect();
        revealLiveWidget();
        return;
      }
      if (tries > maxTries) {
        clearInterval(timer);
        observer.disconnect();
      }
      tries += 1;
    }, tickMs);
  };

  const anchor = document.getElementById('zl-url-book');
  const fallback = document.getElementById('book-widget-static');
  const wrapper = document.querySelector('.book-widget-wrap');
  bindFallbackSync({
    container: wrapper,
    anchor,
    fallback,
    readyClass: 'has-live-widget'
  });
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
  coreBooted = initCore();
}

function initCondTabs() {
  const widget = document.getElementById('condTabsWidget');
  if (!widget) return;
  const tabs = Array.from(widget.querySelectorAll('[data-cond-tab]'));
  const panels = Array.from(widget.querySelectorAll('.cond-panel'));
  const DURATION = 6000;
  let current = 0;
  let rafId = null;
  let startTime = null;
  let suspended = false;

  function activate(idx) {
    tabs.forEach((t, i) => {
      const on = i === idx;
      t.classList.toggle('cond-tab--active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      const bar = t.querySelector('.cond-tab-bar');
      if (bar) bar.style.width = '0%';
    });
    panels.forEach((p, i) => {
      p.classList.toggle('cond-panel--active', i === idx);
      if (i === idx) p.removeAttribute('hidden');
      else p.setAttribute('hidden', '');
    });
    current = idx;
    if (!suspended) startProgress();
  }

  function startProgress() {
    if (rafId) cancelAnimationFrame(rafId);
    startTime = performance.now();
    const bar = tabs[current].querySelector('.cond-tab-bar');
    function tick(now) {
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / DURATION * 100, 100);
      if (bar) bar.style.width = pct + '%';
      if (elapsed < DURATION) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
        activate((current + 1) % tabs.length);
      }
    }
    rafId = requestAnimationFrame(tick);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      suspended = false;
      activate(parseInt(tab.dataset.condTab, 10));
    });
  });

  widget.addEventListener('mouseenter', () => {
    suspended = true;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  });

  widget.addEventListener('mouseleave', () => {
    suspended = false;
    startProgress();
  });

  activate(0);
}

// ── WhatsApp floating widget ─────────────────────────────────────────────
function initWaWidget() {
  const fab   = document.getElementById('wa-fab');
  const panel = document.getElementById('wa-panel');
  const close = document.getElementById('wa-close');
  if (!fab || !panel || !close) return;

  function openPanel() {
    panel.removeAttribute('hidden');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        panel.classList.add('wa-panel--open');
      });
    });
    fab.setAttribute('aria-expanded', 'true');
    close.focus();
  }

  function closePanel() {
    panel.classList.remove('wa-panel--open');
    fab.setAttribute('aria-expanded', 'false');
    fab.focus();
    setTimeout(function () { panel.setAttribute('hidden', ''); }, 240);
  }

  fab.addEventListener('click', function () {
    panel.classList.contains('wa-panel--open') ? closePanel() : openPanel();
  });

  close.addEventListener('click', closePanel);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('wa-panel--open')) closePanel();
  });

  document.addEventListener('click', function (e) {
    const widget = document.getElementById('wa-widget');
    if (widget && panel.classList.contains('wa-panel--open') && !widget.contains(e.target)) closePanel();
  });
}

function bootContent() {
  if (contentBooted) return;
  contentBooted = true;
  initReveal();
  initFaq();
  initServiceCitySwitcher();
  initConditionCitySwitcher();
  initLocationsSwitcher();
  initCondTabs();
  initWaWidget();
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
    refreshDarkSections();
    // Apply correct scroll-dependent navbar state now that the partial is in the DOM.
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.requestAnimationFrame(() => {
      applyNavbarThemeBySection(document.getElementById('navbar'));
    });
    bootContent();
  }, { once: true });
} else if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootContent, { once: true });
} else {
  bootContent();
}
