(function () {
  function activate(tab) {
    var list = tab.closest('.wf-tabs__list');
    var root = tab.closest('[data-wf-tabs]');
    if (!list || !root) return;
    var tabs = list.querySelectorAll('[role="tab"]');
    Array.prototype.forEach.call(tabs, function (node) {
      var selected = node === tab;
      node.setAttribute('aria-selected', String(selected));
      node.tabIndex = selected ? 0 : -1;
      var panel = document.getElementById(node.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-tabs]'), function (tabs) {
      if (tabs.dataset.wfTabsReady) return;
      tabs.dataset.wfTabsReady = 'true';
      tabs.addEventListener('click', function (event) {
        var tab = event.target.closest('[role="tab"]');
        if (tab) activate(tab);
      });
      tabs.addEventListener('keydown', function (event) {
        var current = event.target.closest('[role="tab"]');
        if (!current || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
        var all = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));
        var next = all[(all.indexOf(current) + (event.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length];
        next.focus();
        activate(next);
      });
    });
  }

  window.WireframeTabs = { init: init, activate: activate };
})();
