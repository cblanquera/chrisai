(function () {
  'use strict';

  var typeLabels = {
    checkbox: 'Checkboxes',
    date: 'Date',
    datetime: 'Date and time',
    file: 'File upload',
    long: 'Long answer',
    number: 'Number',
    radio: 'Multiple choice',
    rich: 'Rich text',
    select: 'Dropdown',
    short: 'Short answer',
    tags: 'Tags',
    textlist: 'Text list',
    url: 'URL'
  };

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
      return JSON.parse(root.querySelector('[data-wf-form-builder-data]').textContent);
    } catch (error) {
      return { fields: [{ help: '', id: 'field-1', label: 'Untitled field', name: 'field1', options: [], placeholder: '', required: false, type: 'short' }] };
    }
  }

  function notify(title, body) {
    if (window.WireframeNotifier) window.WireframeNotifier.show({ title: title, body: body });
  }

  function controller(root) {
    var data = parseData(root);
    var draft = null;
    try { draft = JSON.parse(sessionStorage.getItem(root.dataset.wfFormBuilderStorage || 'wf-form-builder-draft')); } catch (error) {}
    var fields = draft && Array.isArray(draft.fields) && draft.fields.length ? clone(draft.fields) : clone(data.fields);
    var selectedId = fields[0].id;
    var draggedId = '';
    var nextId = fields.length + 1;
    var list = root.querySelector('[data-wf-form-builder-field-list]');
    var saveState = root.querySelector('[data-wf-form-builder-save-state]');
    var deleteDialog = root.querySelector('[data-wf-form-builder-delete-dialog]');
    var previewDialog = root.querySelector('[data-wf-form-builder-preview-dialog]');
    var properties = {};
    root.querySelectorAll('[data-wf-form-builder-property]').forEach(function (input) {
      properties[input.dataset.wfFormBuilderProperty] = input;
    });
    if (draft) {
      root.querySelector('[data-wf-form-builder-name]').value = draft.name || 'Untitled form';
      root.querySelector('[data-wf-form-builder-description]').value = draft.description || '';
      root.querySelector('[data-wf-form-builder-status]').value = draft.status || 'draft';
      root.querySelector('[data-wf-form-builder-heading]').textContent = draft.name || 'Untitled form';
    }

    function selectedField() {
      return fields.find(function (field) { return field.id === selectedId; });
    }

    function markDirty() {
      saveState.textContent = 'Unsaved changes';
    }

    function answerPreview(field) {
      var placeholder = escapeHtml(field.placeholder || 'Response');
      if (field.type === 'long' || field.type === 'rich') return '<div class="wf-form-builder__answer-preview wf-form-builder__answer-preview--multiline">' + placeholder + '</div>';
      if (field.type === 'radio' || field.type === 'checkbox') {
        return '<div class="wf-form-builder__choice-preview">' + field.options.slice(0, 3).map(function (option) { return '<span>' + escapeHtml(option) + '</span>'; }).join('') + '</div>';
      }
      if (field.type === 'select') return '<div class="wf-form-builder__answer-preview">Select an option</div>';
      if (field.type === 'file') return '<button class="wf-button wf-button--secondary" type="button" tabindex="-1">Choose file</button>';
      if (field.type === 'date' || field.type === 'datetime') return '<div class="wf-form-builder__answer-preview">' + (field.type === 'date' ? 'mm/dd/yyyy' : 'mm/dd/yyyy, --:--') + '</div>';
      if (field.type === 'tags' || field.type === 'textlist') return '<div class="wf-form-builder__answer-preview">Add an item</div>';
      return '<div class="wf-form-builder__answer-preview">' + placeholder + '</div>';
    }

    function renderProperties() {
      var field = selectedField();
      if (!field) return;
      properties.help.value = field.help;
      properties.label.value = field.label;
      properties.name.value = field.name;
      properties.options.value = field.options.join('\n');
      properties.placeholder.value = field.placeholder;
      properties.required.checked = field.required;
      properties.type.value = field.type;
      root.querySelector('[data-wf-form-builder-options-field]').hidden = ['checkbox', 'radio', 'select'].indexOf(field.type) === -1;
      root.querySelector('[data-wf-form-builder-delete]').disabled = fields.length === 1;
    }

    function renderLists() {
      list.innerHTML = fields.map(function (field, index) {
        return '<article class="wf-form-builder__field-card" draggable="true" tabindex="0" aria-selected="' + String(field.id === selectedId) + '" data-wf-form-builder-field="' + escapeHtml(field.id) + '">' +
          '<button class="wf-form-builder__drag" type="button" aria-label="Reorder ' + escapeHtml(field.label) + '"><span data-wf-icon="grip"></span></button>' +
          '<div class="wf-form-builder__field-main"><header><span class="wf-form-builder__field-number">' + (index + 1) + '</span><div><h3>' + escapeHtml(field.label) + (field.required ? ' <em class="wf-form-builder__required">*</em>' : '') + '</h3><p>' + escapeHtml(typeLabels[field.type]) + (field.required ? ' · Required' : '') + '</p></div></header>' + answerPreview(field) + '</div>' +
        '<div class="wf-form-builder__field-actions"><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-form-builder-move="up" aria-label="Move field up"' + (index === 0 ? ' disabled' : '') + '><span data-wf-icon="chevron-up"></span></button><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-form-builder-move="down" aria-label="Move field down"' + (index === fields.length - 1 ? ' disabled' : '') + '><span data-wf-icon="chevron-down"></span></button><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-form-builder-copy aria-label="Duplicate field"><span data-wf-icon="copy"></span></button></div>' +
          '</article>';
      }).join('');
      if (window.WireframeIcons) window.WireframeIcons.render(root);
    }

    function renderAll() {
      renderLists();
      renderProperties();
    }

    function select(id, focusProperty) {
      if (!fields.some(function (field) { return field.id === id; })) return;
      selectedId = id;
      renderAll();
      if (focusProperty) properties.label.focus();
    }

    function move(id, offset) {
      var index = fields.findIndex(function (field) { return field.id === id; });
      var destination = index + offset;
      if (index < 0 || destination < 0 || destination >= fields.length) return;
      var field = fields.splice(index, 1)[0];
      fields.splice(destination, 0, field);
      selectedId = id;
      markDirty();
      renderAll();
      root.querySelector('[data-wf-form-builder-field="' + id + '"]').focus();
    }

    function addField() {
      var id = 'field-' + nextId;
      var name = 'field' + nextId;
      nextId += 1;
      fields.push({ help: '', id: id, label: 'Untitled field', name: name, options: [], placeholder: 'Response', required: false, type: 'short' });
      selectedId = id;
      markDirty();
      renderAll();
      properties.label.focus();
      properties.label.select();
    }

    function duplicateSelected() {
      var index = fields.findIndex(function (field) { return field.id === selectedId; });
      if (index < 0) return;
      var source = fields[index];
      var copy = clone(source);
      copy.id = source.id + '-copy-' + Date.now();
      copy.label = source.label + ' copy';
      copy.name = source.name + 'Copy';
      fields.splice(index + 1, 0, copy);
      selectedId = copy.id;
      markDirty();
      renderAll();
      properties.label.focus();
      properties.label.select();
    }

    function deleteSelected() {
      if (fields.length === 1) return;
      var index = fields.findIndex(function (field) { return field.id === selectedId; });
      fields.splice(index, 1);
      selectedId = fields[Math.min(index, fields.length - 1)].id;
      deleteDialog.close('confirm');
      markDirty();
      renderAll();
      notify('Field deleted', 'The ordered field list has been updated.');
    }

    function reorderDrop(targetId) {
      if (!draggedId || draggedId === targetId) return;
      var sourceIndex = fields.findIndex(function (field) { return field.id === draggedId; });
      var targetIndex = fields.findIndex(function (field) { return field.id === targetId; });
      var field = fields.splice(sourceIndex, 1)[0];
      fields.splice(targetIndex, 0, field);
      selectedId = draggedId;
      draggedId = '';
      markDirty();
      renderAll();
    }

    function previewField(field, index) {
      var id = 'wf-form-builder-preview-' + field.id;
      var label = '<span class="wf-label">' + (index + 1) + '. ' + escapeHtml(field.label) + (field.required ? ' *' : '') + '</span>';
      var help = field.help ? '<span class="wf-help">' + escapeHtml(field.help) + '</span>' : '';
      if (field.type === 'long' || field.type === 'rich') return '<label class="wf-field">' + label + '<textarea class="wf-textarea" id="' + id + '" placeholder="' + escapeHtml(field.placeholder) + '"></textarea>' + help + '</label>';
      if (field.type === 'select') return '<label class="wf-field">' + label + '<select class="wf-select" id="' + id + '"><option>Select an option</option>' + field.options.map(function (option) { return '<option>' + escapeHtml(option) + '</option>'; }).join('') + '</select>' + help + '</label>';
      if (field.type === 'radio' || field.type === 'checkbox') return '<fieldset class="wf-field"><legend class="wf-label">' + (index + 1) + '. ' + escapeHtml(field.label) + (field.required ? ' *' : '') + '</legend>' + field.options.map(function (option) { return '<label class="wf-check"><input type="' + field.type + '" name="' + escapeHtml(field.name) + '"><span>' + escapeHtml(option) + '</span></label>'; }).join('') + help + '</fieldset>';
      var inputType = { date: 'date', datetime: 'datetime-local', file: 'file', number: 'number', url: 'url' }[field.type] || 'text';
      return '<label class="wf-field">' + label + '<input class="wf-input" id="' + id + '" type="' + inputType + '" placeholder="' + escapeHtml(field.placeholder) + '">' + help + '</label>';
    }

    function openPreview() {
      root.querySelector('[data-wf-form-builder-preview-heading]').textContent = root.querySelector('[data-wf-form-builder-name]').value.trim() || 'Untitled form';
      root.querySelector('[data-wf-form-builder-preview-description]').textContent = root.querySelector('[data-wf-form-builder-description]').value;
      root.querySelector('[data-wf-form-builder-preview-list]').innerHTML = fields.map(previewField).join('');
      previewDialog.showModal();
    }

    list.addEventListener('click', function (event) {
      var card = event.target.closest('[data-wf-form-builder-field]');
      if (!card) return;
      select(card.dataset.wfFormBuilderField, false);
      if (event.target.closest('[data-wf-form-builder-copy]')) duplicateSelected();
      var movement = event.target.closest('[data-wf-form-builder-move]');
      if (movement) move(card.dataset.wfFormBuilderField, movement.dataset.wfFormBuilderMove === 'up' ? -1 : 1);
    });
    list.addEventListener('dragstart', function (event) {
      var card = event.target.closest('[data-wf-form-builder-field]');
      draggedId = card ? card.dataset.wfFormBuilderField : '';
      event.dataTransfer.effectAllowed = 'move';
    });
    list.addEventListener('dragover', function (event) { event.preventDefault(); });
    list.addEventListener('drop', function (event) {
      event.preventDefault();
      var card = event.target.closest('[data-wf-form-builder-field]');
      if (card) reorderDrop(card.dataset.wfFormBuilderField);
    });
    Object.keys(properties).forEach(function (key) {
      var input = properties[key];
      var eventName = input.type === 'checkbox' || input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(eventName, function () {
        var field = selectedField();
        if (key === 'options') field.options = input.value.split('\n').map(function (option) { return option.trim(); }).filter(Boolean);
        else if (key === 'required') field.required = input.checked;
        else field[key] = input.value;
        var valid = field.label.trim().length > 0;
        root.querySelector('[data-wf-form-builder-label-field]').setAttribute('aria-invalid', String(!valid));
        root.querySelector('[data-wf-form-builder-label-error]').hidden = valid;
        root.querySelector('[data-wf-form-builder-options-field]').hidden = ['checkbox', 'radio', 'select'].indexOf(field.type) === -1;
        markDirty();
        renderLists();
      });
    });
    root.querySelectorAll('[data-wf-form-builder-add]').forEach(function (button) { button.addEventListener('click', addField); });
    root.querySelector('[data-wf-form-builder-duplicate]').addEventListener('click', duplicateSelected);
    root.querySelector('[data-wf-form-builder-delete]').addEventListener('click', function () { if (fields.length > 1) deleteDialog.showModal(); });
    root.querySelector('[data-wf-form-builder-delete-cancel]').addEventListener('click', function () { deleteDialog.close('cancel'); });
    root.querySelector('[data-wf-form-builder-delete-confirm]').addEventListener('click', deleteSelected);
    root.querySelector('[data-wf-form-builder-preview]').addEventListener('click', openPreview);
    root.querySelectorAll('[data-wf-form-builder-preview-close]').forEach(function (button) { button.addEventListener('click', function () { previewDialog.close(); }); });
    root.querySelector('[data-wf-form-builder-save]').addEventListener('click', function () {
      var draft = { fields: fields, name: root.querySelector('[data-wf-form-builder-name]').value, description: root.querySelector('[data-wf-form-builder-description]').value, status: root.querySelector('[data-wf-form-builder-status]').value };
      try { sessionStorage.setItem(root.dataset.wfFormBuilderStorage || 'wf-form-builder-draft', JSON.stringify(draft)); } catch (error) {}
      saveState.textContent = 'Saved';
      notify('Form saved', 'The browser-local draft is up to date.');
    });
    root.querySelector('[data-wf-form-builder-publish]').addEventListener('click', function () {
      root.querySelector('[data-wf-form-builder-status]').value = 'active';
      saveState.textContent = 'Published';
      notify('Form published', 'The sample form is now active.');
    });
    root.querySelector('[data-wf-form-builder-name]').addEventListener('input', function (event) {
      var name = event.target.value || 'Untitled form';
      root.querySelector('[data-wf-form-builder-heading]').textContent = name;
      markDirty();
    });
    root.querySelector('[data-wf-form-builder-description]').addEventListener('input', markDirty);
    root.querySelector('[data-wf-form-builder-status]').addEventListener('change', markDirty);
    renderAll();
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-form-builder]'), function (builder) {
      if (builder.dataset.wfFormBuilderReady) return;
      builder.dataset.wfFormBuilderReady = 'true';
      controller(builder);
    });
  }

  window.WireframeFormBuilder = { init: init };
})();
