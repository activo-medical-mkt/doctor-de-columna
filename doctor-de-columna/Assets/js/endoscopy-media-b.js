/* Muted surgical footage: lazy loading, offscreen pause and explicit playback control. */
(() => {
  const init = () => {
    const video = document.querySelector('[data-endo-video]');
    const button = document.querySelector('.endo-video-toggle');
    if (!video || !button || video.dataset.ready) return;
    video.dataset.ready = 'true';
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let manuallyPlayed = false;
    let userPaused = false;
    const play = () => {
      if (!video.getAttribute('src')) { video.muted = true; video.src = video.dataset.src; video.load(); }
      video.play().catch(() => {});
    };
    const update = () => {
      button.classList.toggle('is-playing', !video.paused);
      button.setAttribute('aria-label', video.paused ? 'Reproducir video' : 'Pausar video');
    };
    button.addEventListener('click', () => {
      if (video.paused) { manuallyPlayed = true; userPaused = false; play(); }
      else { userPaused = true; video.pause(); }
    });
    video.addEventListener('play', update);
    video.addEventListener('pause', update);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) video.pause();
          else if (!userPaused && (!reduced.matches || manuallyPlayed)) play();
        });
      }, { rootMargin: '100px 0px' }).observe(video);
    }
    update();
  };
  document.addEventListener('DOMContentLoaded', init);
  init();
})();
