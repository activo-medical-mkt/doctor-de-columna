/* Version B testimonials: source filters and click-to-load video embeds. */
(() => {
  function initPatientStories() {
    const section = document.querySelector('.patient-stories');
    if (!section || section.dataset.ready) return;
    section.dataset.ready = 'true';

    const cards = [...section.querySelectorAll('.patient-review-card')];
    const filters = [...section.querySelectorAll('[data-review-filter]')];
    const moreReviews = section.querySelector('#patient-reviews-more');
    const status = section.querySelector('#patient-reviews-status');
    let source = 'all';
    let limit = 3;

    function updateExpansion() {
      cards.filter(card => !card.hidden).forEach(card => {
        const quote = card.querySelector('blockquote');
        const button = card.querySelector('.patient-review-expand');
        button.hidden = !card.classList.contains('is-expanded') && quote.scrollHeight <= quote.clientHeight + 1;
      });
    }

    function renderReviews() {
      const matching = cards.filter(card => source === 'all' || card.dataset.reviewSource === source);
      cards.forEach(card => { card.hidden = true; });
      matching.slice(0, limit).forEach(card => { card.hidden = false; });
      status.textContent = `Mostrando ${Math.min(limit, matching.length)} de ${matching.length} reseñas`;
      moreReviews.hidden = limit >= matching.length;
      requestAnimationFrame(updateExpansion);
    }

    filters.forEach(button => button.addEventListener('click', () => {
      source = button.dataset.reviewFilter;
      limit = 3;
      filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
      renderReviews();
    }));
    moreReviews.addEventListener('click', () => {
      limit += 3;
      renderReviews();
    });
    cards.forEach(card => card.querySelector('.patient-review-expand').addEventListener('click', event => {
      const expanded = card.classList.toggle('is-expanded');
      event.currentTarget.setAttribute('aria-expanded', String(expanded));
      event.currentTarget.textContent = expanded ? 'Ver menos' : 'Leer completa';
    }));
    window.addEventListener('resize', updateExpansion, { passive: true });
    document.fonts.ready.then(updateExpansion);
    renderReviews();

    const videoCards = [...section.querySelectorAll('.patient-video')];
    const moreVideos = section.querySelector('#patient-videos-more');
    moreVideos.addEventListener('click', () => {
      const expanded = moreVideos.getAttribute('aria-expanded') !== 'true';
      videoCards.slice(3).forEach(card => { card.hidden = !expanded; });
      moreVideos.setAttribute('aria-expanded', String(expanded));
      moreVideos.innerHTML = expanded ? 'Ver menos videos <span aria-hidden="true">−</span>' : 'Ver los 6 videos <span aria-hidden="true">+</span>';
    });

    const dialog = section.querySelector('#patient-video-dialog');
    const player = dialog.querySelector('.patient-video-player');
    let opener;
    let previousOverflow;
    section.querySelectorAll('[data-video-id]').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.videoId;
      if (!/^[\w-]{11}$/.test(id)) return;
      opener = button;
      const title = button.dataset.videoTitle;
      const iframe = document.createElement('iframe');
      const url = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
      url.search = new URLSearchParams({ autoplay: '1', playsinline: '1', rel: '0', origin: location.origin });
      iframe.src = url.href;
      iframe.title = title;
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      dialog.querySelector('h3').textContent = title;
      dialog.querySelector('.patient-video-external').href = `https://www.youtube.com/shorts/${id}`;
      player.replaceChildren(iframe);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    }));
    dialog.querySelector('.patient-video-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      player.replaceChildren();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    });
  }

  document.addEventListener('partials-ready', initPatientStories);
  document.addEventListener('DOMContentLoaded', initPatientStories);
  initPatientStories();
})();
