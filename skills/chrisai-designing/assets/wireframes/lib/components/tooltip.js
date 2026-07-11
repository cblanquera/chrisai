(function () {
  function set(trigger, visible) {
    var tooltip = document.getElementById(trigger.getAttribute('aria-describedby'));
    if (tooltip) tooltip.hidden = !visible;
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-tooltip]'), function (trigger) {
      if (trigger.dataset.wfTooltipReady) return;
      trigger.dataset.wfTooltipReady = 'true';
      trigger.addEventListener('mouseenter', function () { set(trigger, true); });
      trigger.addEventListener('mouseleave', function () { set(trigger, false); });
      trigger.addEventListener('focus', function () { set(trigger, true); });
      trigger.addEventListener('blur', function () { set(trigger, false); });
    });
  }

  window.WireframeTooltip = { init: init };
})();
