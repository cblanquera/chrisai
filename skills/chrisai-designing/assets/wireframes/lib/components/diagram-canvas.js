(function () {
  var ready = new WeakSet();
  var instanceCount = 0;

  function esc(value) {
    var node = document.createElement('span');
    node.textContent = value == null ? '' : String(value);
    return node.innerHTML;
  }

  function attr(value) {
    return esc(value).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function buildScaffold(view) {
    if (view.querySelector('[data-wf-diagram-viewport]')) return;
    instanceCount += 1;
    var markerId = 'wf-diagram-arrow-' + instanceCount;
    var palette = (view.dataset.wfDiagramPalette || '').split(',').map(function (item) { return item.trim(); }).filter(Boolean);
    var labels = {
      terminal: 'Start / end',
      process: 'Process',
      decision: 'Decision',
      boundary: 'Boundary',
      entity: 'Entity',
      participant: 'Participant',
      message: 'Message',
      frame: 'Frame',
      task: 'Task',
      milestone: 'Milestone'
    };
    var icons = {
      entity: 'list',
      participant: 'user',
      message: 'link',
      task: 'add',
      milestone: 'check'
    };
    var data = view.querySelector('[data-wf-diagram-data]');
    var graph = (view.dataset.wfDiagramKind || 'graph') === 'graph';
    var markup = '<header class="wf-diagram__header"><div><p class="wf-kicker">' + esc(view.dataset.wfDiagramKicker || 'Diagram') + '</p><h1 class="wf-heading" id="' + attr(view.dataset.wfDiagramLabelledby || 'diagram-title') + '">' + esc(view.dataset.wfDiagramTitle || 'Diagram editor') + '</h1>' + (view.dataset.wfDiagramDescription ? '<p class="wf-copy">' + esc(view.dataset.wfDiagramDescription) + '</p>' : '') + '</div><div class="wf-diagram__toolbar">';
    if (graph) markup += '<button class="wf-button wf-button--secondary wf-diagram__connect" type="button" data-wf-diagram-connect disabled aria-pressed="false"><span data-wf-icon="link"></span><span data-wf-diagram-connect-label>Connect</span></button><span class="wf-diagram__toolbar-divider"></span>';
    markup += '<button class="wf-icon-button" type="button" data-wf-diagram-zoom="out" aria-label="Zoom out"><span data-wf-icon="minus"></span></button><span data-wf-diagram-zoom-label>100%</span><button class="wf-icon-button" type="button" data-wf-diagram-zoom="in" aria-label="Zoom in"><span data-wf-icon="add"></span></button><button class="wf-button wf-button--secondary" type="button" data-wf-diagram-zoom="fit">Fit</button><button class="wf-button wf-button--secondary" type="button" data-wf-diagram-delete disabled><span data-wf-icon="trash"></span>Delete</button></div></header>';
    markup += '<div class="wf-diagram__body' + (palette.length ? '' : ' wf-diagram__body--no-palette') + '">';
    if (palette.length) {
      markup += '<aside class="wf-diagram__palette"><h2 class="wf-subheading">Elements</h2><p class="wf-diagram__mode-status" data-wf-diagram-status hidden></p>' + palette.map(function (type) {
        return '<button class="wf-diagram__palette-item" type="button" draggable="' + graph + '" data-wf-diagram-add="' + attr(type) + '">' + (icons[type] ? '<span data-wf-icon="' + icons[type] + '"></span>' : '') + esc(labels[type] || type) + '</button>';
      }).join('') + '</aside>';
    }
    markup += '<main class="wf-diagram__viewport" data-wf-diagram-viewport tabindex="0"><div class="wf-diagram__world" data-wf-diagram-world><svg class="wf-diagram__edges" viewBox="0 0 1200 620" aria-label="Diagram connectors" data-wf-diagram-svg data-marker-id="' + markerId + '"><defs><marker id="' + markerId + '" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8Z"></path></marker></defs><g data-wf-diagram-edges></g></svg><div class="wf-diagram__surface" data-wf-diagram-surface></div></div></main>';
    markup += '<aside class="wf-diagram__inspector" hidden><h2 class="wf-subheading">Selection</h2><form class="wf-form" data-wf-diagram-inspector><label class="wf-field" data-wf-inspector-field="label"><span class="wf-label">Label</span><input class="wf-input" name="label"></label><label class="wf-field" data-wf-inspector-field="edgeLabel" hidden><span class="wf-label">Connector label</span><input class="wf-input" name="edgeLabel"></label><label class="wf-field" data-wf-inspector-field="details" hidden><span class="wf-label">Fields</span><textarea class="wf-input" name="details"></textarea></label><label class="wf-field" data-wf-inspector-field="owner" hidden><span class="wf-label">Owner</span><input class="wf-input" name="owner"></label><div class="wf-diagram__inspector-row"><label class="wf-field" data-wf-inspector-field="start" hidden><span class="wf-label">Start week</span><input class="wf-input" type="number" min="1" name="start"></label><label class="wf-field" data-wf-inspector-field="duration" hidden><span class="wf-label">Duration</span><input class="wf-input" type="number" min="1" name="duration"></label></div><div class="wf-diagram__inspector-row"><label class="wf-field" data-wf-inspector-field="width" hidden><span class="wf-label">Width</span><input class="wf-input" type="number" min="240" max="1200" name="width"></label><label class="wf-field" data-wf-inspector-field="height" hidden><span class="wf-label">Height</span><input class="wf-input" type="number" min="140" max="620" name="height"></label></div><label class="wf-field" data-wf-inspector-field="type"><span class="wf-label">Type</span><input class="wf-input" name="type" readonly></label></form></aside></div>';
    view.insertAdjacentHTML('afterbegin', markup);
    if (data) view.appendChild(data);
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-diagram]'), function (view) {
      if (ready.has(view)) return;
      ready.add(view);
      buildScaffold(view);

      var data;
      try {
        data = JSON.parse(view.querySelector('[data-wf-diagram-data]').textContent);
      } catch (error) {
        data = { nodes: [], edges: [] };
      }

      data.nodes = Array.isArray(data.nodes) ? data.nodes : [];
      data.edges = Array.isArray(data.edges) ? data.edges : [];
      data.frames = Array.isArray(data.frames) ? data.frames : [];
      data.edges.forEach(function (edge, index) { if (!edge.id) edge.id = 'edge-' + (index + 1); });
      data.frames.forEach(function (frame, index) { if (!frame.id) frame.id = 'frame-' + (index + 1); });

      var state = {
        data: data,
        selection: { kind: '', id: '' },
        zoom: 1,
        dragging: null,
        paletteType: '',
        connectSource: '',
        messageStep: '',
        messageSource: ''
      };
      var kind = view.dataset.wfDiagramKind || 'graph';
      var body = view.querySelector('.wf-diagram__body');
      var viewport = view.querySelector('[data-wf-diagram-viewport]');
      var world = view.querySelector('[data-wf-diagram-world]');
      var surface = view.querySelector('[data-wf-diagram-surface]');
      var svg = view.querySelector('[data-wf-diagram-svg]');
      var markerId = svg ? svg.dataset.markerId : '';
      var edgeGroup = view.querySelector('[data-wf-diagram-edges]');
      var inspectorPanel = view.querySelector('.wf-diagram__inspector');
      var inspector = view.querySelector('[data-wf-diagram-inspector]');
      var deleteButton = view.querySelector('[data-wf-diagram-delete]');
      var connectButton = view.querySelector('[data-wf-diagram-connect]');
      var status = view.querySelector('[data-wf-diagram-status]');

      function node(id) {
        return state.data.nodes.find(function (item) { return item.id === id; });
      }

      function edge(id) {
        return state.data.edges.find(function (item) { return item.id === id; });
      }

      function frame(id) {
        return state.data.frames.find(function (item) { return item.id === id; });
      }

      function isSelected(itemKind, id) {
        return state.selection.kind === itemKind && state.selection.id === id;
      }

      function selectionData() {
        if (state.selection.kind === 'node') return node(state.selection.id);
        if (state.selection.kind === 'edge') return edge(state.selection.id);
        if (state.selection.kind === 'frame') return frame(state.selection.id);
        return null;
      }

      function isConnectable(item) {
        return item && item.type !== 'boundary';
      }

      function details(item) {
        return (item.details || []).map(function (detail) {
          return '<span class="wf-diagram__node-detail">' + esc(detail) + '</span>';
        }).join('');
      }

      function connectorRoute(item) {
        var source = node(item.source);
        var target = node(item.target);
        if (!source || !target) return [];
        var sw = source.w || 150;
        var sh = source.h || 70;
        var tw = target.w || 150;
        var th = target.h || 70;
        var sourceCenter = { x: source.x + sw / 2, y: source.y + sh / 2 };
        var targetCenter = { x: target.x + tw / 2, y: target.y + th / 2 };

        if (source.id === target.id || item.loop) {
          return [
            { x: source.x + sw, y: sourceCenter.y },
            { x: source.x + sw + 58, y: sourceCenter.y },
            { x: source.x + sw + 58, y: source.y - 46 },
            { x: sourceCenter.x, y: source.y - 46 },
            { x: sourceCenter.x, y: source.y }
          ];
        }

        var dx = targetCenter.x - sourceCenter.x;
        var dy = targetCenter.y - sourceCenter.y;
        if (Math.abs(dx) >= Math.abs(dy) * 0.65) {
          var rightward = dx >= 0;
          var start = { x: rightward ? source.x + sw : source.x, y: sourceCenter.y };
          var end = { x: rightward ? target.x : target.x + tw, y: targetCenter.y };
          var middleX = (start.x + end.x) / 2;
          return [start, { x: middleX, y: start.y }, { x: middleX, y: end.y }, end];
        }

        var downward = dy >= 0;
        var verticalStart = { x: sourceCenter.x, y: downward ? source.y + sh : source.y };
        var verticalEnd = { x: targetCenter.x, y: downward ? target.y : target.y + th };
        var middleY = (verticalStart.y + verticalEnd.y) / 2;
        return [verticalStart, { x: verticalStart.x, y: middleY }, { x: verticalEnd.x, y: middleY }, verticalEnd];
      }

      function sharesEndpoint(first, second) {
        return first.source === second.source || first.source === second.target || first.target === second.source || first.target === second.target;
      }

      function bridgePath(points, edgeIndex, routes) {
        if (!points.length) return '';
        var path = 'M' + points[0].x + ' ' + points[0].y;
        for (var index = 1; index < points.length; index += 1) {
          var start = points[index - 1];
          var end = points[index];
          if (start.y === end.y) {
            var direction = end.x >= start.x ? 1 : -1;
            var crossings = [];
            routes.forEach(function (otherPoints, otherIndex) {
              if (otherIndex === edgeIndex || sharesEndpoint(state.data.edges[edgeIndex], state.data.edges[otherIndex])) return;
              for (var segmentIndex = 1; segmentIndex < otherPoints.length; segmentIndex += 1) {
                var otherStart = otherPoints[segmentIndex - 1];
                var otherEnd = otherPoints[segmentIndex];
                if (otherStart.x !== otherEnd.x) continue;
                var crossingX = otherStart.x;
                var horizontalMin = Math.min(start.x, end.x) + 10;
                var horizontalMax = Math.max(start.x, end.x) - 10;
                var verticalMin = Math.min(otherStart.y, otherEnd.y) + 4;
                var verticalMax = Math.max(otherStart.y, otherEnd.y) - 4;
                if (crossingX > horizontalMin && crossingX < horizontalMax && start.y > verticalMin && start.y < verticalMax) crossings.push(crossingX);
              }
            });
            crossings = crossings.filter(function (value, crossingIndex, values) {
              return values.indexOf(value) === crossingIndex;
            }).sort(function (a, b) { return direction === 1 ? a - b : b - a; });
            crossings.forEach(function (crossingX) {
              path += ' L' + (crossingX - direction * 7) + ' ' + start.y;
              path += ' Q' + crossingX + ' ' + (start.y - 8) + ' ' + (crossingX + direction * 7) + ' ' + start.y;
            });
            path += ' L' + end.x + ' ' + end.y;
          } else {
            path += ' L' + end.x + ' ' + end.y;
          }
        }
        return path;
      }

      function labelPoint(points) {
        var longest = null;
        for (var index = 1; index < points.length; index += 1) {
          var start = points[index - 1];
          var end = points[index];
          var length = Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
          if (!longest || length > longest.length) longest = { start: start, end: end, length: length };
        }
        if (!longest) return { x: 0, y: 0 };
        return {
          x: (longest.start.x + longest.end.x) / 2,
          y: (longest.start.y + longest.end.y) / 2 - 7
        };
      }

      function edgeMarkup(item, path, labelPosition) {
        var selected = isSelected('edge', item.id);
        var marker = item.plain ? '' : ' marker-end="url(#' + attr(markerId) + ')"';
        return '<path class="wf-diagram__edge-hit" data-diagram-edge-id="' + attr(item.id) + '" d="' + attr(path) + '"></path><path class="wf-diagram__edge' + (selected ? ' wf-diagram__edge--selected' : '') + '" d="' + attr(path) + '"' + marker + '></path>' + (item.label ? '<text class="wf-diagram__edge-label" data-diagram-edge-id="' + attr(item.id) + '" x="' + labelPosition.x + '" y="' + labelPosition.y + '" text-anchor="middle">' + esc(item.label) + '</text>' : '');
      }

      function renderGraphEdges() {
        if (!edgeGroup) return;
        var routes = state.data.edges.map(connectorRoute);
        edgeGroup.innerHTML = state.data.edges.map(function (item, index) {
          if (!routes[index].length) return '';
          return edgeMarkup(item, bridgePath(routes[index], index, routes), labelPoint(routes[index]));
        }).join('');
      }

      function nodeMarkup(item) {
        var selected = isSelected('node', item.id);
        var target = !!state.connectSource && item.id !== state.connectSource && isConnectable(item);
        var connectControls = isConnectable(item) ? '<span class="wf-diagram__port-in" aria-hidden="true"></span><button class="wf-diagram__port wf-diagram__port--out" type="button" data-wf-diagram-connect-from="' + attr(item.id) + '" aria-label="Connect from ' + attr(item.label) + '"></button>' : '';
        var resizeControl = item.type === 'boundary' ? '<button class="wf-diagram__resize-handle" type="button" data-wf-diagram-resize aria-label="Resize ' + attr(item.label) + '"></button>' : '';
        return '<div class="wf-diagram__node wf-diagram__node--' + attr(item.type || 'process') + '" data-diagram-node-id="' + attr(item.id) + '" data-connect-target="' + target + '" style="left:' + item.x + 'px;top:' + item.y + 'px;width:' + (item.w || 150) + 'px;height:' + (item.h || 70) + 'px"><button class="wf-diagram__node-select" type="button" aria-selected="' + selected + '"><span class="wf-diagram__node-type">' + esc(item.caption || item.type || 'item') + '</span><span class="wf-diagram__node-title">' + esc(item.label) + '</span>' + details(item) + '</button>' + connectControls + resizeControl + '</div>';
      }

      function renderGraph() {
        surface.innerHTML = state.data.nodes.map(nodeMarkup).join('');
        renderGraphEdges();
      }

      function renderSequenceEdges() {
        if (!edgeGroup) return;
        edgeGroup.innerHTML = state.data.edges.map(function (item) {
          var source = node(item.source);
          var target = node(item.target);
          if (!source || !target) return '';
          var x1 = source.x + 75;
          var x2 = target.x + 75;
          var y = item.y;
          var path = 'M' + x1 + ' ' + y + ' H' + x2;
          return edgeMarkup(item, path, { x: (x1 + x2) / 2, y: y - 7 });
        }).join('');
      }

      function renderSequence() {
        var frames = state.data.frames.map(function (item) {
          return '<button class="wf-sequence__frame" type="button" data-diagram-frame-id="' + attr(item.id) + '" aria-selected="' + isSelected('frame', item.id) + '" style="left:' + item.x + 'px;top:' + item.y + 'px;width:' + item.w + 'px;height:' + item.h + 'px"><span class="wf-sequence__frame-label">' + esc(item.label) + '</span></button>';
        }).join('');
        var participants = state.data.nodes.map(function (item) {
          var target = state.messageStep === 'target' && item.id !== state.messageSource;
          return '<button class="wf-sequence__actor" type="button" data-diagram-node-id="' + attr(item.id) + '" data-connect-target="' + target + '" aria-selected="' + isSelected('node', item.id) + '" style="left:' + item.x + 'px">' + esc(item.label) + '</button><span class="wf-sequence__lifeline" style="left:' + (item.x + 75) + 'px"></span>';
        }).join('');
        surface.innerHTML = '<div class="wf-sequence">' + frames + participants + '</div>';
        renderSequenceEdges();
      }

      function renderGantt() {
        var weeks = state.data.weeks || [];
        var columns = '190px repeat(' + weeks.length + ', 70px)';
        var html = '<div class="wf-gantt"><div class="wf-gantt__grid" style="grid-template-columns:' + columns + '"><div class="wf-gantt__cell wf-gantt__head">Task</div>' + weeks.map(function (week) {
          return '<div class="wf-gantt__cell wf-gantt__head">' + esc(week) + '</div>';
        }).join('');
        state.data.nodes.forEach(function (task) {
          var milestone = task.type === 'milestone';
          var width = milestone ? 50 : task.duration * 70 - 14;
          html += '<button class="wf-gantt__cell wf-gantt__label" type="button" data-diagram-node-id="' + attr(task.id) + '" aria-selected="' + isSelected('node', task.id) + '">' + esc(task.label) + '</button><div class="wf-gantt__track" style="grid-column:2 / span ' + weeks.length + '"><button class="wf-gantt__bar' + (milestone ? ' wf-gantt__bar--milestone' : '') + '" type="button" data-wf-gantt-bar data-diagram-node-id="' + attr(task.id) + '" aria-selected="' + isSelected('node', task.id) + '" style="left:' + ((task.start - 1) * 70 + 7) + 'px;width:' + width + 'px">' + esc(task.owner || task.label) + '<span class="wf-gantt__resize" data-wf-gantt-resize aria-hidden="true"></span></button></div>';
        });
        surface.innerHTML = html + '</div></div>';
        if (edgeGroup) edgeGroup.innerHTML = '';
      }

      function showInspectorField(name, visible) {
        var field = inspector.querySelector('[data-wf-inspector-field="' + name + '"]');
        if (field) field.hidden = !visible;
      }

      function updateInspector() {
        var selected = selectionData();
        if (inspectorPanel) inspectorPanel.hidden = !selected;
        if (body) body.classList.toggle('wf-diagram__body--inspector-open', !!selected);
        if (deleteButton) deleteButton.disabled = !selected;
        if (connectButton) {
          var selectedNode = state.selection.kind === 'node' ? selected : null;
          connectButton.disabled = !state.connectSource && !isConnectable(selectedNode);
          connectButton.setAttribute('aria-pressed', String(!!state.connectSource));
          view.querySelector('[data-wf-diagram-connect-label]').textContent = state.connectSource ? 'Cancel connect' : 'Connect';
        }
        if (!inspector || !selected) return;

        var isEdge = state.selection.kind === 'edge';
        var isTask = kind === 'gantt' && state.selection.kind === 'node';
        var isEntity = kind === 'graph' && selected.type === 'entity';
        var isBoundary = kind === 'graph' && selected.type === 'boundary';
        showInspectorField('label', !isEdge);
        showInspectorField('edgeLabel', isEdge);
        showInspectorField('details', isEntity);
        showInspectorField('owner', isTask);
        showInspectorField('start', isTask);
        showInspectorField('duration', isTask && selected.type !== 'milestone');
        showInspectorField('width', isBoundary);
        showInspectorField('height', isBoundary);
        inspector.elements.label.value = selected.label || '';
        inspector.elements.edgeLabel.value = selected.label || '';
        inspector.elements.details.value = (selected.details || []).join('\n');
        inspector.elements.owner.value = selected.owner || '';
        inspector.elements.start.value = selected.start || 1;
        inspector.elements.duration.value = selected.duration || 1;
        inspector.elements.width.value = selected.w || 440;
        inspector.elements.height.value = selected.h || 245;
        inspector.elements.type.value = isEdge ? (kind === 'sequence' ? 'Message' : 'Connector') : (state.selection.kind === 'frame' ? 'Frame' : selected.type || kind);
        inspector.elements.start.max = (state.data.weeks || []).length || 12;
        inspector.elements.duration.max = (state.data.weeks || []).length || 12;
        inspector.elements.width.max = 1200 - (selected.x || 0);
        inspector.elements.height.max = 620 - (selected.y || 0);
      }

      function updateStatus() {
        if (!status) return;
        var message = '';
        if (state.connectSource) message = 'Connecting from ' + node(state.connectSource).label + '. Select a destination.';
        if (state.messageStep === 'source') message = 'Select the message sender.';
        if (state.messageStep === 'target') message = 'Select the message receiver.';
        status.hidden = !message;
        status.textContent = message;
      }

      function render() {
        if (kind === 'sequence') renderSequence();
        else if (kind === 'gantt') renderGantt();
        else renderGraph();
        updateInspector();
        updateStatus();
        if (window.WireframeIcons) window.WireframeIcons.render(view);
      }

      function select(itemKind, id) {
        state.selection = { kind: itemKind, id: id };
        render();
      }

      function setZoom(value) {
        state.zoom = clamp(value, 0.5, 1.5);
        world.style.transform = 'scale(' + state.zoom + ')';
        var label = view.querySelector('[data-wf-diagram-zoom-label]');
        if (label) label.textContent = Math.round(state.zoom * 100) + '%';
      }

      function defaultPoint(type) {
        var count = state.data.nodes.length;
        if (type === 'boundary') return { x: 220 + (count % 2) * 60, y: 70 + (count % 3) * 40 };
        return { x: 250 + (count % 4) * 185, y: 170 + (count % 3) * 125 };
      }

      function addGraphNode(type, point) {
        var labels = { terminal: 'Start / end', process: 'New process', decision: 'Decision?', boundary: 'Process boundary', entity: 'New entity' };
        var sizes = {
          terminal: { w: 120, h: 52 },
          process: { w: 160, h: 76 },
          decision: { w: 170, h: 112 },
          boundary: { w: 440, h: 245 },
          entity: { w: 190, h: 145 }
        };
        var id = type + '-' + Date.now();
        var position = point || defaultPoint(type);
        var size = sizes[type] || sizes.process;
        state.data.nodes.push({
          id: id,
          type: type,
          label: labels[type] || 'New item',
          x: clamp(position.x, 0, 1200 - size.w),
          y: clamp(position.y, 0, 620 - size.h),
          w: size.w,
          h: size.h,
          details: type === 'entity' ? ['PK id', 'created_at'] : []
        });
        state.selection = { kind: 'node', id: id };
        render();
      }

      function addSequenceItem(type) {
        if (type === 'participant') {
          var id = 'participant-' + Date.now();
          state.data.nodes.push({ id: id, type: 'participant', label: 'New participant', x: clamp(45 + state.data.nodes.length * 215, 20, 1030) });
          state.selection = { kind: 'node', id: id };
        } else if (type === 'message') {
          state.selection = { kind: '', id: '' };
          state.messageStep = 'source';
          state.messageSource = '';
        } else if (type === 'frame') {
          var frameId = 'frame-' + Date.now();
          state.data.frames.push({ id: frameId, label: 'Interaction frame', x: 240, y: 150 + state.data.frames.length * 95, w: 650, h: 125 });
          state.selection = { kind: 'frame', id: frameId };
        }
        render();
      }

      function addGanttItem(type) {
        var weeks = state.data.weeks || [];
        var id = type + '-' + Date.now();
        state.data.nodes.push({
          id: id,
          type: type,
          label: type === 'milestone' ? 'New milestone' : 'New task',
          owner: type === 'milestone' ? 'Milestone' : 'Unassigned',
          start: Math.min(weeks.length || 12, state.data.nodes.length + 1),
          duration: type === 'milestone' ? 1 : 2
        });
        state.selection = { kind: 'node', id: id };
        render();
      }

      function addEdge(sourceId, targetId, label) {
        var duplicate = state.data.edges.some(function (item) { return item.source === sourceId && item.target === targetId; });
        if (duplicate) return;
        var item = {
          id: 'edge-' + Date.now(),
          source: sourceId,
          target: targetId,
          label: label || view.dataset.wfDiagramEdgeLabel || ''
        };
        state.data.edges.push(item);
        state.connectSource = '';
        state.selection = { kind: 'edge', id: item.id };
        render();
      }

      function chooseSequenceParticipant(id) {
        if (state.messageStep === 'source') {
          state.messageSource = id;
          state.messageStep = 'target';
          state.selection = { kind: 'node', id: id };
          render();
          return true;
        }
        if (state.messageStep === 'target') {
          if (id === state.messageSource) return true;
          var item = {
            id: 'message-' + Date.now(),
            source: state.messageSource,
            target: id,
            label: 'New message',
            y: clamp(135 + state.data.edges.length * 58, 120, 570)
          };
          state.data.edges.push(item);
          state.messageStep = '';
          state.messageSource = '';
          state.selection = { kind: 'edge', id: item.id };
          render();
          return true;
        }
        return false;
      }

      function removeSelection() {
        if (!state.selection.id) return;
        if (state.selection.kind === 'edge') {
          state.data.edges = state.data.edges.filter(function (item) { return item.id !== state.selection.id; });
        } else if (state.selection.kind === 'frame') {
          state.data.frames = state.data.frames.filter(function (item) { return item.id !== state.selection.id; });
        } else {
          state.data.nodes = state.data.nodes.filter(function (item) { return item.id !== state.selection.id; });
          state.data.edges = state.data.edges.filter(function (item) { return item.source !== state.selection.id && item.target !== state.selection.id; });
        }
        state.selection = { kind: '', id: '' };
        state.connectSource = '';
        state.messageStep = '';
        state.messageSource = '';
        render();
      }

      view.addEventListener('click', function (event) {
        var add = event.target.closest('[data-wf-diagram-add]');
        if (add) {
          var type = add.dataset.wfDiagramAdd;
          if (kind === 'sequence') addSequenceItem(type);
          else if (kind === 'gantt') addGanttItem(type);
          else addGraphNode(type);
          return;
        }

        var zoom = event.target.closest('[data-wf-diagram-zoom]');
        if (zoom) {
          var action = zoom.dataset.wfDiagramZoom;
          if (action === 'in') setZoom(state.zoom + 0.1);
          if (action === 'out') setZoom(state.zoom - 0.1);
          if (action === 'fit') setZoom(clamp((viewport.clientWidth - 24) / 1200, 0.5, 1));
          return;
        }

        if (event.target.closest('[data-wf-diagram-delete]')) {
          removeSelection();
          return;
        }

        var connectFrom = event.target.closest('[data-wf-diagram-connect-from]');
        if (connectFrom) {
          state.connectSource = connectFrom.dataset.wfDiagramConnectFrom;
          state.selection = { kind: 'node', id: state.connectSource };
          render();
          return;
        }

        if (event.target.closest('[data-wf-diagram-connect]')) {
          if (state.connectSource) state.connectSource = '';
          else if (state.selection.kind === 'node' && isConnectable(node(state.selection.id))) state.connectSource = state.selection.id;
          render();
          return;
        }

        var edgeControl = event.target.closest('[data-diagram-edge-id]');
        if (edgeControl) {
          select('edge', edgeControl.dataset.diagramEdgeId);
          return;
        }

        var frameControl = event.target.closest('[data-diagram-frame-id]');
        if (frameControl) {
          select('frame', frameControl.dataset.diagramFrameId);
          return;
        }

        var itemControl = event.target.closest('[data-diagram-node-id]');
        if (itemControl) {
          var id = itemControl.dataset.diagramNodeId;
          if (kind === 'sequence' && chooseSequenceParticipant(id)) return;
          if (state.connectSource && id !== state.connectSource && isConnectable(node(id))) {
            addEdge(state.connectSource, id);
            return;
          }
          select('node', id);
        }
      });

      view.addEventListener('dragstart', function (event) {
        var add = event.target.closest('[data-wf-diagram-add]');
        if (!add || kind !== 'graph') return;
        state.paletteType = add.dataset.wfDiagramAdd;
        event.dataTransfer.setData('text/plain', state.paletteType);
      });

      viewport.addEventListener('dragover', function (event) {
        if (state.paletteType) event.preventDefault();
      });

      viewport.addEventListener('drop', function (event) {
        if (!state.paletteType || kind !== 'graph') return;
        event.preventDefault();
        var box = viewport.getBoundingClientRect();
        addGraphNode(state.paletteType, {
          x: (event.clientX - box.left + viewport.scrollLeft) / state.zoom,
          y: (event.clientY - box.top + viewport.scrollTop) / state.zoom
        });
        state.paletteType = '';
      });

      surface.addEventListener('pointerdown', function (event) {
        if (event.target.closest('[data-wf-diagram-connect-from]')) return;
        var itemControl = event.target.closest('[data-diagram-node-id]');
        if (!itemControl) return;
        var item = node(itemControl.dataset.diagramNodeId);
        if (!item) return;
        state.selection = { kind: 'node', id: item.id };

        if (kind === 'gantt') {
          var bar = event.target.closest('[data-wf-gantt-bar]');
          if (!bar) return;
          state.dragging = {
            mode: event.target.closest('[data-wf-gantt-resize]') ? 'gantt-resize' : 'gantt-move',
            item: item,
            control: bar,
            x: event.clientX,
            start: item.start,
            duration: item.duration
          };
          bar.setPointerCapture(event.pointerId);
          updateInspector();
          return;
        }

        if (kind === 'sequence') {
          var actor = event.target.closest('.wf-sequence__actor');
          if (!actor || state.messageStep) return;
          state.dragging = { mode: 'sequence', item: item, control: actor, x: event.clientX, startX: item.x };
          actor.setPointerCapture(event.pointerId);
          updateInspector();
          return;
        }

        var control = event.target.closest('.wf-diagram__node');
        if (!control || state.connectSource) return;
        var resizeControl = event.target.closest('[data-wf-diagram-resize]');
        if (resizeControl && item.type === 'boundary') {
          state.dragging = {
            mode: 'boundary-resize',
            item: item,
            control: control,
            x: event.clientX,
            y: event.clientY,
            startWidth: item.w || 440,
            startHeight: item.h || 245
          };
          resizeControl.setPointerCapture(event.pointerId);
          updateInspector();
          return;
        }
        state.dragging = { mode: 'graph', item: item, control: control, x: event.clientX, y: event.clientY, startX: item.x, startY: item.y };
        control.setPointerCapture(event.pointerId);
        surface.querySelectorAll('.wf-diagram__node-select').forEach(function (candidate) {
          candidate.setAttribute('aria-selected', String(candidate.parentElement === control));
        });
        updateInspector();
      });

      surface.addEventListener('pointermove', function (event) {
        if (!state.dragging) return;
        var drag = state.dragging;
        if (drag.mode === 'graph') {
          drag.item.x = clamp(drag.startX + (event.clientX - drag.x) / state.zoom, 0, 1200 - (drag.item.w || 150));
          drag.item.y = clamp(drag.startY + (event.clientY - drag.y) / state.zoom, 0, 620 - (drag.item.h || 70));
          drag.control.style.left = drag.item.x + 'px';
          drag.control.style.top = drag.item.y + 'px';
          renderGraphEdges();
        } else if (drag.mode === 'boundary-resize') {
          drag.item.w = clamp(drag.startWidth + (event.clientX - drag.x) / state.zoom, 240, 1200 - drag.item.x);
          drag.item.h = clamp(drag.startHeight + (event.clientY - drag.y) / state.zoom, 140, 620 - drag.item.y);
          drag.control.style.width = drag.item.w + 'px';
          drag.control.style.height = drag.item.h + 'px';
          inspector.elements.width.value = Math.round(drag.item.w);
          inspector.elements.height.value = Math.round(drag.item.h);
        } else if (drag.mode === 'sequence') {
          drag.item.x = clamp(drag.startX + (event.clientX - drag.x) / state.zoom, 20, 1030);
          drag.control.style.left = drag.item.x + 'px';
          renderSequenceEdges();
        } else {
          var delta = Math.round((event.clientX - drag.x) / (70 * state.zoom));
          var weekCount = (state.data.weeks || []).length || 12;
          if (drag.mode === 'gantt-resize') drag.item.duration = clamp(drag.duration + delta, 1, weekCount - drag.item.start + 1);
          else drag.item.start = clamp(drag.start + delta, 1, weekCount - drag.item.duration + 1);
          drag.control.style.left = ((drag.item.start - 1) * 70 + 7) + 'px';
          if (drag.item.type !== 'milestone') drag.control.style.width = (drag.item.duration * 70 - 14) + 'px';
        }
      });

      function endDrag() {
        if (!state.dragging) return;
        state.dragging = null;
        render();
      }

      surface.addEventListener('pointerup', endDrag);
      surface.addEventListener('pointercancel', endDrag);

      viewport.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && (state.connectSource || state.messageStep)) {
          state.connectSource = '';
          state.messageStep = '';
          state.messageSource = '';
          render();
          return;
        }
        if ((event.key === 'Delete' || event.key === 'Backspace') && state.selection.id) {
          event.preventDefault();
          removeSelection();
          return;
        }
        var selected = state.selection.kind === 'node' ? node(state.selection.id) : null;
        if (!selected) return;
        if (kind === 'gantt' && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
          event.preventDefault();
          var direction = event.key === 'ArrowRight' ? 1 : -1;
          var weeks = (state.data.weeks || []).length || 12;
          if (event.shiftKey && selected.type !== 'milestone') selected.duration = clamp(selected.duration + direction, 1, weeks - selected.start + 1);
          else selected.start = clamp(selected.start + direction, 1, weeks - selected.duration + 1);
          render();
          return;
        }
        var moves = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] };
        if (!moves[event.key]) return;
        event.preventDefault();
        if (kind === 'sequence') {
          selected.x = clamp(selected.x + moves[event.key][0], 20, 1030);
        } else {
          selected.x = clamp(selected.x + moves[event.key][0], 0, 1200 - (selected.w || 150));
          selected.y = clamp(selected.y + moves[event.key][1], 0, 620 - (selected.h || 70));
        }
        render();
      });

      if (inspector) {
        inspector.addEventListener('input', function (event) {
          var selected = selectionData();
          if (!selected) return;
          if (event.target.name === 'label' || event.target.name === 'edgeLabel') selected.label = event.target.value;
          if (event.target.name === 'details') selected.details = event.target.value.split('\n').filter(Boolean);
          if (event.target.name === 'owner') selected.owner = event.target.value;
          if (event.target.name === 'start') selected.start = clamp(Number(event.target.value) || 1, 1, (state.data.weeks || []).length || 12);
          if (event.target.name === 'duration') selected.duration = clamp(Number(event.target.value) || 1, 1, ((state.data.weeks || []).length || 12) - selected.start + 1);
          if (event.target.name === 'width') selected.w = clamp(Number(event.target.value) || 240, 240, 1200 - selected.x);
          if (event.target.name === 'height') selected.h = clamp(Number(event.target.value) || 140, 140, 620 - selected.y);
          render();
        });
      }

      render();
      setZoom(clamp((viewport.clientWidth - 24) / 1200, 0.65, 1));
    });
  }

  window.WireframeDiagramCanvas = { init: init };
})();
