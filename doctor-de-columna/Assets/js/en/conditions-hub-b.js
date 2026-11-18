/* Generated English UI: edit the shared source/catalog, then run scripts/build_en_tijuana.py. */
/* Version B: title links and an accordion with at most one open condition. */
(() => {
  function initConditionHub() {
    const hub = document.querySelector('.condition-hub');
    if (!hub || hub.dataset.disclosuresReady) return;
    hub.dataset.disclosuresReady = 'true';
    const disclosures = [...hub.querySelectorAll('.condition-hub-toggle')]
      .map(button => ({ button, panel: document.getElementById(button.getAttribute('aria-controls')) }))
      .filter(({ panel }) => panel);
    function setExpanded({ button, panel }, expanded) {
      button.setAttribute('aria-expanded', String(expanded));
      button.setAttribute('aria-label', `${expanded ? 'Hide details about' : 'Show more about'} ${button.dataset.conditionName}`);
      panel.hidden = !expanded;
    }
    disclosures.forEach(disclosure => {
      const { button } = disclosure;
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') !== 'true';
        if (expanded) disclosures.forEach(other => {
          if (other !== disclosure) setExpanded(other, false);
        });
        setExpanded(disclosure, expanded);
      });
    });
  }
  document.addEventListener('partials-ready', initConditionHub);
  document.addEventListener('DOMContentLoaded', initConditionHub);
  initConditionHub();
})();
