(function () {
  'use strict';

  var initializedRoots = new WeakSet();

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function parseData(root) {
    try {
      var parsed = JSON.parse(root.querySelector('[data-wf-detail-panel-data]').textContent);
      return {
        people: Array.isArray(parsed.people) ? parsed.people : [],
        records: Array.isArray(parsed.records) ? parsed.records : []
      };
    } catch (error) {
      return { people: [], records: [] };
    }
  }

  function notify(title, body) {
    if (window.WireframeNotifier) window.WireframeNotifier.show({ title: title, body: body });
  }

  function initDetailPanel(root) {
    if (initializedRoots.has(root)) return;
    initializedRoots.add(root);

    var data = clone(parseData(root));
    var records = data.records;
    var people = data.people;
    var stack = root.querySelector('[data-wf-detail-stack]');
    var list = root.querySelector('[data-wf-detail-panel-list]');
    var search = root.querySelector('[data-wf-detail-panel-search]');
    var status = root.querySelector('[data-wf-detail-panel-status]');
    var personForm = root.querySelector('[data-wf-detail-panel-person-form]');
    var currentRecordId = records[0] ? records[0].id : '';
    var currentPersonId = records[0] ? records[0].personId : '';

    function personById(id) {
      return people.find(function (person) { return person.id === id; });
    }

    function recordById(id) {
      return records.find(function (record) { return record.id === id; });
    }

    function setText(selector, value) {
      var node = root.querySelector(selector);
      if (node) node.textContent = value || '';
    }

    function isPanelOpen() {
      return root.getAttribute('data-wf-right-open') === 'true';
    }

    function badgeClass(value) {
      if (value === 'Resolved' || value === 'Complete' || value === 'Published') return 'wf-badge wf-badge--solid';
      if (value === 'Pending' || value === 'Review') return 'wf-badge wf-badge--outline';
      return 'wf-badge';
    }

    function filteredRecords() {
      var term = search.value.trim().toLowerCase();
      var selectedStatus = status.value;
      return records.filter(function (record) {
        var person = personById(record.personId);
        var searchable = [record.title, record.summary, record.status, person && person.name].join(' ').toLowerCase();
        return (!term || searchable.indexOf(term) !== -1) && (!selectedStatus || record.status === selectedStatus);
      });
    }

    function renderRows() {
      var visible = filteredRecords();
      if (!visible.length) {
        list.innerHTML = '<tr><td class="wf-table__empty wf-detail-panel__empty" colspan="4">No matching records</td></tr>';
      } else {
        list.innerHTML = visible.map(function (record) {
          var person = personById(record.personId) || { name: 'Unassigned' };
          var selected = isPanelOpen() && record.id === currentRecordId;
          return '<tr tabindex="0" aria-selected="' + String(selected) + '" data-wf-detail-open="record-detail" data-wf-detail-panel-record="' + escapeHtml(record.id) + '"' + (selected ? ' data-wf-detail-selected' : '') + '>' +
            '<th scope="row"><strong>' + escapeHtml(record.title) + '</strong></th>' +
            '<td data-wf-detail-panel-person-cell="' + escapeHtml(person.id || '') + '">' + escapeHtml(person.name) + '</td>' +
            '<td><span class="' + badgeClass(record.status) + '" data-wf-detail-panel-status-cell>' + escapeHtml(record.status) + '</span></td>' +
            '<td data-wf-detail-panel-updated-cell>' + escapeHtml(record.updated) + '</td>' +
          '</tr>';
        }).join('');
      }
      setText('[data-wf-detail-panel-count]', visible.length + (visible.length === 1 ? ' record' : ' records'));
    }

    function renderStatusOptions() {
      var statuses = records.map(function (record) { return record.status; }).filter(function (value, index, values) { return values.indexOf(value) === index; });
      status.innerHTML = '<option value="">All statuses</option>' + statuses.map(function (value) {
        return '<option value="' + escapeHtml(value) + '">' + escapeHtml(value) + '</option>';
      }).join('');
    }

    function renderPerson(personId) {
      var person = personById(personId);
      if (!person) return;
      currentPersonId = person.id;
      setText('[data-wf-detail-panel-person-name]', person.name);
      setText('[data-wf-detail-panel-person-role]', person.role);
      setText('[data-wf-detail-panel-person-email]', person.email);
      setText('[data-wf-detail-panel-person-phone]', person.phone);
      personForm.elements.name.value = person.name || '';
      personForm.elements.role.value = person.role || '';
      personForm.elements.email.value = person.email || '';
      personForm.elements.phone.value = person.phone || '';
    }

    function renderRecord(recordId) {
      var record = recordById(recordId);
      if (!record) return;
      var person = personById(record.personId) || { id: '', name: 'Unassigned' };
      currentRecordId = record.id;
      currentPersonId = person.id;
      var badge = root.querySelector('[data-wf-detail-panel-record-status]');
      badge.className = badgeClass(record.status);
      badge.textContent = record.status;
      setText('[data-wf-detail-panel-record-updated]', record.updated);
      setText('[data-wf-detail-panel-record-title]', record.title);
      setText('[data-wf-detail-panel-record-person]', person.name);
      setText('[data-wf-detail-panel-record-summary]', record.summary);
      setText('[data-wf-detail-panel-record-detail]', record.detail);
      var resolve = root.querySelector('[data-wf-detail-panel-resolve]');
      resolve.disabled = record.status === 'Resolved';
      resolve.innerHTML = (window.WireframeIcons ? window.WireframeIcons.svg('check') : '') + (resolve.disabled ? 'Resolved' : 'Mark resolved');
      if (person.id) renderPerson(person.id);
    }

    function refreshVisibleRows() {
      Array.prototype.forEach.call(list.querySelectorAll('[data-wf-detail-panel-record]'), function (row) {
        var record = recordById(row.dataset.wfDetailPanelRecord);
        if (!record) return;
        var person = personById(record.personId) || { id: '', name: 'Unassigned' };
        var personCell = row.querySelector('[data-wf-detail-panel-person-cell]');
        var statusCell = row.querySelector('[data-wf-detail-panel-status-cell]');
        var updatedCell = row.querySelector('[data-wf-detail-panel-updated-cell]');
        personCell.dataset.wfDetailPanelPersonCell = person.id || '';
        personCell.textContent = person.name;
        statusCell.className = badgeClass(record.status);
        statusCell.textContent = record.status;
        updatedCell.textContent = record.updated;
      });
    }

    function closeSelectedRecord(event) {
      var trigger = event.target.closest('[data-wf-detail-panel-record][data-wf-detail-open]');
      if (!trigger || !trigger.hasAttribute('data-wf-detail-selected') || !isPanelOpen()) return false;
      event.preventDefault();
      event.stopImmediatePropagation();
      window.WireframePanelDetailStack.close(stack);
      return true;
    }

    root.addEventListener('click', closeSelectedRecord, true);
    root.addEventListener('keydown', function (event) {
      if ((event.key === 'Enter' || event.key === ' ') && closeSelectedRecord(event)) event.preventDefault();
    }, true);

    stack.addEventListener('wf:detail-open', function (event) {
      var trigger = event.detail.trigger;
      if (trigger && trigger.dataset.wfDetailPanelRecord) renderRecord(trigger.dataset.wfDetailPanelRecord);
    });

    stack.addEventListener('wf:detail-submit', function (event) {
      if (event.detail.form !== personForm) return;
      var person = personById(currentPersonId);
      if (!person) return;
      person.name = personForm.elements.name.value.trim();
      person.role = personForm.elements.role.value.trim();
      person.email = personForm.elements.email.value.trim();
      person.phone = personForm.elements.phone.value.trim();
      renderPerson(currentPersonId);
      renderRecord(currentRecordId);
      refreshVisibleRows();
      notify('Requester updated', person.name + ' was saved.');
    });

    root.addEventListener('click', function (event) {
      var resolve = event.target.closest('[data-wf-detail-panel-resolve]');
      if (!resolve || resolve.disabled) return;
      var record = recordById(currentRecordId);
      if (!record) return;
      record.status = 'Resolved';
      record.updated = 'Just now';
      renderStatusOptions();
      renderRecord(currentRecordId);
      refreshVisibleRows();
      notify('Request resolved', record.title + ' was marked resolved.');
    });

    function applyFilters(event) {
      if (isPanelOpen()) window.WireframePanelDetailStack.close(stack);
      renderRows();
      if (event && event.currentTarget) event.currentTarget.focus();
    }

    search.addEventListener('input', applyFilters);
    status.addEventListener('change', applyFilters);

    renderStatusOptions();
    renderRows();
    if (currentRecordId) renderRecord(currentRecordId);
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-detail-panel]'), initDetailPanel);
  }

  window.WireframeDetailPanel = { init: init };
})();
