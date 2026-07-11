(function () {
  function update(input) {
    var field = input.closest('.wf-field');
    var output = field && field.querySelector('[data-wf-range-output]');
    if (output) output.value = input.value;
  }

  function init(root) {
    root = root || document;
    Array.prototype.forEach.call(root.querySelectorAll('[data-wf-range]'), update);
    root.addEventListener('input', function (event) {
      if (event.target.matches('[data-wf-range]')) update(event.target);
    });
  }

  window.WireframeRange = { init: init, update: update };
})();
