/* Generated English UI: edit the shared source/catalog, then run scripts/build_en_tijuana.py. */
/* Reveal the other-city links before normal fragment navigation. */
(() => {
  function openOtherLocations() {
    const locations = document.getElementById('otras-ubicaciones');
    if (locations) locations.open = true;
  }
  function revealFromHash() {
    if (location.hash === '#otras-ubicaciones') openOtherLocations();
  }
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href="#otras-ubicaciones"]');
    if (link) openOtherLocations();
  });
  document.addEventListener('partials-ready', revealFromHash);
  document.addEventListener('DOMContentLoaded', revealFromHash);
  window.addEventListener('hashchange', revealFromHash);
  revealFromHash();
})();
