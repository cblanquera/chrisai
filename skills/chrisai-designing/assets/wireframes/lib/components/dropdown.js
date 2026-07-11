(function () {
  function closeAll(root, except) {
    Array.prototype.forEach.call((root || document).querySelectorAll('.wf-dropdown__trigger[aria-expanded="true"]'), function (trigger) {
      if (trigger !== except && window.WireframeState) window.WireframeState.setExpanded(trigger, false);
    });
  }

  function init(root) {
    root = root || document;
    root.addEventListener('click', function (event) {
      var trigger = event.target.closest('.wf-dropdown__trigger');
      if (trigger) {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        closeAll(document, trigger);
        if (window.WireframeState) window.WireframeState.setExpanded(trigger, !expanded);
        return;
      }
      if (!event.target.closest('.wf-dropdown')) closeAll(document);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeAll(document);
    });
  }

  window.WireframeDropdown = { init: init, closeAll: closeAll };
})();
