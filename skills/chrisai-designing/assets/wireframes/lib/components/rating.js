(function () {
  function setValue(group, value) {
    var input = group.querySelector('input[type="hidden"]');
    var output = group.querySelector('[data-wf-rating-output]');
    Array.prototype.forEach.call(group.querySelectorAll('[data-wf-rating-value]'), function (button) {
      var buttonValue = Number(button.dataset.wfRatingValue);
      button.setAttribute('aria-checked', String(buttonValue === value));
      button.toggleAttribute('data-wf-rating-filled', buttonValue <= value);
    });
    if (input) input.value = value;
    if (output) output.textContent = value + ' of 5';
  }

  function init(root) {
    root = root || document;
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-wf-rating-value]');
      if (button) setValue(button.closest('[data-wf-rating]'), Number(button.dataset.wfRatingValue));
    });
    root.addEventListener('keydown', function (event) {
      var button = event.target.closest('[data-wf-rating-value]');
      if (!button || ['ArrowLeft', 'ArrowRight'].indexOf(event.key) === -1) return;
      event.preventDefault();
      var next = Number(button.dataset.wfRatingValue) + (event.key === 'ArrowRight' ? 1 : -1);
      next = Math.max(1, Math.min(5, next));
      var group = button.closest('[data-wf-rating]');
      setValue(group, next);
      var target = group.querySelector('[data-wf-rating-value="' + next + '"]');
      if (target) target.focus();
    });
  }

  window.WireframeRating = { init: init, setValue: setValue };
})();
