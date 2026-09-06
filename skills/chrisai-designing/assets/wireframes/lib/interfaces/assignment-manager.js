(function () {
  var ready = new WeakSet();
  function esc(value) { var node = document.createElement('span'); node.textContent = value == null ? '' : String(value); return node.innerHTML; }
  function notify(title, body) { if (window.WireframeNotifier) window.WireframeNotifier.show({ title: title, body: body }); }
  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-assignment-manager]'), function (view) {
      if (ready.has(view)) return; ready.add(view);
      var data; try { data = JSON.parse(view.querySelector('[data-wf-assignment-data]').textContent); } catch (error) { data = { people: [] }; }
      var checked = { available: [], assigned: [] }, query = { available: '', assigned: '' };
      function rows(side) { return data.people.filter(function (person) { return (person.assigned ? 'assigned' : 'available') === side && (!query[side] || (person.name + ' ' + person.role).toLowerCase().indexOf(query[side]) !== -1); }); }
      function renderSide(side) { var list = view.querySelector('[data-wf-assignment-list="' + side + '"]'), items = rows(side); list.innerHTML = items.length ? items.map(function (person) { return '<li><label class="wf-assignment-manager__item"><input type="checkbox" data-person="' + esc(person.id) + '" data-side="' + side + '"' + (checked[side].indexOf(person.id) !== -1 ? ' checked' : '') + '><span><strong>' + esc(person.name) + '</strong><span>' + esc(person.role) + '</span></span></label></li>'; }).join('') : '<li class="wf-copy">No people match this list.</li>'; view.querySelector('[data-wf-assignment-count="' + side + '"]').textContent = items.length; }
      function render() { renderSide('available'); renderSide('assigned'); view.querySelector('[data-wf-assign-add]').disabled = !checked.available.length; view.querySelector('[data-wf-assign-remove]').disabled = !checked.assigned.length; }
      function move(side) { var ids = checked[side].slice(), assign = side === 'available'; data.people.forEach(function (person) { if (ids.indexOf(person.id) !== -1) person.assigned = assign; }); checked[side] = []; render(); notify(assign ? 'People assigned' : 'Assignments removed', ids.length + (ids.length === 1 ? ' person was moved.' : ' people were moved.')); }
      view.addEventListener('input', function (event) { if (event.target.matches('[data-wf-assignment-search]')) { var side = event.target.dataset.wfAssignmentSearch; query[side] = event.target.value.trim().toLowerCase(); renderSide(side); } if (event.target.matches('[data-person]')) { var list = checked[event.target.dataset.side], id = event.target.dataset.person; checked[event.target.dataset.side] = event.target.checked ? list.concat(id) : list.filter(function (value) { return value !== id; }); render(); } });
      view.addEventListener('click', function (event) { if (event.target.closest('[data-wf-assign-add]')) move('available'); if (event.target.closest('[data-wf-assign-remove]')) move('assigned'); if (event.target.closest('[data-wf-assignment-save]')) notify('Assignments saved', rows('assigned').length + ' people now have access.'); });
      render();
    });
  }
  window.WireframeAssignmentManager = { init: init };
})();
