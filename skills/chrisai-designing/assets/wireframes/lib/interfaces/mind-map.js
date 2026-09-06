(function () {
  'use strict';

  var NODE_WIDTH = 184;
  var NODE_HEIGHT = 68;
  var DEPTH_GAP = 112;
  var BRANCH_GAP = 34;
  var SCENE_PADDING = 72;
  var MIN_ZOOM = .6;
  var MAX_ZOOM = 1.4;
  var ZOOM_STEP = .1;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function parseData(root) {
    var source = root.querySelector('[data-wf-mind-map-data]');
    try {
      return JSON.parse(source.textContent);
    } catch (error) {
      return {
        rootId: 'topic-1',
        selectedId: 'topic-1',
        nodes: [{ id: 'topic-1', parentId: null, title: 'Central topic' }]
      };
    }
  }

  function controller(root) {
    var state = parseData(root);
    var selectedId = state.selectedId || state.rootId;
    var view = root.dataset.wfMindMapView || 'horizontal';
    var zoom = 1;
    var positions = {};
    var dimensions = { width: NODE_WIDTH, height: NODE_HEIGHT };
    var undoStack = [];
    var redoStack = [];
    var titleSnapshot = null;
    var nextId = state.nodes.length + 1;
    var viewport = root.querySelector('[data-wf-mind-map-viewport]');
    var canvas = root.querySelector('[data-wf-mind-map-canvas]');
    var scene = root.querySelector('[data-wf-mind-map-scene]');
    var nodeLayer = root.querySelector('[data-wf-mind-map-nodes]');
    var connectors = root.querySelector('[data-wf-mind-map-connectors]');
    var list = root.querySelector('[data-wf-mind-map-list]');
    var listBody = root.querySelector('[data-wf-mind-map-list-body]');
    var titleInput = root.querySelector('[data-wf-mind-map-title]');
    var titleField = root.querySelector('[data-wf-mind-map-title-field]');
    var titleError = root.querySelector('[data-wf-mind-map-title-error]');
    var deleteDialog = root.querySelector('[data-wf-mind-map-delete-dialog]');
    var status = root.querySelector('[data-wf-mind-map-status]');

    function nodeById(id) {
      return state.nodes.find(function (node) { return node.id === id; });
    }

    function childrenOf(id) {
      return state.nodes.filter(function (node) { return node.parentId === id; });
    }

    function descendantsOf(id) {
      var result = [];
      childrenOf(id).forEach(function (node) {
        result.push(node.id);
        result = result.concat(descendantsOf(node.id));
      });
      return result;
    }

    function depthOf(id) {
      var depth = 0;
      var node = nodeById(id);
      while (node && node.parentId) {
        depth += 1;
        node = nodeById(node.parentId);
      }
      return depth;
    }

    function announce(message) {
      status.textContent = message;
    }

    function saveBeforeMutation() {
      undoStack.push({ state: clone(state), selectedId: selectedId, view: view });
      if (undoStack.length > 40) undoStack.shift();
      redoStack = [];
    }

    function restore(snapshot) {
      state = clone(snapshot.state);
      selectedId = snapshot.selectedId;
      view = snapshot.view;
      renderAll();
    }

    function undo() {
      if (!undoStack.length) return;
      redoStack.push({ state: clone(state), selectedId: selectedId, view: view });
      restore(undoStack.pop());
      announce('Change undone.');
    }

    function redo() {
      if (!redoStack.length) return;
      undoStack.push({ state: clone(state), selectedId: selectedId, view: view });
      restore(redoStack.pop());
      announce('Change restored.');
    }

    function select(id, focusTitle) {
      if (!nodeById(id)) return;
      selectedId = id;
      renderAll();
      if (focusTitle) {
        titleInput.focus();
        titleInput.select();
      }
    }

    function renderInspector() {
      var selected = nodeById(selectedId) || nodeById(state.rootId);
      var parent = selected.parentId ? nodeById(selected.parentId) : null;
      root.querySelector('[data-wf-mind-map-selected-heading]').textContent = selected.title;
      if (document.activeElement !== titleInput) titleInput.value = selected.title;
      root.querySelector('[data-wf-mind-map-parent]').textContent = parent ? parent.title : 'Central topic';
      root.querySelector('[data-wf-mind-map-child-count]').textContent = String(childrenOf(selected.id).length);
      root.querySelector('[data-wf-mind-map-delete]').disabled = !selected.parentId;
    }

    function renderNodes() {
      nodeLayer.innerHTML = '';
      state.nodes.forEach(function (node) {
        var wrap = document.createElement('div');
        wrap.className = 'wf-mind-map__node-wrap';
        wrap.dataset.wfMindMapNode = node.id;
        wrap.dataset.selected = String(node.id === selectedId);
        wrap.setAttribute('role', 'treeitem');
        wrap.setAttribute('aria-level', String(depthOf(node.id) + 1));
        wrap.setAttribute('aria-expanded', String(childrenOf(node.id).length > 0));
        var button = document.createElement('button');
        button.className = 'wf-mind-map__node' + (node.parentId ? '' : ' wf-mind-map__node--root');
        button.type = 'button';
        button.setAttribute('aria-pressed', String(node.id === selectedId));
        button.innerHTML = '<span>' + escapeHtml(node.title) + '</span><small>' + childrenOf(node.id).length + ' child topics</small>';
        button.addEventListener('click', function () { select(node.id, false); });
        button.addEventListener('dblclick', function () { select(node.id, true); });
        button.addEventListener('keydown', function (event) {
          if (event.key === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            select(node.id, false);
            addChild(node.id);
          }
          if (event.key === 'Enter') {
            event.preventDefault();
            select(node.id, true);
          }
        });
        var add = document.createElement('button');
        add.className = 'wf-mind-map__quick-add';
        add.type = 'button';
        add.setAttribute('aria-label', 'Add a child topic to ' + node.title);
        add.innerHTML = window.WireframeIcons ? window.WireframeIcons.svg('add') : '+';
        add.addEventListener('click', function (event) {
          event.stopPropagation();
          addChild(node.id);
        });
        wrap.appendChild(button);
        wrap.appendChild(add);
        nodeLayer.appendChild(wrap);
      });
    }

    function renderList() {
      listBody.innerHTML = state.nodes.map(function (node) {
        var parent = node.parentId ? nodeById(node.parentId) : null;
        return '<tr aria-selected="' + String(node.id === selectedId) + '"><th scope="row"><button type="button" data-wf-mind-map-list-node="' + escapeHtml(node.id) + '">' + escapeHtml(node.title) + '</button></th><td>' + escapeHtml(parent ? parent.title : 'Central topic') + '</td><td class="wf-table__number">' + childrenOf(node.id).length + '</td></tr>';
      }).join('');
    }

    function subtreeSize(id) {
      var children = childrenOf(id);
      var base = view === 'horizontal' ? NODE_HEIGHT : NODE_WIDTH;
      if (!children.length) return base;
      var sizes = children.map(function (node) { return subtreeSize(node.id); });
      return Math.max(base, sizes.reduce(function (total, size) { return total + size; }, 0) + BRANCH_GAP * Math.max(0, sizes.length - 1));
    }

    function placeSubtree(id, depth, crossStart) {
      var children = childrenOf(id);
      var size = subtreeSize(id);
      var position;
      if (!children.length) {
        position = view === 'horizontal'
          ? { x: SCENE_PADDING + depth * (NODE_WIDTH + DEPTH_GAP), y: crossStart + (size - NODE_HEIGHT) / 2 }
          : { x: crossStart + (size - NODE_WIDTH) / 2, y: SCENE_PADDING + depth * (NODE_HEIGHT + DEPTH_GAP) };
      } else {
        var cursor = crossStart;
        children.forEach(function (child) {
          var childSize = subtreeSize(child.id);
          placeSubtree(child.id, depth + 1, cursor);
          cursor += childSize + BRANCH_GAP;
        });
        var first = positions[children[0].id];
        var last = positions[children[children.length - 1].id];
        position = view === 'horizontal'
          ? { x: SCENE_PADDING + depth * (NODE_WIDTH + DEPTH_GAP), y: (first.y + last.y + NODE_HEIGHT) / 2 - NODE_HEIGHT / 2 }
          : { x: (first.x + last.x + NODE_WIDTH) / 2 - NODE_WIDTH / 2, y: SCENE_PADDING + depth * (NODE_HEIGHT + DEPTH_GAP) };
      }
      positions[id] = position;
    }

    function centerPositions() {
      var values = Object.keys(positions).map(function (id) { return positions[id]; });
      var minX = Math.min.apply(null, values.map(function (position) { return position.x; }));
      var minY = Math.min.apply(null, values.map(function (position) { return position.y; }));
      var maxX = Math.max.apply(null, values.map(function (position) { return position.x + NODE_WIDTH; }));
      var maxY = Math.max.apply(null, values.map(function (position) { return position.y + NODE_HEIGHT; }));
      dimensions = { width: maxX - minX, height: maxY - minY };
      var sceneWidth = Math.max(dimensions.width + SCENE_PADDING * 2, viewport.clientWidth / zoom);
      var sceneHeight = Math.max(dimensions.height + SCENE_PADDING * 2, viewport.clientHeight / zoom);
      var offsetX = (sceneWidth - dimensions.width) / 2 - minX;
      var offsetY = (sceneHeight - dimensions.height) / 2 - minY;
      values.forEach(function (position) {
        position.x += offsetX;
        position.y += offsetY;
      });
      return { width: sceneWidth, height: sceneHeight };
    }

    function renderConnectors(size) {
      connectors.innerHTML = '';
      connectors.setAttribute('viewBox', '0 0 ' + size.width + ' ' + size.height);
      connectors.setAttribute('width', String(size.width));
      connectors.setAttribute('height', String(size.height));
      state.nodes.forEach(function (node) {
        if (!node.parentId) return;
        var parent = positions[node.parentId];
        var child = positions[node.id];
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'wf-mind-map__connector');
        if (view === 'horizontal') {
          var startX = parent.x + NODE_WIDTH;
          var startY = parent.y + NODE_HEIGHT / 2;
          var endX = child.x;
          var endY = child.y + NODE_HEIGHT / 2;
          var midX = (startX + endX) / 2;
          path.setAttribute('d', 'M ' + startX + ' ' + startY + ' C ' + midX + ' ' + startY + ', ' + midX + ' ' + endY + ', ' + endX + ' ' + endY);
        } else {
          var topX = parent.x + NODE_WIDTH / 2;
          var topY = parent.y + NODE_HEIGHT;
          var bottomX = child.x + NODE_WIDTH / 2;
          var bottomY = child.y;
          var midY = (topY + bottomY) / 2;
          path.setAttribute('d', 'M ' + topX + ' ' + topY + ' C ' + topX + ' ' + midY + ', ' + bottomX + ' ' + midY + ', ' + bottomX + ' ' + bottomY);
        }
        connectors.appendChild(path);
      });
    }

    function layout() {
      positions = {};
      placeSubtree(state.rootId, 0, SCENE_PADDING);
      var size = centerPositions();
      scene.style.width = size.width + 'px';
      scene.style.height = size.height + 'px';
      scene.style.transform = 'scale(' + zoom + ')';
      canvas.style.width = Math.max(viewport.clientWidth, size.width * zoom) + 'px';
      canvas.style.height = Math.max(viewport.clientHeight, size.height * zoom) + 'px';
      Object.keys(positions).forEach(function (id) {
        var element = nodeLayer.querySelector('[data-wf-mind-map-node="' + id + '"]');
        element.style.left = positions[id].x + 'px';
        element.style.top = positions[id].y + 'px';
      });
      renderConnectors(size);
    }

    function renderAll() {
      if (!nodeById(selectedId)) selectedId = state.rootId;
      root.dataset.wfMindMapView = view;
      root.querySelectorAll('[data-wf-mind-map-view-button]').forEach(function (button) {
        var active = button.dataset.wfMindMapViewButton === view;
        button.setAttribute('aria-pressed', String(active));
      });
      viewport.hidden = view === 'list';
      list.hidden = view !== 'list';
      root.querySelector('[data-wf-mind-map-undo]').disabled = !undoStack.length;
      root.querySelector('[data-wf-mind-map-redo]').disabled = !redoStack.length;
      renderNodes();
      renderList();
      renderInspector();
      if (view !== 'list') layout();
    }

    function addChild(parentId) {
      var parent = nodeById(parentId || selectedId);
      if (!parent) return;
      saveBeforeMutation();
      var id = 'topic-' + nextId;
      while (nodeById(id)) {
        nextId += 1;
        id = 'topic-' + nextId;
      }
      nextId += 1;
      state.nodes.push({ id: id, parentId: parent.id, title: 'New topic' });
      selectedId = id;
      renderAll();
      announce('Child topic added to ' + parent.title + '.');
      titleInput.focus();
      titleInput.select();
    }

    function deleteSelected() {
      var selected = nodeById(selectedId);
      if (!selected || !selected.parentId) return;
      saveBeforeMutation();
      var ids = [selected.id].concat(descendantsOf(selected.id));
      state.nodes = state.nodes.filter(function (node) { return ids.indexOf(node.id) === -1; });
      selectedId = selected.parentId;
      deleteDialog.close('confirm');
      renderAll();
      announce(selected.title + ' branch deleted.');
    }

    function changeView(next) {
      if (next === view) return;
      saveBeforeMutation();
      view = next;
      renderAll();
      if (view !== 'list') fit();
      announce((view === 'list' ? 'List' : view + ' map') + ' view applied.');
    }

    function setZoom(next, quiet) {
      zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(next * 10) / 10));
      root.querySelector('[data-wf-mind-map-zoom-value]').textContent = Math.round(zoom * 100) + '%';
      if (view !== 'list') layout();
      if (!quiet) announce('Zoom ' + Math.round(zoom * 100) + ' percent.');
    }

    function fit() {
      if (view === 'list') return;
      var availableWidth = Math.max(100, viewport.clientWidth - SCENE_PADDING);
      var availableHeight = Math.max(100, viewport.clientHeight - SCENE_PADDING);
      setZoom(Math.min(1, availableWidth / (dimensions.width + SCENE_PADDING * 2), availableHeight / (dimensions.height + SCENE_PADDING * 2)), true);
      viewport.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      announce('Map fitted to view.');
    }

    root.querySelectorAll('[data-wf-mind-map-view-button]').forEach(function (button) {
      button.addEventListener('click', function () { changeView(button.dataset.wfMindMapViewButton); });
    });
    root.querySelector('[data-wf-mind-map-add]').addEventListener('click', function () { addChild(selectedId); });
    root.querySelector('[data-wf-mind-map-delete]').addEventListener('click', function () {
      var selected = nodeById(selectedId);
      var count = descendantsOf(selectedId).length;
      root.querySelector('[data-wf-mind-map-delete-copy]').textContent = selected.title + (count ? ' and ' + count + ' child topic' + (count === 1 ? '' : 's') : '') + ' will be removed.';
      deleteDialog.showModal();
    });
    root.querySelector('[data-wf-mind-map-delete-cancel]').addEventListener('click', function () { deleteDialog.close('cancel'); });
    root.querySelector('[data-wf-mind-map-delete-confirm]').addEventListener('click', deleteSelected);
    root.querySelector('[data-wf-mind-map-undo]').addEventListener('click', undo);
    root.querySelector('[data-wf-mind-map-redo]').addEventListener('click', redo);
    root.querySelector('[data-wf-mind-map-zoom-out]').addEventListener('click', function () { setZoom(zoom - ZOOM_STEP); });
    root.querySelector('[data-wf-mind-map-zoom-in]').addEventListener('click', function () { setZoom(zoom + ZOOM_STEP); });
    root.querySelector('[data-wf-mind-map-fit]').addEventListener('click', fit);
    listBody.addEventListener('click', function (event) {
      var button = event.target.closest('[data-wf-mind-map-list-node]');
      if (button) select(button.dataset.wfMindMapListNode, false);
    });
    titleInput.addEventListener('focus', function () { titleSnapshot = { state: clone(state), selectedId: selectedId, view: view }; });
    titleInput.addEventListener('input', function () {
      var value = titleInput.value.trim();
      titleField.setAttribute('aria-invalid', String(!value));
      titleError.hidden = Boolean(value);
      if (!value) return;
      nodeById(selectedId).title = value;
      root.querySelector('[data-wf-mind-map-selected-heading]').textContent = value;
      renderNodes();
      renderList();
      if (view !== 'list') layout();
    });
    titleInput.addEventListener('blur', function () {
      if (titleSnapshot && JSON.stringify(titleSnapshot.state) !== JSON.stringify(state)) {
        undoStack.push(titleSnapshot);
        redoStack = [];
      }
      titleSnapshot = null;
      renderAll();
    });
    viewport.addEventListener('keydown', function (event) {
      if (event.target === viewport && event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault();
        addChild(selectedId);
      }
    });
    root.addEventListener('keydown', function (event) {
      var modifier = event.metaKey || event.ctrlKey;
      if (!modifier || event.key.toLowerCase() !== 'z') return;
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
    });
    window.addEventListener('resize', function () { if (view !== 'list') layout(); });
    renderAll();
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-mind-map]'), function (map) {
      if (map.dataset.wfMindMapReady) return;
      map.dataset.wfMindMapReady = 'true';
      controller(map);
    });
  }

  window.WireframeMindMap = { init: init };
})();
