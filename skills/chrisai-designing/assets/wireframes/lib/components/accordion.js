(function () {
  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-accordion]'), function (accordion) {
      accordion.addEventListener('click', function (event) {
        var trigger = event.target.closest('.wf-accordion__trigger');
        if (!trigger || !accordion.contains(trigger)) return;
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        if (accordion.hasAttribute('data-wf-accordion-single') && !expanded) {
          Array.prototype.forEach.call(accordion.querySelectorAll('.wf-accordion__trigger[aria-expanded="true"]'), function (openTrigger) {
            if (openTrigger !== trigger && window.WireframeState) window.WireframeState.setExpanded(openTrigger, false);
          });
        }
        if (window.WireframeState) window.WireframeState.setExpanded(trigger, !expanded);
      });
    });
  }

  window.WireframeAccordion = { init: init };
})();
