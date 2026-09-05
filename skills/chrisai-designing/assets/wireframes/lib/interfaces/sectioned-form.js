(function () {
  'use strict';

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
      return JSON.parse(root.querySelector('[data-wf-sectioned-form-data]').textContent);
    } catch (error) {
      return {
        contacts: { email: '', name: '', phone: '', role: '' },
        documents: { file: '', reference: '', type: '' },
        locations: { address: '', city: '', country: '', label: '' },
        organization: { name: '', type: 'Manufacturer', website: '' }
      };
    }
  }

  function notify(title, body) {
    if (window.WireframeNotifier) window.WireframeNotifier.show({ title: title, body: body });
  }

  function readPath(object, path) {
    return path.split('.').reduce(function (value, key) { return value && value[key]; }, object);
  }

  function writePath(object, path, value) {
    var keys = path.split('.');
    var target = object;
    keys.slice(0, -1).forEach(function (key) { target = target[key]; });
    target[keys[keys.length - 1]] = value;
  }

  function controller(root) {
    var storageKey = root.dataset.wfSectionedFormStorage || 'wf-sectioned-form-draft';
    var state = clone(parseData(root));
    var savedDraft = null;
    try { savedDraft = JSON.parse(sessionStorage.getItem(storageKey)); } catch (error) {}
    if (savedDraft && savedDraft.data) state = clone(savedDraft.data);

    var progressBar = root.querySelector('[data-wf-progress-bar]');
    var progressPercent = root.querySelector('[data-wf-progress-percent]');
    var progressCopy = root.querySelector('[data-wf-progress-copy]');
    var suggestions = root.querySelector('[data-wf-suggestions]');
    var submitButtons = root.querySelectorAll('[data-wf-submit]');

    var sectionLabels = {
      contacts: 'Contact details',
      documents: 'Registration document',
      locations: 'Operating location'
    };

    var checkpoints = [
      { complete: function () { return Boolean(state.organization.name.trim() && state.organization.website.trim()); }, label: 'Complete organization details', target: 'organization.name' },
      { complete: function () { return Boolean(state.contacts.name.trim() && state.contacts.email.trim() && state.contacts.phone.trim()); }, label: 'Add contact details', target: 'contacts' },
      { complete: function () { return Boolean(state.locations.address.trim() && state.locations.city.trim() && state.locations.country.trim()); }, label: 'Add an operating location', target: 'locations' },
      { complete: function () { return Boolean(state.documents.type.trim() && state.documents.reference.trim() && state.documents.file.trim()); }, label: 'Add a registration document', target: 'documents' }
    ];

    function summaryPair(label, value) {
      return '<div><dt>' + escapeHtml(label) + '</dt><dd>' + escapeHtml(value || 'Not provided') + '</dd></div>';
    }

    function renderSummaries() {
      var contactSummary = root.querySelector('[data-wf-section-summary="contacts"]');
      var locationSummary = root.querySelector('[data-wf-section-summary="locations"]');
      var documentSummary = root.querySelector('[data-wf-section-summary="documents"]');

      contactSummary.innerHTML = state.contacts.name || state.contacts.email || state.contacts.phone
        ? summaryPair('Contact', state.contacts.name) + summaryPair('Role', state.contacts.role) + summaryPair('Email', state.contacts.email) + summaryPair('Phone', state.contacts.phone)
        : '<p class="wf-sectioned-form__summary-empty">No contact details added.</p>';
      locationSummary.innerHTML = state.locations.address || state.locations.city || state.locations.country
        ? summaryPair('Location', state.locations.label) + summaryPair('Address', [state.locations.address, state.locations.city, state.locations.country].filter(Boolean).join(', '))
        : '<p class="wf-sectioned-form__summary-empty">No operating location added.</p>';
      documentSummary.innerHTML = state.documents.type || state.documents.reference || state.documents.file
        ? summaryPair('Document', state.documents.type) + summaryPair('Registration number', state.documents.reference) + summaryPair('File', state.documents.file)
        : '<p class="wf-sectioned-form__summary-empty">No registration document added.</p>';
    }

    function renderProgress() {
      var completeCount = checkpoints.filter(function (item) { return item.complete(); }).length;
      var percent = Math.round((completeCount / checkpoints.length) * 100);
      progressPercent.textContent = percent + '%';
      progressBar.setAttribute('aria-valuenow', String(percent));
      progressBar.querySelector('span').style.width = percent + '%';
      progressCopy.textContent = completeCount + ' of ' + checkpoints.length + ' required sections complete';
      submitButtons.forEach(function (button) { button.disabled = completeCount !== checkpoints.length; });

      var remaining = checkpoints.filter(function (item) { return !item.complete(); });
      suggestions.innerHTML = remaining.length
        ? remaining.map(function (item) { return '<li><button type="button" data-wf-suggestion-target="' + escapeHtml(item.target) + '"><span data-wf-icon="arrow-right"></span>' + escapeHtml(item.label) + '</button></li>'; }).join('')
        : '<li><p class="wf-sectioned-form__complete-message"><span data-wf-icon="check"></span>All required sections are complete.</p></li>';
    }

    function renderParentFields() {
      root.querySelectorAll('[data-wf-parent-field]').forEach(function (input) {
        input.value = readPath(state, input.dataset.wfParentField) || '';
      });
    }

    function renderAll() {
      renderSummaries();
      renderProgress();
      if (window.WireframeIcons) window.WireframeIcons.render(root);
    }

    function openEditor(section) {
      var dialog = root.querySelector('[data-wf-section-dialog="' + section + '"]');
      var sectionState = state[section];
      dialog.querySelectorAll('[data-wf-dialog-field]').forEach(function (input) {
        input.value = sectionState[input.dataset.wfDialogField] || '';
        input.closest('.wf-field').setAttribute('aria-invalid', 'false');
        var error = input.closest('.wf-field').querySelector('.wf-error');
        if (error) error.hidden = true;
      });
      dialog.showModal();
      var first = dialog.querySelector('[data-wf-dialog-field]');
      if (first) first.focus();
    }

    function validate(form) {
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var fieldValid = Boolean(input.value.trim()) && input.checkValidity();
        var field = input.closest('.wf-field');
        field.setAttribute('aria-invalid', String(!fieldValid));
        var error = field.querySelector('.wf-error');
        if (error) error.hidden = fieldValid;
        if (!fieldValid) valid = false;
      });
      return valid;
    }

    root.querySelectorAll('[data-wf-parent-field]').forEach(function (input) {
      input.addEventListener(input.tagName === 'SELECT' ? 'change' : 'input', function () {
        writePath(state, input.dataset.wfParentField, input.value);
        renderAll();
      });
    });

    root.addEventListener('click', function (event) {
      var editor = event.target.closest('[data-wf-section-edit]');
      if (editor) openEditor(editor.dataset.wfSectionEdit);

      var suggestion = event.target.closest('[data-wf-suggestion-target]');
      if (suggestion) {
        var target = suggestion.dataset.wfSuggestionTarget;
        if (target.indexOf('.') > -1) {
          var input = root.querySelector('[data-wf-parent-field="' + target + '"]');
          if (input) input.focus();
        } else {
          openEditor(target);
        }
      }

      var closer = event.target.closest('[data-wf-dialog-close]');
      if (closer) closer.closest('dialog').close('cancel');
    });

    root.querySelectorAll('[data-wf-section-form]').forEach(function (form) {
      form.noValidate = true;
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!validate(form)) return;
        var section = form.dataset.wfSectionForm;
        var nextState = {};
        form.querySelectorAll('[data-wf-dialog-field]').forEach(function (input) { nextState[input.dataset.wfDialogField] = input.value.trim(); });
        state[section] = nextState;
        form.closest('dialog').close('save');
        renderAll();
        notify(sectionLabels[section] + ' updated', 'The application summary now reflects these values. Save the draft to keep them.');
      });
    });

    root.querySelectorAll('[data-wf-save-draft]').forEach(function (button) {
      button.addEventListener('click', function () {
        try { sessionStorage.setItem(storageKey, JSON.stringify({ data: state, savedAt: Date.now() })); } catch (error) {}
        notify('Draft saved', 'The browser-local application draft is up to date.');
      });
    });

    submitButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        if (button.disabled) return;
        notify('Application submitted', 'The simulated application is ready for review.');
      });
    });

    root.querySelectorAll('[data-wf-section-dialog]').forEach(function (dialog) {
      dialog.addEventListener('cancel', function (event) { event.preventDefault(); dialog.close('cancel'); });
    });

    renderParentFields();
    renderAll();
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-sectioned-form]'), function (form) {
      if (form.dataset.wfSectionedFormReady) return;
      form.dataset.wfSectionedFormReady = 'true';
      controller(form);
    });
  }

  window.WireframeSectionedForm = { init: init };
})();
