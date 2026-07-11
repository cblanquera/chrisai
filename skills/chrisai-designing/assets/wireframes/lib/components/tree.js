(function () {
  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-tree]'), function (tree) {
      if (tree.dataset.wfTreeReady) return;
      tree.dataset.wfTreeReady = 'true';
      tree.addEventListener('click', function (event) {
        var toggle = event.target.closest('.wf-tree__toggle');
        if (toggle && window.WireframeState) window.WireframeState.toggleExpanded(toggle);
      });
    });
  }

  window.WireframeTree = { init: init };
})();
