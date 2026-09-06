(function () {
  var ready = new WeakSet();
  function esc(value) { var node = document.createElement('span'); node.textContent = value == null ? '' : String(value); return node.innerHTML; }
  function notify(title, body) { if (window.WireframeNotifier) window.WireframeNotifier.show({ title: title, body: body }); }
  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-file-explorer]'), function (view) {
      if (ready.has(view)) return; ready.add(view);
      var payload; try { payload = JSON.parse(view.querySelector('[data-wf-file-data]').textContent); } catch (error) { payload = { nodes: [], expanded: [] }; }
      var state = { nodes: payload.nodes || [], expanded: new Set(payload.expanded || []), selected: '', menuTarget: '', dialogMode: '', dialogParent: 'root' };
      var tree = view.querySelector('[data-wf-file-tree]');
      var menu = view.querySelector('[data-wf-file-menu]');
      var dialog = view.querySelector('[data-wf-file-dialog]');
      var form = view.querySelector('[data-wf-file-form]');
      function item(id) { return state.nodes.find(function (node) { return node.id === id; }); }
      function children(parentId) { return state.nodes.filter(function (node) { return node.parentId === parentId; }); }
      function branch(parentId, depth) {
        var rows = children(parentId); if (!rows.length) return '';
        return '<ul style="--depth:' + depth + '">' + rows.map(function (node) {
          var hasChildren = node.type === 'folder' && children(node.id).length; var expanded = state.expanded.has(node.id);
          var row = '<div class="wf-file-explorer__row" tabindex="0" role="treeitem" data-file-id="' + esc(node.id) + '" data-type="' + node.type + '" aria-selected="' + (node.id === state.selected) + '"' + (node.type === 'folder' ? ' aria-expanded="' + expanded + '"' : '') + ' style="--depth:' + depth + '">';
          row += node.type === 'folder' ? '<button class="wf-file-explorer__toggle" type="button" data-file-toggle aria-label="Toggle ' + esc(node.name) + '" aria-expanded="' + expanded + '"><span data-wf-icon="chevron-right"></span></button>' : '<span class="wf-file-explorer__kind" data-wf-icon="file"></span>';
          row += '<span class="wf-file-explorer__name">' + esc(node.name) + '</span>';
          return '<li>' + row + '</div>' + (expanded && hasChildren ? branch(node.id, depth + 1) : '') + '</li>';
        }).join('') + '</ul>';
      }
      function render() { tree.innerHTML = branch('root', 0); if (window.WireframeIcons) window.WireframeIcons.render(tree); }
      function select(id) { state.selected = id; render(); }
      function closeMenu() { menu.hidden = true; }
      function openMenu(id, x, y) { state.menuTarget = id; select(id); menu.hidden = false; menu.style.left = Math.min(x, window.innerWidth - 205) + 'px'; menu.style.top = Math.min(y, window.innerHeight - 205) + 'px'; menu.querySelector('button').focus(); }
      function openDialog(mode, target) { var current = item(target); state.menuTarget = target || ''; state.dialogMode = mode; state.dialogParent = mode === 'rename' ? (current && current.parentId) : (current && current.type === 'folder' ? current.id : (current && current.parentId) || 'root'); view.querySelector('[data-wf-file-dialog-title]').textContent = mode === 'rename' ? 'Rename item' : mode === 'new-folder' ? 'New folder' : 'New file'; form.elements.name.value = mode === 'rename' && current ? current.name : ''; if (!dialog.open) dialog.showModal(); form.elements.name.focus(); }
      function pathFor(id) { var parts = [], current = item(id); while (current) { parts.unshift(current.name); current = item(current.parentId); } return '/northwind/' + parts.join('/'); }
      view.addEventListener('click', function (event) {
        var toggle = event.target.closest('[data-file-toggle]'); if (toggle) { var id = toggle.closest('[data-file-id]').dataset.fileId; if (state.expanded.has(id)) state.expanded.delete(id); else state.expanded.add(id); render(); return; }
        var row = event.target.closest('[data-file-id]'); if (row) select(row.dataset.fileId);
        var toolbar = event.target.closest('[data-wf-file-toolbar]'); if (toolbar) openDialog(toolbar.dataset.wfFileToolbar, state.selected);
        if (event.target.closest('[data-wf-file-collapse]')) { state.expanded.clear(); render(); }
        var action = event.target.closest('[data-file-action]'); if (!action) return;
        var target = state.menuTarget; var current = item(target); var kind = action.dataset.fileAction; closeMenu();
        if (kind === 'new-file' || kind === 'new-folder' || kind === 'rename') openDialog(kind, target);
        if (kind === 'delete' && current) { var doomed = new Set([current.id]); var changed = true; while (changed) { changed = false; state.nodes.forEach(function (node) { if (doomed.has(node.parentId) && !doomed.has(node.id)) { doomed.add(node.id); changed = true; } }); } state.nodes = state.nodes.filter(function (node) { return !doomed.has(node.id); }); state.selected = ''; render(); notify('Item deleted', current.name + ' was removed.'); }
        if (kind === 'copy-path' && current) { var path = pathFor(current.id); if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(path).catch(function () {}); notify('Path copied', path); }
      });
      view.addEventListener('dblclick', function (event) { var row = event.target.closest('[data-file-id][data-type="folder"]'); if (!row) return; var id = row.dataset.fileId; if (state.expanded.has(id)) state.expanded.delete(id); else state.expanded.add(id); render(); });
      view.addEventListener('contextmenu', function (event) { var row = event.target.closest('[data-file-id]'); if (!row) return; event.preventDefault(); openMenu(row.dataset.fileId, event.clientX, event.clientY); });
      view.addEventListener('keydown', function (event) { var row = event.target.closest('[data-file-id]'); if (row && (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10'))) { event.preventDefault(); var box = row.getBoundingClientRect(); openMenu(row.dataset.fileId, box.left + 36, box.bottom); } });
      document.addEventListener('pointerdown', function (event) { if (!menu.hidden && !menu.contains(event.target)) closeMenu(); });
      document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });
      form.addEventListener('submit', function (event) { event.preventDefault(); var name = form.elements.name.value.trim(); if (!name) return; var current = item(state.menuTarget || state.selected); if (state.dialogMode === 'rename' && current) { current.name = name; notify('Item renamed', name + ' is ready.'); } else { var type = state.dialogMode === 'new-folder' ? 'folder' : 'file'; var id = type + '-' + Date.now(); state.nodes.push({ id: id, parentId: state.dialogParent, type: type, name: name }); state.expanded.add(state.dialogParent); state.selected = id; notify(type === 'folder' ? 'Folder created' : 'File created', name + ' was added.'); } dialog.close(); render(); });
      render();
    });
  }
  window.WireframeFileExplorer = { init: init };
})();
