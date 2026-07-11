(function () {
  function init(root) {
    root = root || document;
    root.addEventListener('click', function (event) {
      var toggle = event.target.closest('[data-wf-password-toggle]');
      if (!toggle) return;
      var field = toggle.closest('[data-wf-password-field]');
      var input = field && field.querySelector('input');
      if (!input) return;
      var isVisible = input.type === 'text';
      input.type = isVisible ? 'password' : 'text';
      toggle.setAttribute('aria-pressed', String(!isVisible));
      toggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
      var icon = toggle.querySelector('[data-wf-icon]');
      if (icon) {
        icon.setAttribute('data-wf-icon', isVisible ? 'eye' : 'eye-off');
        if (window.WireframeIcons) window.WireframeIcons.render(toggle);
      }
    });
  }

  window.WireframePasswordField = { init: init };
})();
