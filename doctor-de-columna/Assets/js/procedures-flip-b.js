/* Treatment cards: hover, keyboard and explicit touch controls share one state. */
(() => {
  function initProcedureFlips() {
    const section = document.querySelector('.procedure-hub');
    if (!section || section.dataset.flipsReady) return;
    section.dataset.flipsReady = 'true';
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

    section.querySelectorAll('.procedure-flip-card').forEach(card => {
      const front = card.querySelector('.procedure-flip-front');
      const back = card.querySelector('.procedure-flip-back');
      function showBack(show) {
        const previous = show ? front : back;
        const active = document.activeElement;
        const transferFocus = previous.contains(active);
        card.classList.toggle('is-flipped', show);
        front.inert = show;
        back.inert = !show;
        front.setAttribute('aria-hidden', String(show));
        back.setAttribute('aria-hidden', String(!show));
        if (transferFocus) {
          const target = show
            ? back.querySelector(active.tagName === 'A' ? 'a' : 'button')
            : front.querySelector('button');
          target.focus({ preventScroll: true });
        }
      }

      card.addEventListener('pointerenter', event => {
        if (canHover.matches && event.pointerType !== 'touch') showBack(true);
      });
      card.addEventListener('pointerleave', () => {
        if (canHover.matches && !card.contains(document.activeElement)) showBack(false);
      });
      const frontTitle = front.querySelector('a');
      frontTitle.addEventListener('focus', () => {
        if (frontTitle.matches(':focus-visible')) showBack(true);
      });
      card.addEventListener('focusout', () => {
        queueMicrotask(() => {
          if (!card.contains(document.activeElement) && (!canHover.matches || !card.matches(':hover'))) showBack(false);
        });
      });
      card.querySelectorAll('[data-flip-to]').forEach(button => {
        button.addEventListener('click', () => showBack(button.dataset.flipTo === 'back'));
      });
      card.addEventListener('keydown', event => {
        if (event.key === 'Escape' && card.classList.contains('is-flipped')) {
          event.preventDefault();
          showBack(false);
        }
      });
    });
  }
  document.addEventListener('partials-ready', initProcedureFlips);
  document.addEventListener('DOMContentLoaded', initProcedureFlips);
  initProcedureFlips();
})();
