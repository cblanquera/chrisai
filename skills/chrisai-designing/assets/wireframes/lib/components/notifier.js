(function () {
  function getStack() {
    var stack = document.querySelector('[data-wf-notifier]');
    if (!stack) {
      stack = document.createElement('div');
      stack.className = 'wf-notifier';
      stack.setAttribute('data-wf-notifier', '');
      document.body.appendChild(stack);
    }
    return stack;
  }

  function show(options) {
    options = options || {};
    var toast = document.createElement('section');
    var closeIcon = window.WireframeIcons ? window.WireframeIcons.svg('close') : '';
    toast.className = 'wf-toast';
    toast.innerHTML = '<div><p class="wf-toast__title">' + (options.title || 'Update') + '</p><p class="wf-toast__body">' + (options.body || 'The wireframe state changed.') + '</p></div><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-toast-close aria-label="Dismiss">' + closeIcon + '</button>';
    getStack().appendChild(toast);
    return toast;
  }

  function init(root) {
    (root || document).addEventListener('click', function (event) {
      var close = event.target.closest('[data-wf-toast-close]');
      if (close) close.closest('.wf-toast').remove();
      var trigger = event.target.closest('[data-wf-toast-trigger]');
      if (trigger) show({ title: trigger.dataset.wfToastTitle, body: trigger.dataset.wfToastBody });
    });
  }

  window.WireframeNotifier = { init: init, show: show };
})();
