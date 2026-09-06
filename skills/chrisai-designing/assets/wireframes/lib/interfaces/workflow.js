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
      return JSON.parse(root.querySelector('[data-wf-workflow-data]').textContent);
    } catch (error) {
      return { storageKey: 'wf-workflow-draft', workflow: { cards: [], description: '', name: 'Untitled workflow', stages: [] } };
    }
  }

  function loadWorkflow(root) {
    var data = parseData(root);
    var workflow = clone(data.workflow);
    try {
      var saved = JSON.parse(sessionStorage.getItem(data.storageKey));
      if (saved) {
        workflow = Object.assign(workflow, saved);
        if (saved.stages) {
          workflow.stages = saved.stages.map(function (stage) {
            var defaultStage = (data.workflow.stages || []).find(function (item) { return item.id === stage.id; });
            return Object.assign({}, defaultStage || {}, stage);
          });
        }
        if ((!saved.cards || !saved.cards.length) && data.workflow.cards && data.workflow.cards.length) workflow.cards = clone(data.workflow.cards);
      }
    } catch (error) {}
    workflow.cards = workflow.cards || [];
    workflow.stages = workflow.stages || [];
    workflow.stages.forEach(function (stage) {
      if (Array.isArray(stage.automations)) return;
      var defaultStage = (data.workflow.stages || []).find(function (item) { return item.id === stage.id; });
      stage.automations = clone(defaultStage && defaultStage.automations ? defaultStage.automations : []);
    });
    workflow.stages.forEach(function (stage) {
      if (Array.isArray(stage.tasks)) return;
      var defaultStage = (data.workflow.stages || []).find(function (item) { return item.id === stage.id; });
      stage.tasks = clone(defaultStage && defaultStage.tasks ? defaultStage.tasks : []);
    });
    return { data: data, workflow: workflow };
  }

  function saveWorkflow(context) {
    try { sessionStorage.setItem(context.data.storageKey, JSON.stringify(context.workflow)); } catch (error) {}
  }

  function notify(title, body) {
    if (window.WireframeNotifier) window.WireframeNotifier.show({ title: title, body: body });
  }

  function slugify(value) {
    return String(value || 'stage').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'stage';
  }

  function stageById(workflow, id) {
    return workflow.stages.find(function (stage) { return stage.id === id; });
  }

  function cardById(workflow, id) {
    return workflow.cards.find(function (card) { return card.id === id; });
  }

  function renderIcons(root) {
    if (window.WireframeIcons) window.WireframeIcons.render(root);
  }

  function initBoard(root) {
    var context = loadWorkflow(root);
    var workflow = context.workflow;
    var columns = root.querySelector('[data-wf-workflow-columns]');
    var search = root.querySelector('[data-wf-workflow-search]');
    var ownerFilter = root.querySelector('[data-wf-workflow-owner-filter]');
    var drawerLayer = root.querySelector('[data-wf-workflow-drawer-layer]');
    var stageSelect = root.querySelector('[data-wf-workflow-drawer-stage-select]');
    var addDialog = root.querySelector('[data-wf-workflow-add-dialog]');
    var addForm = root.querySelector('[data-wf-workflow-add-form]');
    var stageDialog = root.querySelector('[data-wf-workflow-board-stage-dialog]');
    var stageForm = root.querySelector('[data-wf-workflow-board-stage-form]');
    var stageTaskList = root.querySelector('[data-wf-workflow-stage-task-list]');
    var removeStageDialog = root.querySelector('[data-wf-workflow-remove-stage-dialog]');
    var removeStageForm = root.querySelector('[data-wf-workflow-remove-stage-form]');
    var removeStageTarget = root.querySelector('[data-wf-workflow-remove-stage-target]');
    var blockedDialog = root.querySelector('[data-wf-workflow-blocked-dialog]');
    var selectedId = '';
    var draggedId = '';
    var draggedStageId = '';
    var editingStageId = '';
    var editingStageTasks = [];
    var removingStageCardCount = 0;
    var drawerReturnFocus = null;

    root.querySelector('[data-wf-workflow-title]').textContent = workflow.name;
    root.querySelector('[data-wf-workflow-description]').textContent = workflow.description || '';

    function matchingCards(stageId) {
      var query = search.value.trim().toLowerCase();
      var owner = ownerFilter.value;
      return workflow.cards.filter(function (card) {
        var haystack = [card.title, card.subtitle, card.owner].concat(card.tags || []).join(' ').toLowerCase();
        return card.stageId === stageId && (!query || haystack.indexOf(query) !== -1) && (owner === 'all' || card.owner === owner);
      });
    }

    function progress(card) {
      var total = (card.tasks || []).length;
      var complete = (card.tasks || []).filter(function (task) { return task.done; }).length;
      return { complete: complete, percent: total ? Math.round(complete / total * 100) : 0, total: total };
    }

    function cardMarkup(card) {
      var cardProgress = progress(card);
      return '<button class="wf-workflow__card" type="button" draggable="true" data-wf-workflow-card="' + escapeHtml(card.id) + '">' +
        '<div><h4>' + escapeHtml(card.title) + '</h4><p>' + escapeHtml(card.subtitle) + '</p></div>' +
        '<div class="wf-workflow__tag-list">' + (card.tags || []).map(function (tag) { return '<span class="wf-workflow__tag">' + escapeHtml(tag) + '</span>'; }).join('') + '</div>' +
        '<div class="wf-workflow__card-meta"><span>' + escapeHtml(card.owner) + '</span><span>·</span><span>' + escapeHtml(card.due) + '</span></div>' +
        '<div class="wf-workflow__card-footer"><span>' + cardProgress.complete + '/' + cardProgress.total + ' tasks</span><span class="wf-workflow__progress-track"><span style="width:' + cardProgress.percent + '%"></span></span></div>' +
        '</button>';
    }

    function renderBoard() {
      columns.innerHTML = workflow.stages.map(function (stage) {
        var cards = matchingCards(stage.id);
        var total = workflow.cards.filter(function (card) { return card.stageId === stage.id; }).length;
        var limit = Number(stage.limit) || 0;
        var limitCopy = limit ? total + ' of ' + limit : total + ' cards';
        return '<section class="wf-workflow__column" data-wf-workflow-column="' + escapeHtml(stage.id) + '">' +
          '<header class="wf-workflow__column-header"><div class="wf-workflow__column-copy"><div class="wf-workflow__column-title"><h3>' + escapeHtml(stage.name) + '</h3><span class="wf-workflow__column-count" aria-label="' + escapeHtml(limitCopy) + '">' + total + (limit ? '/' + limit : '') + '</span></div><p>' + escapeHtml(stage.description || 'Workflow stage') + '</p></div><div class="wf-workflow__column-tools"><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-workflow-stage-settings="' + escapeHtml(stage.id) + '" aria-label="Open ' + escapeHtml(stage.name) + ' stage settings"><span data-wf-icon="settings"></span></button><button class="wf-workflow__column-handle" type="button" draggable="true" data-wf-workflow-stage-drag="' + escapeHtml(stage.id) + '" aria-label="Reorder ' + escapeHtml(stage.name) + '. Use the left and right arrow keys or drag."><span data-wf-icon="grip"></span></button></div></header>' +
          '<div class="wf-workflow__card-list">' + (cards.length ? cards.map(cardMarkup).join('') : '<p class="wf-workflow__empty-column">No matching cards</p>') + '</div>' +
          '</section>';
      }).join('') + '<section class="wf-workflow__column wf-workflow__column--add"><button type="button" data-wf-workflow-board-add-stage><span data-wf-icon="add"></span><strong>Add stage</strong><small>Create another workflow stage</small></button></section>';
      renderIcons(root);
    }

    function showBlocked(copy, requirements) {
      root.querySelector('[data-wf-workflow-blocked-copy]').textContent = copy;
      root.querySelector('[data-wf-workflow-blocked-list]').innerHTML = (requirements || []).map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('');
      blockedDialog.showModal();
    }

    function moveCard(cardId, targetId) {
      var card = cardById(workflow, cardId);
      var source = card && stageById(workflow, card.stageId);
      var target = stageById(workflow, targetId);
      if (!card || !source || !target || source.id === target.id) return false;
      if ((card.blockedTargets || []).indexOf(target.id) !== -1) {
        showBlocked(card.title + ' cannot move to ' + target.name + ' yet.', card.blockedRequirements || []);
        return false;
      }
      var targetCount = workflow.cards.filter(function (item) { return item.stageId === target.id; }).length;
      if (Number(target.limit) > 0 && targetCount >= Number(target.limit)) {
        showBlocked(target.name + ' has reached its ' + target.limit + '-card capacity.', ['Move a card out of ' + target.name + ' or increase its maximum in stage settings.']);
        return false;
      }
      card.stageId = target.id;
      card.tasks = card.tasks || [];
      (target.tasks || []).forEach(function (label) {
        if (!card.tasks.some(function (task) { return task.label === label; })) card.tasks.push({ done: false, label: label });
      });
      card.activity = card.activity || [];
      card.activity.unshift('Moved from ' + source.name + ' to ' + target.name);
      saveWorkflow(context);
      renderBoard();
      if (selectedId === card.id) renderDrawer();
      notify('Card moved', escapeHtml(card.title) + ' is now in ' + escapeHtml(target.name) + '.');
      return true;
    }

    function reorderStage(sourceId, targetId) {
      if (!sourceId || !targetId || sourceId === targetId) return;
      var sourceIndex = workflow.stages.findIndex(function (stage) { return stage.id === sourceId; });
      var targetIndex = workflow.stages.findIndex(function (stage) { return stage.id === targetId; });
      if (sourceIndex < 0 || targetIndex < 0) return;
      var stage = workflow.stages.splice(sourceIndex, 1)[0];
      workflow.stages.splice(targetIndex, 0, stage);
      saveWorkflow(context);
      renderBoard();
      var handle = columns.querySelector('[data-wf-workflow-stage-drag="' + sourceId + '"]');
      if (handle) handle.focus();
      notify('Stages reordered', escapeHtml(stage.name) + ' moved to position ' + (targetIndex + 1) + '.');
    }

    function automationHref(stageId, automationId) {
      var href = './workflow-automation-builder.html?stage=' + encodeURIComponent(stageId);
      return automationId ? href + '&automation=' + encodeURIComponent(automationId) : href + '&mode=new';
    }

    function renderStageAutomations(stage) {
      var automations = stage.automations || [];
      root.querySelector('[data-wf-workflow-board-stage-automation-list]').innerHTML = automations.map(function (automation) {
        var status = automation.status || 'draft';
        return '<article class="wf-workflow__automation-item"><div><strong>' + escapeHtml(automation.name) + '</strong><span class="wf-badge">' + escapeHtml(status.charAt(0).toUpperCase() + status.slice(1)) + '</span></div><a class="wf-button wf-button--secondary" href="' + automationHref(stage.id, automation.id) + '">Edit</a></article>';
      }).join('');
      root.querySelector('[data-wf-workflow-board-stage-automation-empty]').hidden = automations.length > 0;
      root.querySelector('[data-wf-workflow-board-stage-automation-add]').href = automationHref(stage.id);
    }

    function renderStageTasks() {
      stageTaskList.innerHTML = editingStageTasks.map(function (label, index) {
        return '<div class="wf-workflow__stage-task-row" data-wf-workflow-stage-task="' + index + '"><input class="wf-input" value="' + escapeHtml(label) + '" aria-label="Task ' + (index + 1) + '" data-wf-workflow-stage-task-name><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-workflow-stage-task-remove aria-label="Remove task ' + (index + 1) + '"><span data-wf-icon="trash"></span></button></div>';
      }).join('');
      root.querySelector('[data-wf-workflow-stage-task-empty]').hidden = editingStageTasks.length > 0;
      renderIcons(root);
    }

    function renderRemoveStageWarning() {
      var stage = stageById(workflow, editingStageId);
      if (!stage) return;
      var deletingCards = removeStageTarget.value === '__delete__';
      root.querySelector('[data-wf-workflow-remove-stage-warning]').textContent = removingStageCardCount
        ? (deletingCards
          ? 'Removing ' + stage.name + ' will also delete its ' + removingStageCardCount + (removingStageCardCount === 1 ? ' card.' : ' cards.') + ' This cannot be undone.'
          : 'Removing ' + stage.name + ' cannot be undone. Choose where its ' + removingStageCardCount + (removingStageCardCount === 1 ? ' card' : ' cards') + ' should move.')
        : 'Removing ' + stage.name + ' cannot be undone. This stage has no cards.';
    }

    function openStageSettings(stageId) {
      var stage = stageById(workflow, stageId);
      if (!stage) return;
      editingStageId = stage.id;
      stageForm.elements.name.value = stage.name;
      stageForm.elements.limit.value = Number(stage.limit) || 0;
      stageForm.elements.description.value = stage.description || '';
      stageForm.elements.outcome.value = stage.outcome || 'none';
      editingStageTasks = clone(stage.tasks || []);
      renderStageTasks();
      root.querySelector('[data-wf-workflow-board-stage-title]').textContent = 'Stage settings';
      root.querySelector('[data-wf-workflow-board-stage-submit]').textContent = 'Save stage';
      root.querySelector('[data-wf-workflow-board-stage-automation]').hidden = false;
      root.querySelector('[data-wf-workflow-board-stage-remove]').hidden = false;
      root.querySelector('[data-wf-workflow-board-stage-remove]').disabled = workflow.stages.length === 1;
      renderStageAutomations(stage);
      stageDialog.showModal();
      stageForm.elements.name.focus();
    }

    function openAddStage() {
      editingStageId = '';
      stageForm.reset();
      stageForm.elements.limit.value = 0;
      editingStageTasks = [];
      renderStageTasks();
      root.querySelector('[data-wf-workflow-board-stage-title]').textContent = 'Add stage';
      root.querySelector('[data-wf-workflow-board-stage-submit]').textContent = 'Add stage';
      root.querySelector('[data-wf-workflow-board-stage-automation]').hidden = true;
      root.querySelector('[data-wf-workflow-board-stage-remove]').hidden = true;
      stageDialog.showModal();
      stageForm.elements.name.focus();
    }

    function renderDrawer() {
      var card = cardById(workflow, selectedId);
      if (!card) return;
      var stage = stageById(workflow, card.stageId);
      var cardProgress = progress(card);
      root.querySelector('[data-wf-workflow-drawer-title]').textContent = card.title;
      root.querySelector('[data-wf-workflow-drawer-subtitle]').textContent = card.subtitle || 'No description provided.';
      root.querySelector('[data-wf-workflow-drawer-tags]').innerHTML = (card.tags || []).map(function (tag) { return '<span class="wf-workflow__tag">' + escapeHtml(tag) + '</span>'; }).join('');
      root.querySelector('[data-wf-workflow-drawer-stage]').textContent = stage ? stage.name : 'Unknown';
      root.querySelector('[data-wf-workflow-drawer-owner]').textContent = card.owner || 'Unassigned';
      root.querySelector('[data-wf-workflow-drawer-due]').textContent = card.due || 'None';
      stageSelect.innerHTML = workflow.stages.map(function (item) { return '<option value="' + escapeHtml(item.id) + '"' + (item.id === card.stageId ? ' selected' : '') + '>' + escapeHtml(item.name) + '</option>'; }).join('');
      root.querySelector('[data-wf-workflow-drawer-progress]').textContent = cardProgress.complete + ' of ' + cardProgress.total;
      root.querySelector('[data-wf-workflow-drawer-tasks]').innerHTML = (card.tasks || []).map(function (task, index) {
        return '<label class="wf-check"><input type="checkbox" data-wf-workflow-task="' + index + '"' + (task.done ? ' checked' : '') + '><span>' + escapeHtml(task.label) + '</span></label>';
      }).join('') || '<p class="wf-copy">No checklist items.</p>';
      root.querySelector('[data-wf-workflow-drawer-activity]').innerHTML = (card.activity || []).map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('');
    }

    function openDrawer(cardId, returnFocus) {
      selectedId = cardId;
      drawerReturnFocus = returnFocus || null;
      renderDrawer();
      drawerLayer.dataset.open = 'true';
      drawerLayer.setAttribute('aria-hidden', 'false');
      root.querySelector('[data-wf-workflow-drawer-close]').focus();
    }

    function closeDrawer() {
      drawerLayer.dataset.open = 'false';
      drawerLayer.setAttribute('aria-hidden', 'true');
      if (drawerReturnFocus && document.contains(drawerReturnFocus)) drawerReturnFocus.focus();
    }

    columns.addEventListener('click', function (event) {
      var settings = event.target.closest('[data-wf-workflow-stage-settings]');
      if (settings) {
        openStageSettings(settings.dataset.wfWorkflowStageSettings);
        return;
      }
      if (event.target.closest('[data-wf-workflow-board-add-stage]')) {
        openAddStage();
        return;
      }
      var card = event.target.closest('[data-wf-workflow-card]');
      if (card) openDrawer(card.dataset.wfWorkflowCard, card);
    });
    columns.addEventListener('keydown', function (event) {
      var stageHandle = event.target.closest('[data-wf-workflow-stage-drag]');
      if (stageHandle && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
        var stageIndex = workflow.stages.findIndex(function (stage) { return stage.id === stageHandle.dataset.wfWorkflowStageDrag; });
        var targetStage = workflow.stages[stageIndex + (event.key === 'ArrowLeft' ? -1 : 1)];
        if (targetStage) reorderStage(stageHandle.dataset.wfWorkflowStageDrag, targetStage.id);
        return;
      }
      var card = event.target.closest('[data-wf-workflow-card]');
      if (!card || !event.altKey || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      event.preventDefault();
      var current = cardById(workflow, card.dataset.wfWorkflowCard);
      var index = workflow.stages.findIndex(function (stage) { return stage.id === current.stageId; });
      var destination = workflow.stages[index + (event.key === 'ArrowLeft' ? -1 : 1)];
      if (destination) moveCard(current.id, destination.id);
    });
    columns.addEventListener('dragstart', function (event) {
      var stageHandle = event.target.closest('[data-wf-workflow-stage-drag]');
      if (stageHandle) {
        draggedStageId = stageHandle.dataset.wfWorkflowStageDrag;
        stageHandle.closest('[data-wf-workflow-column]').dataset.dragging = 'true';
        event.dataTransfer.effectAllowed = 'move';
        return;
      }
      var card = event.target.closest('[data-wf-workflow-card]');
      if (!card) return;
      draggedId = card.dataset.wfWorkflowCard;
      card.dataset.dragging = 'true';
      event.dataTransfer.effectAllowed = 'move';
    });
    columns.addEventListener('dragend', function (event) {
      var stageHandle = event.target.closest('[data-wf-workflow-stage-drag]');
      if (stageHandle) delete stageHandle.closest('[data-wf-workflow-column]').dataset.dragging;
      var card = event.target.closest('[data-wf-workflow-card]');
      if (card) delete card.dataset.dragging;
      draggedId = '';
      draggedStageId = '';
      Array.prototype.forEach.call(columns.querySelectorAll('[data-wf-workflow-column]'), function (column) { delete column.dataset.dragOver; });
    });
    columns.addEventListener('dragover', function (event) {
      var column = event.target.closest('[data-wf-workflow-column]');
      if (!column) return;
      event.preventDefault();
      column.dataset.dragOver = 'true';
    });
    columns.addEventListener('dragleave', function (event) {
      var column = event.target.closest('[data-wf-workflow-column]');
      if (column && !column.contains(event.relatedTarget)) delete column.dataset.dragOver;
    });
    columns.addEventListener('drop', function (event) {
      var column = event.target.closest('[data-wf-workflow-column]');
      if (!column || (!draggedId && !draggedStageId)) return;
      event.preventDefault();
      delete column.dataset.dragOver;
      if (draggedStageId) reorderStage(draggedStageId, column.dataset.wfWorkflowColumn);
      else moveCard(draggedId, column.dataset.wfWorkflowColumn);
    });
    search.addEventListener('input', renderBoard);
    ownerFilter.addEventListener('change', renderBoard);
    root.querySelectorAll('[data-wf-workflow-drawer-close]').forEach(function (button) { button.addEventListener('click', closeDrawer); });
    root.querySelector('[data-wf-workflow-drawer-move]').addEventListener('click', function () { moveCard(selectedId, stageSelect.value); });
    root.querySelector('[data-wf-workflow-drawer-tasks]').addEventListener('change', function (event) {
      if (!event.target.matches('[data-wf-workflow-task]')) return;
      var card = cardById(workflow, selectedId);
      card.tasks[Number(event.target.dataset.wfWorkflowTask)].done = event.target.checked;
      if (card.tasks.every(function (task) { return task.done; })) {
        card.blockedRequirements = [];
        card.blockedTargets = [];
      }
      card.activity.unshift((event.target.checked ? 'Completed: ' : 'Reopened: ') + card.tasks[Number(event.target.dataset.wfWorkflowTask)].label);
      saveWorkflow(context);
      renderBoard();
      renderDrawer();
    });
    root.querySelector('[data-wf-workflow-comment-form]').addEventListener('submit', function (event) {
      event.preventDefault();
      var input = root.querySelector('[data-wf-workflow-comment]');
      var value = input.value.trim();
      if (!value) return;
      cardById(workflow, selectedId).activity.unshift('Comment: ' + value);
      input.value = '';
      saveWorkflow(context);
      renderDrawer();
    });
    root.querySelector('[data-wf-workflow-add-card]').addEventListener('click', function () {
      root.querySelector('[data-wf-workflow-add-stage]').innerHTML = workflow.stages.map(function (stage) { return '<option value="' + escapeHtml(stage.id) + '">' + escapeHtml(stage.name) + '</option>'; }).join('');
      addForm.reset();
      addDialog.showModal();
      addForm.elements.title.focus();
    });
    root.querySelector('[data-wf-workflow-add-cancel]').addEventListener('click', function () { addDialog.close('cancel'); });
    addForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var values = new FormData(addForm);
      var title = String(values.get('title') || '').trim();
      if (!title) return;
      var id = slugify(title) + '-' + Date.now();
      var startingStage = stageById(workflow, values.get('stage'));
      workflow.cards.push({ activity: ['Card created in ' + startingStage.name], blockedRequirements: [], blockedTargets: [], due: 'Not set', id: id, owner: values.get('owner'), stageId: values.get('stage'), subtitle: values.get('subtitle'), tags: [], tasks: (startingStage.tasks || []).map(function (label) { return { done: false, label: label }; }), title: title });
      saveWorkflow(context);
      addDialog.close('confirm');
      renderBoard();
      notify('Card added', escapeHtml(title) + ' is ready on the board.');
    });
    root.querySelector('[data-wf-workflow-board-stage-cancel]').addEventListener('click', function () { stageDialog.close('cancel'); });
    root.querySelector('[data-wf-workflow-stage-task-add]').addEventListener('click', function () {
      editingStageTasks.push('');
      renderStageTasks();
      var taskInputs = stageTaskList.querySelectorAll('[data-wf-workflow-stage-task-name]');
      taskInputs[taskInputs.length - 1].focus();
    });
    stageTaskList.addEventListener('input', function (event) {
      if (!event.target.matches('[data-wf-workflow-stage-task-name]')) return;
      var row = event.target.closest('[data-wf-workflow-stage-task]');
      editingStageTasks[Number(row.dataset.wfWorkflowStageTask)] = event.target.value;
    });
    stageTaskList.addEventListener('click', function (event) {
      var remove = event.target.closest('[data-wf-workflow-stage-task-remove]');
      if (!remove) return;
      var row = remove.closest('[data-wf-workflow-stage-task]');
      editingStageTasks.splice(Number(row.dataset.wfWorkflowStageTask), 1);
      renderStageTasks();
    });
    root.querySelector('[data-wf-workflow-board-stage-remove]').addEventListener('click', function () {
      var stage = stageById(workflow, editingStageId);
      if (!stage || workflow.stages.length === 1) return;
      removingStageCardCount = workflow.cards.filter(function (card) { return card.stageId === stage.id; }).length;
      removeStageTarget.innerHTML = workflow.stages.filter(function (item) { return item.id !== stage.id; }).map(function (item) {
        return '<option value="' + escapeHtml(item.id) + '">Move cards to ' + escapeHtml(item.name) + '</option>';
      }).join('') + '<option value="__delete__">Delete cards</option>';
      root.querySelector('[data-wf-workflow-remove-stage-target-field]').hidden = removingStageCardCount === 0;
      renderRemoveStageWarning();
      stageDialog.close('remove');
      removeStageDialog.showModal();
      root.querySelector('[data-wf-workflow-remove-stage-cancel]').focus();
    });
    root.querySelector('[data-wf-workflow-remove-stage-cancel]').addEventListener('click', function () {
      removeStageDialog.close('cancel');
      openStageSettings(editingStageId);
    });
    removeStageTarget.addEventListener('change', renderRemoveStageWarning);
    removeStageForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var stage = stageById(workflow, editingStageId);
      var deletingCards = removeStageTarget.value === '__delete__';
      var destination = deletingCards ? null : stageById(workflow, removeStageTarget.value);
      if (!stage || workflow.stages.length === 1) return;
      var moved = 0;
      if (deletingCards) {
        workflow.cards = workflow.cards.filter(function (card) { return card.stageId !== stage.id; });
      } else {
        workflow.cards.forEach(function (card) {
          if (card.stageId !== stage.id || !destination) return;
          card.stageId = destination.id;
          card.activity = card.activity || [];
          card.activity.unshift('Moved from removed stage ' + stage.name + ' to ' + destination.name);
          moved += 1;
        });
      }
      workflow.stages.splice(workflow.stages.indexOf(stage), 1);
      saveWorkflow(context);
      removeStageDialog.close('confirm');
      renderBoard();
      notify('Stage removed', deletingCards
        ? removingStageCardCount + (removingStageCardCount === 1 ? ' card was' : ' cards were') + ' deleted with ' + escapeHtml(stage.name) + '.'
        : (moved ? moved + (moved === 1 ? ' card was' : ' cards were') + ' moved to ' + escapeHtml(destination.name) + '.' : escapeHtml(stage.name) + ' was removed.'));
      editingStageId = '';
    });
    stageForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = stageForm.elements.name.value.trim();
      if (!name) return;
      var stage;
      if (editingStageId) {
        stage = stageById(workflow, editingStageId);
      } else {
        var id = slugify(name);
        var suffix = 2;
        while (stageById(workflow, id)) { id = slugify(name) + '-' + suffix; suffix += 1; }
        stage = { automations: [], description: '', id: id, limit: 0, name: name, outcome: 'none', tasks: [] };
        workflow.stages.push(stage);
      }
      stage.name = name;
      stage.limit = Math.max(0, Number(stageForm.elements.limit.value) || 0);
      stage.description = stageForm.elements.description.value;
      stage.outcome = stageForm.elements.outcome.value;
      stage.tasks = editingStageTasks.map(function (task) { return task.trim(); }).filter(Boolean);
      saveWorkflow(context);
      stageDialog.close('confirm');
      renderBoard();
      notify(editingStageId ? 'Stage updated' : 'Stage added', escapeHtml(stage.name) + ' is ready on the board.');
    });
    root.querySelector('[data-wf-workflow-blocked-close]').addEventListener('click', function () { blockedDialog.close(); });
    renderBoard();
    try {
      var boardParams = new URLSearchParams(window.location.search);
      if (boardParams.get('panel') === 'settings' && stageById(workflow, boardParams.get('stage'))) openStageSettings(boardParams.get('stage'));
    } catch (error) {}
  }

  function initDesigner(root) {
    var context = loadWorkflow(root);
    var workflow = context.workflow;
    var nameInput = root.querySelector('[data-wf-workflow-name]');
    var statusInput = root.querySelector('[data-wf-workflow-status]');
    var descriptionInput = root.querySelector('[data-wf-workflow-description-input]');

    nameInput.value = workflow.name || '';
    statusInput.value = workflow.status || 'active';
    descriptionInput.value = workflow.description || '';
    nameInput.addEventListener('input', function () { workflow.name = nameInput.value; });
    statusInput.addEventListener('change', function () { workflow.status = statusInput.value; });
    descriptionInput.addEventListener('input', function () { workflow.description = descriptionInput.value; });
    root.querySelector('[data-wf-workflow-save]').addEventListener('click', function () {
      workflow.name = nameInput.value.trim() || 'Untitled workflow';
      workflow.status = statusInput.value;
      workflow.description = descriptionInput.value;
      saveWorkflow(context);
      notify('Workflow saved', 'Workflow settings are browser-local.');
    });
  }

  function initLegacyDesigner(root) {
    var context = loadWorkflow(root);
    var workflow = context.workflow;
    var stageList = root.querySelector('[data-wf-workflow-stage-list]');
    var stageDialog = root.querySelector('[data-wf-workflow-stage-dialog]');
    var stageForm = root.querySelector('[data-wf-workflow-stage-form]');
    var afterSelect = root.querySelector('[data-wf-workflow-stage-after]');
    var nameInput = root.querySelector('[data-wf-workflow-name]');
    var statusInput = root.querySelector('[data-wf-workflow-status]');
    var descriptionInput = root.querySelector('[data-wf-workflow-description-input]');
    var requestedStageId = '';
    try { requestedStageId = new URLSearchParams(window.location.search).get('stage') || ''; } catch (error) {}
    var selectedId = stageById(workflow, requestedStageId) ? requestedStageId : (workflow.stages.length ? workflow.stages[0].id : '');
    var draggedId = '';
    var properties = {};

    root.querySelectorAll('[data-wf-workflow-stage-property]').forEach(function (input) { properties[input.dataset.wfWorkflowStageProperty] = input; });
    nameInput.value = workflow.name || '';
    statusInput.value = workflow.status || 'active';
    descriptionInput.value = workflow.description || '';

    function selectedStage() {
      return stageById(workflow, selectedId);
    }

    function renderStageList() {
      stageList.innerHTML = workflow.stages.map(function (stage, index) {
        return '<article class="wf-workflow__stage-item" draggable="true" aria-selected="' + String(stage.id === selectedId) + '" data-wf-workflow-stage-item="' + escapeHtml(stage.id) + '">' +
          '<button class="wf-workflow__stage-handle" type="button" aria-label="Drag ' + escapeHtml(stage.name) + '"><span data-wf-icon="grip"></span></button>' +
          '<button class="wf-workflow__stage-select" type="button" data-wf-workflow-stage-select="' + escapeHtml(stage.id) + '">' + escapeHtml(stage.name) + '<small>' + (stage.limit ? 'Maximum ' + stage.limit : 'No card limit') + '</small></button>' +
          '<div class="wf-workflow__stage-actions"><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-workflow-stage-move="up" aria-label="Move ' + escapeHtml(stage.name) + ' up"' + (index === 0 ? ' disabled' : '') + '><span data-wf-icon="chevron-up"></span></button><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-workflow-stage-move="down" aria-label="Move ' + escapeHtml(stage.name) + ' down"' + (index === workflow.stages.length - 1 ? ' disabled' : '') + '><span data-wf-icon="chevron-down"></span></button><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-workflow-stage-delete aria-label="Delete ' + escapeHtml(stage.name) + '"' + (workflow.stages.length === 1 ? ' disabled' : '') + '><span data-wf-icon="trash"></span></button></div>' +
          '</article>';
      }).join('');
      renderIcons(root);
    }

    function renderProperties() {
      var stage = selectedStage();
      if (!stage) return;
      root.querySelector('[data-wf-workflow-stage-heading]').textContent = stage.name;
      root.querySelector('[data-wf-workflow-stage-position]').textContent = 'Stage ' + (workflow.stages.indexOf(stage) + 1);
      properties.name.value = stage.name;
      properties.limit.value = Number(stage.limit) || 0;
      properties.description.value = stage.description || '';
      properties.outcome.value = stage.outcome || 'none';
      root.querySelector('[data-wf-workflow-stage-automation-link]').href = './workflow-automation-builder.html?stage=' + encodeURIComponent(stage.id);
    }

    function renderAll() {
      if (!selectedStage() && workflow.stages.length) selectedId = workflow.stages[0].id;
      renderStageList();
      renderProperties();
    }

    function selectStage(id, focusName) {
      if (!stageById(workflow, id)) return;
      selectedId = id;
      renderAll();
      if (focusName) {
        properties.name.focus();
        properties.name.select();
      }
    }

    function moveStage(id, offset) {
      var index = workflow.stages.findIndex(function (stage) { return stage.id === id; });
      var destination = index + offset;
      if (index < 0 || destination < 0 || destination >= workflow.stages.length) return;
      var stage = workflow.stages.splice(index, 1)[0];
      workflow.stages.splice(destination, 0, stage);
      selectedId = id;
      renderAll();
    }

    function deleteStage(id) {
      if (workflow.stages.length === 1) return;
      var index = workflow.stages.findIndex(function (stage) { return stage.id === id; });
      var fallback = workflow.stages[index > 0 ? index - 1 : 1];
      workflow.cards.forEach(function (card) { if (card.stageId === id) card.stageId = fallback.id; });
      workflow.stages.splice(index, 1);
      selectedId = fallback.id;
      renderAll();
      notify('Stage removed', 'Cards from the stage were moved to ' + escapeHtml(fallback.name) + '.');
    }

    stageList.addEventListener('click', function (event) {
      var item = event.target.closest('[data-wf-workflow-stage-item]');
      if (!item) return;
      var id = item.dataset.wfWorkflowStageItem;
      var movement = event.target.closest('[data-wf-workflow-stage-move]');
      if (movement) moveStage(id, movement.dataset.wfWorkflowStageMove === 'up' ? -1 : 1);
      else if (event.target.closest('[data-wf-workflow-stage-delete]')) deleteStage(id);
      else selectStage(id, false);
    });
    stageList.addEventListener('dragstart', function (event) {
      var item = event.target.closest('[data-wf-workflow-stage-item]');
      draggedId = item ? item.dataset.wfWorkflowStageItem : '';
      if (draggedId) event.dataTransfer.effectAllowed = 'move';
    });
    stageList.addEventListener('dragover', function (event) { if (event.target.closest('[data-wf-workflow-stage-item]')) event.preventDefault(); });
    stageList.addEventListener('drop', function (event) {
      var target = event.target.closest('[data-wf-workflow-stage-item]');
      if (!target || !draggedId || target.dataset.wfWorkflowStageItem === draggedId) return;
      event.preventDefault();
      var sourceIndex = workflow.stages.findIndex(function (stage) { return stage.id === draggedId; });
      var targetIndex = workflow.stages.findIndex(function (stage) { return stage.id === target.dataset.wfWorkflowStageItem; });
      var stage = workflow.stages.splice(sourceIndex, 1)[0];
      workflow.stages.splice(targetIndex, 0, stage);
      selectedId = draggedId;
      draggedId = '';
      renderAll();
    });
    Object.keys(properties).forEach(function (key) {
      var input = properties[key];
      var eventName = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(eventName, function () {
        var stage = selectedStage();
        stage[key] = key === 'limit' ? Math.max(0, Number(input.value) || 0) : input.value;
        root.querySelector('[data-wf-workflow-stage-heading]').textContent = stage.name || 'Untitled stage';
        renderStageList();
      });
    });
    nameInput.addEventListener('input', function () {
      workflow.name = nameInput.value;
      root.querySelector('.wf-workflow__header .wf-heading').textContent = workflow.name || 'Untitled workflow';
    });
    statusInput.addEventListener('change', function () { workflow.status = statusInput.value; });
    descriptionInput.addEventListener('input', function () { workflow.description = descriptionInput.value; });
    root.querySelector('[data-wf-workflow-add-stage]').addEventListener('click', function () {
      afterSelect.innerHTML = workflow.stages.map(function (stage) { return '<option value="' + escapeHtml(stage.id) + '">' + escapeHtml(stage.name) + '</option>'; }).join('');
      afterSelect.value = selectedId;
      stageForm.reset();
      afterSelect.value = selectedId;
      stageDialog.showModal();
      stageForm.elements.name.focus();
    });
    root.querySelector('[data-wf-workflow-stage-cancel]').addEventListener('click', function () { stageDialog.close('cancel'); });
    stageForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = stageForm.elements.name.value.trim();
      if (!name) return;
      var id = slugify(name);
      var suffix = 2;
      while (stageById(workflow, id)) { id = slugify(name) + '-' + suffix; suffix += 1; }
      var afterIndex = workflow.stages.findIndex(function (stage) { return stage.id === afterSelect.value; });
      workflow.stages.splice(afterIndex + 1, 0, { description: '', id: id, limit: 0, name: name, outcome: 'none' });
      selectedId = id;
      stageDialog.close('confirm');
      renderAll();
      properties.name.focus();
    });
    root.querySelector('[data-wf-workflow-save]').addEventListener('click', function () {
      workflow.name = nameInput.value.trim() || 'Untitled workflow';
      workflow.status = statusInput.value;
      workflow.description = descriptionInput.value;
      saveWorkflow(context);
      notify('Workflow saved', workflow.stages.length + ' ordered stages are browser-local.');
    });
    renderAll();
  }

  function initAutomation(root) {
    var data = parseData(root);
    var context = loadWorkflow(root);
    var workflow = context.workflow;
    var defaultRule = { actions: [], conditionLogic: 'all', conditions: [], id: '', name: 'Untitled automation', runOnce: true, status: 'draft', stopOnFailure: true, timing: { type: 'immediate' }, trigger: { type: 'stage-entered' } };
    var rule = clone(data.rule || defaultRule);
    var requestedStageId = '';
    var requestedAutomationId = '';
    var isNewAutomation = false;
    try {
      var automationParams = new URLSearchParams(window.location.search);
      requestedStageId = automationParams.get('stage') || '';
      requestedAutomationId = automationParams.get('automation') || '';
      isNewAutomation = automationParams.get('mode') === 'new';
    } catch (error) {}
    var automationStage = stageById(workflow, requestedStageId) || stageById(workflow, rule.stageId) || workflow.stages[0] || { id: 'stage', name: 'Stage' };
    automationStage.automations = automationStage.automations || [];
    var automationSummary = requestedAutomationId
      ? automationStage.automations.find(function (automation) { return automation.id === requestedAutomationId; })
      : automationStage.automations[0];
    if (isNewAutomation) {
      rule = clone(defaultRule);
      automationSummary = null;
    } else if (automationSummary) {
      rule.id = automationSummary.id;
      rule.name = automationSummary.name;
      rule.status = automationSummary.status || rule.status;
    }
    var automationKey = data.storageKey + '-stage-' + automationStage.id + '-automation-' + (rule.id || requestedAutomationId || 'new');
    if (!isNewAutomation) {
      try { rule = Object.assign(rule, JSON.parse(sessionStorage.getItem(automationKey)) || {}); } catch (error) {}
    }
    rule.stageId = automationStage.id;
    rule.actions = rule.actions || [];
    rule.conditions = rule.conditions || [];
    rule.trigger = rule.trigger || { type: 'manual' };
    rule.timing = rule.timing || { type: 'immediate' };
    var triggerInput = root.querySelector('[data-wf-automation-trigger]');
    var triggerConfig = root.querySelector('[data-wf-automation-trigger-config]');
    var conditionList = root.querySelector('[data-wf-automation-condition-list]');
    var timingInput = root.querySelector('[data-wf-automation-timing]');
    var timingConfig = root.querySelector('[data-wf-automation-timing-config]');
    var actionList = root.querySelector('[data-wf-automation-action-list]');
    var actionDialog = root.querySelector('[data-wf-automation-action-dialog]');
    var actionForm = root.querySelector('[data-wf-automation-action-form]');
    var actionType = root.querySelector('[data-wf-automation-action-type]');
    var actionConfig = root.querySelector('[data-wf-automation-action-config]');
    var testDialog = root.querySelector('[data-wf-automation-test-dialog]');
    var editingAction = -1;
    var draggedAction = -1;
    var sampleCard = workflow.cards.find(function (card) { return card.stageId === automationStage.id; }) || workflow.cards[0] || { owner: 'Example owner', title: 'Sample card' };

    root.querySelector('[data-wf-automation-stage-name]').textContent = automationStage.name;
    root.querySelector('[data-wf-automation-stage-settings-link]').href = './workflow-board.html?stage=' + encodeURIComponent(automationStage.id) + '&panel=settings';
    root.querySelector('[data-wf-automation-preview-card]').textContent = sampleCard.title;
    root.querySelector('[data-wf-automation-preview-card-meta]').textContent = (sampleCard.owner || 'Unassigned') + ' · ' + automationStage.name;

    function stageOptions(selected) {
      return workflow.stages.map(function (stage) { return '<option value="' + escapeHtml(stage.name) + '"' + (stage.name === selected ? ' selected' : '') + '>' + escapeHtml(stage.name) + '</option>'; }).join('');
    }

    function triggerPhrase() {
      if (rule.trigger.type === 'card-created') return 'a card is created in ' + automationStage.name;
      if (rule.trigger.type === 'stage-entered') return 'a card enters ' + automationStage.name;
      if (rule.trigger.type === 'stage-left') return 'a card leaves ' + automationStage.name;
      if (rule.trigger.type === 'due-approaching') return 'a due date for a card in ' + automationStage.name + ' is ' + (rule.trigger.amount || 1) + ' ' + (rule.trigger.unit || 'day') + (Number(rule.trigger.amount || 1) === 1 ? '' : 's') + ' away';
      return 'the rule is run manually for ' + automationStage.name;
    }

    function conditionPhrase(condition) {
      return condition.field + ' ' + condition.operator + (condition.operator === 'is empty' || condition.operator === 'is not empty' ? '' : ' “' + condition.value + '”');
    }

    function timingPhrase() {
      if (rule.timing.type === 'delay') return 'after ' + (rule.timing.amount || 1) + ' ' + (rule.timing.unit || 'hour') + (Number(rule.timing.amount || 1) === 1 ? '' : 's');
      if (rule.timing.type === 'date-field') return (Number(rule.timing.offset || 0) || 0) + ' days from ' + (rule.timing.field || 'Due date');
      return 'immediately';
    }

    function actionName(action) {
      return { assign: 'Assign card owner', comment: 'Add comment', field: 'Update card field', move: 'Move card to stage', notify: 'Send notification', tag: 'Add tag', task: 'Create task', workflow: 'Start another workflow' }[action.type] || 'Action';
    }

    function actionPhrase(action) {
      if (action.type === 'field') return 'set ' + (action.field || 'field') + ' to “' + (action.value || '') + '”';
      var verbs = { assign: 'assign to ', comment: 'comment “', move: 'move to ', notify: 'notify ', tag: 'add tag “', task: 'create task “', workflow: 'start workflow ' };
      var suffix = ['comment', 'tag', 'task'].indexOf(action.type) !== -1 ? '”' : '';
      return (verbs[action.type] || '') + (action.value || action.detail || 'not configured') + suffix;
    }

    function ruleSummary() {
      var copy = 'When ' + triggerPhrase();
      if (rule.conditions.length) copy += ', if ' + rule.conditions.map(conditionPhrase).join(rule.conditionLogic === 'any' ? ' or ' : ' and ');
      copy += ', ' + timingPhrase() + ', ';
      copy += rule.actions.length ? rule.actions.map(actionPhrase).join(', then ') : 'no actions configured';
      return copy.charAt(0).toUpperCase() + copy.slice(1) + '.';
    }

    function renderPreview() {
      var summary = ruleSummary();
      root.querySelector('[data-wf-automation-preview-summary]').textContent = summary;
      root.querySelector('[data-wf-automation-preview-actions]').innerHTML = rule.actions.map(function (action) { return '<li>' + escapeHtml(actionPhrase(action)) + '</li>'; }).join('') || '<li>No actions configured</li>';
    }

    function renderTriggerConfig() {
      if (rule.trigger.type === 'due-approaching') {
        triggerConfig.innerHTML = '<div class="wf-workflow__timing-fields"><label class="wf-field"><span class="wf-label">Amount</span><input class="wf-input" type="number" min="1" value="' + escapeHtml(rule.trigger.amount || 1) + '" data-wf-automation-trigger-amount></label><label class="wf-field"><span class="wf-label">Unit</span><select class="wf-select" data-wf-automation-trigger-unit><option value="hour"' + (rule.trigger.unit === 'hour' ? ' selected' : '') + '>Hours</option><option value="day"' + (rule.trigger.unit !== 'hour' ? ' selected' : '') + '>Days</option></select></label></div>';
      } else {
        triggerConfig.innerHTML = '<p class="wf-copy">This trigger is scoped to <strong>' + escapeHtml(automationStage.name) + '</strong>.</p>';
      }
    }

    function renderTimingConfig() {
      if (rule.timing.type === 'delay') {
        timingConfig.innerHTML = '<div class="wf-workflow__timing-fields"><label class="wf-field"><span class="wf-label">Delay</span><input class="wf-input" type="number" min="1" value="' + escapeHtml(rule.timing.amount || 1) + '" data-wf-automation-timing-amount></label><label class="wf-field"><span class="wf-label">Unit</span><select class="wf-select" data-wf-automation-timing-unit><option value="minute"' + (rule.timing.unit === 'minute' ? ' selected' : '') + '>Minutes</option><option value="hour"' + (rule.timing.unit !== 'minute' && rule.timing.unit !== 'day' ? ' selected' : '') + '>Hours</option><option value="day"' + (rule.timing.unit === 'day' ? ' selected' : '') + '>Days</option></select></label></div>';
      } else if (rule.timing.type === 'date-field') {
        timingConfig.innerHTML = '<div class="wf-workflow__timing-fields"><label class="wf-field"><span class="wf-label">Date field</span><select class="wf-select" data-wf-automation-timing-field><option' + (rule.timing.field === 'Due date' ? ' selected' : '') + '>Due date</option><option' + (rule.timing.field === 'Start date' ? ' selected' : '') + '>Start date</option><option' + (rule.timing.field === 'Review date' ? ' selected' : '') + '>Review date</option></select></label><label class="wf-field"><span class="wf-label">Day offset</span><input class="wf-input" type="number" value="' + escapeHtml(rule.timing.offset || 0) + '" data-wf-automation-timing-offset><span class="wf-help">Use a negative number to run before.</span></label></div>';
      } else {
        timingConfig.innerHTML = '<p class="wf-copy">Actions run as soon as the trigger and conditions match.</p>';
      }
    }

    function renderConditions() {
      conditionList.innerHTML = rule.conditions.map(function (condition, index) {
        var operators = ['is', 'is not', 'contains', 'does not contain', 'is empty', 'is not empty'];
        return '<div class="wf-workflow__condition-row" data-wf-automation-condition="' + index + '"><label class="wf-field"><span class="wf-label">Field</span><select class="wf-select" data-wf-automation-condition-property="field"><option' + (condition.field === 'Priority' ? ' selected' : '') + '>Priority</option><option' + (condition.field === 'Owner' ? ' selected' : '') + '>Owner</option><option' + (condition.field === 'Tag' ? ' selected' : '') + '>Tag</option><option' + (condition.field === 'Stage' ? ' selected' : '') + '>Stage</option><option' + (condition.field === 'Due date' ? ' selected' : '') + '>Due date</option></select></label><label class="wf-field"><span class="wf-label">Operator</span><select class="wf-select" data-wf-automation-condition-property="operator">' + operators.map(function (operator) { return '<option' + (condition.operator === operator ? ' selected' : '') + '>' + operator + '</option>'; }).join('') + '</select></label><label class="wf-field"><span class="wf-label">Value</span><input class="wf-input" value="' + escapeHtml(condition.value) + '" data-wf-automation-condition-property="value"' + (condition.operator === 'is empty' || condition.operator === 'is not empty' ? ' disabled' : '') + '></label><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-automation-remove-condition aria-label="Remove condition"><span data-wf-icon="trash"></span></button></div>';
      }).join('');
      root.querySelector('[data-wf-automation-condition-empty]').hidden = rule.conditions.length > 0;
      renderIcons(root);
    }

    function renderActions() {
      actionList.innerHTML = rule.actions.map(function (action, index) {
        return '<article class="wf-workflow__action-row" draggable="true" data-wf-automation-action="' + index + '"><button class="wf-workflow__action-handle" type="button" aria-label="Drag action ' + (index + 1) + '"><span data-wf-icon="grip"></span></button><div class="wf-workflow__action-row__copy"><strong>' + (index + 1) + '. ' + escapeHtml(actionName(action)) + '</strong><small>' + escapeHtml(actionPhrase(action)) + '</small></div><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-automation-move-action="up" aria-label="Move action up"' + (index === 0 ? ' disabled' : '') + '><span data-wf-icon="chevron-up"></span></button><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-automation-move-action="down" aria-label="Move action down"' + (index === rule.actions.length - 1 ? ' disabled' : '') + '><span data-wf-icon="chevron-down"></span></button><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-automation-edit-action aria-label="Edit action"><span data-wf-icon="edit"></span></button><button class="wf-button wf-button--ghost wf-icon-button" type="button" data-wf-automation-remove-action aria-label="Remove action"><span data-wf-icon="trash"></span></button></article>';
      }).join('');
      root.querySelector('[data-wf-automation-actions-error]').hidden = rule.actions.length > 0;
      renderIcons(root);
      renderPreview();
    }

    function renderActionConfig(action) {
      var type = actionType.value;
      if (type === 'move') actionConfig.innerHTML = '<label class="wf-field"><span class="wf-label">Destination stage</span><select class="wf-select" data-wf-automation-action-value required>' + stageOptions(action.value) + '</select></label>';
      else if (type === 'notify') actionConfig.innerHTML = '<label class="wf-field"><span class="wf-label">Recipient or team</span><input class="wf-input" value="' + escapeHtml(action.value || '') + '" placeholder="Editorial team" data-wf-automation-action-value required></label>';
      else if (type === 'assign') actionConfig.innerHTML = '<label class="wf-field"><span class="wf-label">Owner</span><input class="wf-input" value="' + escapeHtml(action.value || '') + '" placeholder="Person or team" data-wf-automation-action-value required></label>';
      else if (type === 'field') actionConfig.innerHTML = '<div class="wf-workflow__action-config-fields"><label class="wf-field"><span class="wf-label">Field</span><select class="wf-select" data-wf-automation-action-field><option' + (action.field === 'Priority' ? ' selected' : '') + '>Priority</option><option' + (action.field === 'Due date' ? ' selected' : '') + '>Due date</option><option' + (action.field === 'Status' ? ' selected' : '') + '>Status</option></select></label><label class="wf-field"><span class="wf-label">New value</span><input class="wf-input" value="' + escapeHtml(action.value || '') + '" data-wf-automation-action-value required></label></div>';
      else {
        var labels = { comment: 'Comment', tag: 'Tag', task: 'Task title', workflow: 'Workflow name' };
        actionConfig.innerHTML = '<label class="wf-field"><span class="wf-label">' + labels[type] + '</span><input class="wf-input" value="' + escapeHtml(action.value || '') + '" data-wf-automation-action-value required></label>';
      }
    }

    function openAction(index) {
      editingAction = typeof index === 'number' ? index : -1;
      var action = editingAction >= 0 ? rule.actions[editingAction] : { type: 'notify', value: '' };
      actionType.value = action.type;
      root.querySelector('[data-wf-automation-action-title]').textContent = editingAction >= 0 ? 'Edit action' : 'Add action';
      root.querySelector('[data-wf-automation-action-submit]').textContent = editingAction >= 0 ? 'Save action' : 'Add action';
      renderActionConfig(action);
      actionDialog.showModal();
    }

    function moveAction(index, offset) {
      var destination = index + offset;
      if (destination < 0 || destination >= rule.actions.length) return;
      var action = rule.actions.splice(index, 1)[0];
      rule.actions.splice(destination, 0, action);
      renderActions();
    }

    triggerInput.value = rule.trigger.type;
    timingInput.value = rule.timing.type;
    root.querySelector('[data-wf-automation-name]').value = rule.name;
    root.querySelector('[data-wf-automation-status]').value = rule.status;
    root.querySelector('[data-wf-automation-condition-logic]').value = rule.conditionLogic;
    root.querySelector('[data-wf-automation-run-once]').checked = Boolean(rule.runOnce);
    root.querySelector('[data-wf-automation-stop-failure]').checked = Boolean(rule.stopOnFailure);

    triggerInput.addEventListener('change', function () {
      rule.trigger = { type: triggerInput.value };
      if (rule.trigger.type === 'due-approaching') { rule.trigger.amount = 1; rule.trigger.unit = 'day'; }
      renderTriggerConfig();
      renderPreview();
    });
    triggerConfig.addEventListener('input', function (event) {
      if (event.target.matches('[data-wf-automation-trigger-value]')) rule.trigger.value = event.target.value;
      if (event.target.matches('[data-wf-automation-trigger-amount]')) rule.trigger.amount = Math.max(1, Number(event.target.value) || 1);
      if (event.target.matches('[data-wf-automation-trigger-unit]')) rule.trigger.unit = event.target.value;
      renderPreview();
    });
    triggerConfig.addEventListener('change', function (event) {
      if (event.target.matches('[data-wf-automation-trigger-value]')) rule.trigger.value = event.target.value;
      if (event.target.matches('[data-wf-automation-trigger-unit]')) rule.trigger.unit = event.target.value;
      renderPreview();
    });
    root.querySelector('[data-wf-automation-condition-logic]').addEventListener('change', function (event) { rule.conditionLogic = event.target.value; renderPreview(); });
    root.querySelector('[data-wf-automation-add-condition]').addEventListener('click', function () {
      rule.conditions.push({ field: 'Priority', operator: 'is', value: '' });
      renderConditions();
      renderPreview();
    });
    conditionList.addEventListener('input', function (event) {
      var row = event.target.closest('[data-wf-automation-condition]');
      if (!row || !event.target.matches('[data-wf-automation-condition-property]')) return;
      rule.conditions[Number(row.dataset.wfAutomationCondition)][event.target.dataset.wfAutomationConditionProperty] = event.target.value;
      renderPreview();
    });
    conditionList.addEventListener('change', function (event) {
      var row = event.target.closest('[data-wf-automation-condition]');
      if (!row || !event.target.matches('[data-wf-automation-condition-property]')) return;
      rule.conditions[Number(row.dataset.wfAutomationCondition)][event.target.dataset.wfAutomationConditionProperty] = event.target.value;
      renderConditions();
      renderPreview();
    });
    conditionList.addEventListener('click', function (event) {
      var button = event.target.closest('[data-wf-automation-remove-condition]');
      if (!button) return;
      var row = button.closest('[data-wf-automation-condition]');
      rule.conditions.splice(Number(row.dataset.wfAutomationCondition), 1);
      renderConditions();
      renderPreview();
    });
    timingInput.addEventListener('change', function () {
      rule.timing = { type: timingInput.value };
      if (rule.timing.type === 'delay') { rule.timing.amount = 1; rule.timing.unit = 'hour'; }
      if (rule.timing.type === 'date-field') { rule.timing.field = 'Due date'; rule.timing.offset = 0; }
      renderTimingConfig();
      renderPreview();
    });
    timingConfig.addEventListener('input', function (event) {
      if (event.target.matches('[data-wf-automation-timing-amount]')) rule.timing.amount = Math.max(1, Number(event.target.value) || 1);
      if (event.target.matches('[data-wf-automation-timing-unit]')) rule.timing.unit = event.target.value;
      if (event.target.matches('[data-wf-automation-timing-field]')) rule.timing.field = event.target.value;
      if (event.target.matches('[data-wf-automation-timing-offset]')) rule.timing.offset = Number(event.target.value) || 0;
      renderPreview();
    });
    timingConfig.addEventListener('change', function (event) {
      if (event.target.matches('[data-wf-automation-timing-unit]')) rule.timing.unit = event.target.value;
      if (event.target.matches('[data-wf-automation-timing-field]')) rule.timing.field = event.target.value;
      renderPreview();
    });
    root.querySelector('[data-wf-automation-add-action]').addEventListener('click', function () { openAction(); });
    actionType.addEventListener('change', function () { renderActionConfig({ type: actionType.value, value: '' }); });
    root.querySelector('[data-wf-automation-action-cancel]').addEventListener('click', function () { actionDialog.close('cancel'); });
    actionForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var valueInput = actionConfig.querySelector('[data-wf-automation-action-value]');
      var fieldInput = actionConfig.querySelector('[data-wf-automation-action-field]');
      if (!valueInput || !valueInput.value.trim()) {
        if (valueInput) valueInput.focus();
        return;
      }
      var action = { detail: valueInput ? valueInput.value.trim() : '', type: actionType.value, value: valueInput ? valueInput.value.trim() : '' };
      if (fieldInput) action.field = fieldInput.value;
      if (editingAction >= 0) rule.actions[editingAction] = action;
      else rule.actions.push(action);
      actionDialog.close('confirm');
      renderActions();
    });
    actionList.addEventListener('click', function (event) {
      var row = event.target.closest('[data-wf-automation-action]');
      if (!row) return;
      var index = Number(row.dataset.wfAutomationAction);
      var movement = event.target.closest('[data-wf-automation-move-action]');
      if (movement) moveAction(index, movement.dataset.wfAutomationMoveAction === 'up' ? -1 : 1);
      else if (event.target.closest('[data-wf-automation-edit-action]')) openAction(index);
      else if (event.target.closest('[data-wf-automation-remove-action]')) { rule.actions.splice(index, 1); renderActions(); }
    });
    actionList.addEventListener('dragstart', function (event) {
      var row = event.target.closest('[data-wf-automation-action]');
      if (!row) return;
      draggedAction = Number(row.dataset.wfAutomationAction);
      row.dataset.dragging = 'true';
      event.dataTransfer.effectAllowed = 'move';
    });
    actionList.addEventListener('dragend', function (event) {
      var row = event.target.closest('[data-wf-automation-action]');
      if (row) delete row.dataset.dragging;
      draggedAction = -1;
    });
    actionList.addEventListener('dragover', function (event) { if (event.target.closest('[data-wf-automation-action]')) event.preventDefault(); });
    actionList.addEventListener('drop', function (event) {
      var row = event.target.closest('[data-wf-automation-action]');
      if (!row || draggedAction < 0) return;
      event.preventDefault();
      var targetIndex = Number(row.dataset.wfAutomationAction);
      var action = rule.actions.splice(draggedAction, 1)[0];
      rule.actions.splice(targetIndex, 0, action);
      draggedAction = -1;
      renderActions();
    });
    root.querySelector('[data-wf-automation-name]').addEventListener('input', function (event) {
      rule.name = event.target.value;
    });
    root.querySelector('[data-wf-automation-status]').addEventListener('change', function (event) { rule.status = event.target.value; });
    root.querySelector('[data-wf-automation-run-once]').addEventListener('change', function (event) { rule.runOnce = event.target.checked; });
    root.querySelector('[data-wf-automation-stop-failure]').addEventListener('change', function (event) { rule.stopOnFailure = event.target.checked; });
    root.querySelector('[data-wf-automation-save]').addEventListener('click', function () {
      rule.name = root.querySelector('[data-wf-automation-name]').value.trim() || 'Untitled automation';
      if (!rule.actions.length) {
        root.querySelector('[data-wf-automation-actions-error]').hidden = false;
        root.querySelector('[data-wf-automation-add-action]').focus();
        return;
      }
      if (!rule.id) {
        var baseId = slugify(rule.name);
        var candidate = baseId;
        var suffix = 2;
        while (automationStage.automations.some(function (automation) { return automation.id === candidate; })) {
          candidate = baseId + '-' + suffix;
          suffix += 1;
        }
        rule.id = candidate;
      }
      var existing = automationStage.automations.find(function (automation) { return automation.id === rule.id; });
      if (existing) {
        existing.name = rule.name;
        existing.status = rule.status;
      } else {
        automationStage.automations.push({ id: rule.id, name: rule.name, status: rule.status });
      }
      saveWorkflow(context);
      automationKey = data.storageKey + '-stage-' + automationStage.id + '-automation-' + rule.id;
      try { sessionStorage.setItem(automationKey, JSON.stringify(rule)); } catch (error) {}
      notify('Automation saved', escapeHtml(rule.name) + ' is browser-local.');
    });
    root.querySelector('[data-wf-automation-test]').addEventListener('click', function () {
      root.querySelector('[data-wf-automation-test-body]').innerHTML = '<div class="wf-stack"><p class="wf-copy">Using the sample card <strong>' + escapeHtml(sampleCard.title) + '</strong>:</p><p>' + escapeHtml(ruleSummary()) + '</p><ol>' + rule.actions.map(function (action) { return '<li>' + escapeHtml(actionPhrase(action)) + '</li>'; }).join('') + '</ol><p class="wf-help">This test previews the result and does not change workflow data.</p></div>';
      testDialog.showModal();
    });
    root.querySelector('[data-wf-automation-test-close]').addEventListener('click', function () { testDialog.close(); });
    renderTriggerConfig();
    renderTimingConfig();
    renderConditions();
    renderActions();
  }

  function init(root) {
    root = root || document;
    Array.prototype.forEach.call(root.querySelectorAll('[data-wf-workflow-board]'), function (board) {
      if (board.dataset.wfWorkflowReady) return;
      board.dataset.wfWorkflowReady = 'true';
      initBoard(board);
    });
    Array.prototype.forEach.call(root.querySelectorAll('[data-wf-workflow-designer]'), function (designer) {
      if (designer.dataset.wfWorkflowReady) return;
      designer.dataset.wfWorkflowReady = 'true';
      initDesigner(designer);
    });
    Array.prototype.forEach.call(root.querySelectorAll('[data-wf-workflow-automation]'), function (automation) {
      if (automation.dataset.wfWorkflowReady) return;
      automation.dataset.wfWorkflowReady = 'true';
      initAutomation(automation);
    });
  }

  window.WireframeWorkflow = { init: init };
})();
