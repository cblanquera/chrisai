(function () {
  function childList(item) {
    return Array.prototype.find.call(item.children, function (child) { return child.tagName === 'UL'; });
  }

  function treeItems(tree) {
    return Array.prototype.filter.call(tree.querySelectorAll('[role="treeitem"]'), function (item) {
      var parentTree = item.closest('[data-wf-tree]');
      if (parentTree !== tree) return false;
      var parentList = item.parentElement;
      while (parentList && parentList !== tree) {
        if (parentList.hidden) return false;
        parentList = parentList.parentElement;
      }
      return true;
    });
  }

  function itemControl(item) {
    return item.querySelector(':scope > .wf-tree__node > [data-wf-tree-select-node], :scope > [data-wf-tree-select-node], :scope > .wf-tree__toggle, :scope > .wf-tree__link');
  }

  function setFocus(tree, item, focus) {
    treeItems(tree).forEach(function (candidate) {
      var control = itemControl(candidate);
      if (control) control.tabIndex = candidate === item ? 0 : -1;
    });
    if (focus) {
      var control = itemControl(item);
      if (control) control.focus();
    }
  }

  function setExpanded(item, expanded) {
    var toggle = item.querySelector(':scope > .wf-tree__node > [data-wf-tree-toggle], :scope > .wf-tree__toggle');
    var group = childList(item);
    if (!toggle || !group) return;
    toggle.setAttribute('aria-expanded', String(expanded));
    item.setAttribute('aria-expanded', String(expanded));
    group.hidden = !expanded;
  }

  function select(tree, item) {
    if (!tree.hasAttribute('data-wf-tree-select')) return;
    if (tree.getAttribute('data-wf-tree-select') !== 'multiple') {
      Array.prototype.forEach.call(tree.querySelectorAll('[role="treeitem"][aria-selected="true"]'), function (candidate) {
        candidate.setAttribute('aria-selected', 'false');
      });
    }
    item.setAttribute('aria-selected', 'true');
    setFocus(tree, item, false);
    tree.dispatchEvent(new CustomEvent('wf:tree-select', { bubbles: true, detail: { id: item.dataset.wfTreeId || '', item: item } }));
  }

  function decorate(tree) {
    tree.setAttribute('role', 'tree');
    var items = Array.prototype.filter.call(tree.querySelectorAll('li'), function (item) { return item.closest('[data-wf-tree]') === tree; });
    items.forEach(function (item) {
      item.setAttribute('role', 'treeitem');
      if (tree.hasAttribute('data-wf-tree-select') && !item.hasAttribute('aria-selected')) item.setAttribute('aria-selected', 'false');
      var group = childList(item);
      if (group) {
        group.setAttribute('role', 'group');
        var toggle = item.querySelector(':scope > .wf-tree__node > [data-wf-tree-toggle], :scope > .wf-tree__toggle');
        if (toggle) setExpanded(item, toggle.getAttribute('aria-expanded') !== 'false');
      }
    });
    var selected = tree.querySelector('[role="treeitem"][aria-selected="true"]') || items[0];
    if (selected) setFocus(tree, selected, false);
  }

  function onKeydown(tree, event) {
    var item = event.target.closest('[role="treeitem"]');
    if (!item || item.closest('[data-wf-tree]') !== tree) return;
    var visible = treeItems(tree);
    var index = visible.indexOf(item);
    var next;
    if (event.key === 'ArrowDown') next = visible[Math.min(index + 1, visible.length - 1)];
    if (event.key === 'ArrowUp') next = visible[Math.max(index - 1, 0)];
    if (event.key === 'Home') next = visible[0];
    if (event.key === 'End') next = visible[visible.length - 1];
    if (event.key === 'ArrowRight') {
      var group = childList(item);
      if (group && group.hidden) setExpanded(item, true);
      else if (group) next = treeItems(tree)[index + 1];
    }
    if (event.key === 'ArrowLeft') {
      var child = childList(item);
      if (child && !child.hidden) setExpanded(item, false);
      else {
        var parent = item.parentElement.closest('[role="treeitem"]');
        if (parent) next = parent;
      }
    }
    if (event.key === 'Enter' || event.key === ' ') select(tree, item);
    if (next) setFocus(tree, next, true);
    if (next || ['ArrowRight', 'ArrowLeft', 'Enter', ' '].indexOf(event.key) !== -1) event.preventDefault();
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-tree]'), function (tree) {
      if (tree.dataset.wfTreeReady) return;
      tree.dataset.wfTreeReady = 'true';
      decorate(tree);
      tree.addEventListener('click', function (event) {
        var toggle = event.target.closest('[data-wf-tree-toggle], .wf-tree__toggle');
        if (toggle) {
          var item = toggle.closest('[role="treeitem"]');
          setExpanded(item, toggle.getAttribute('aria-expanded') === 'false');
          if (toggle.matches('.wf-tree__toggle') && tree.hasAttribute('data-wf-tree-select')) select(tree, item);
        }
        var control = event.target.closest('[data-wf-tree-select-node]');
        if (control) select(tree, control.closest('[role="treeitem"]'));
      });
      tree.addEventListener('keydown', function (event) { onKeydown(tree, event); });
    });
  }

  function refresh(tree) { decorate(tree); }

  window.WireframeTree = { init: init, refresh: refresh, select: select };
})();
