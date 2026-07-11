(function () {
  function init(root) {
    root = root || document;
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-wf-picker-open]');
      if (!button) return;
      var input = button.parentElement.querySelector('[data-wf-picker-input]');
      if (!input) return;
      if (typeof input.showPicker === 'function') input.showPicker();
      else input.focus();
    });
  }

  window.WireframeDateTimeField = { init: init };
})();
