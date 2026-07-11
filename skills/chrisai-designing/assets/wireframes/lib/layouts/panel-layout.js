(function () {
  var desktopQuery = window.matchMedia('(min-width: 992px)');

  /** Return the active width range, preserving the mobile header toggle strip. */
  function getWidthRange(shell) {
    var styles = window.getComputedStyle(shell);
    var minimum = parseFloat(styles.getPropertyValue('--wf-panel-min-width')) || 220;
    var maximum = parseFloat(styles.getPropertyValue('--wf-panel-max-width')) || 480;
    if (!desktopQuery.matches) {
      maximum = Math.min(maximum, Math.max(0, shell.getBoundingClientRect().width - 56));
      minimum = Math.min(minimum, maximum);
    }
    return { minimum: minimum, maximum: maximum };
  }

  /** Return the panel element for one side of a shell. */
  function getPanel(shell, side) {
    return shell.querySelector('.wf-shell__' + side);
  }

  /** Synchronize panel accessibility and its toggle with shell state. */
  function syncPanelState(shell, side, isOpen) {
    var panel = getPanel(shell, side);
    var toggle = shell.querySelector('[data-wf-panel-toggle="' + side + '"]');
    if (toggle) toggle.setAttribute('aria-expanded', String(isOpen));
    if (!panel) return;
    panel.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) panel.removeAttribute('inert');
    else panel.setAttribute('inert', '');
  }

  /** Set one panel's open state and keep mobile overlays mutually exclusive. */
  function setPanelOpen(shell, side, isOpen) {
    var otherSide = side === 'left' ? 'right' : 'left';
    shell.setAttribute('data-wf-' + side + '-open', String(isOpen));
    syncPanelState(shell, side, isOpen);

    if (!desktopQuery.matches && isOpen) {
      shell.setAttribute('data-wf-' + otherSide + '-open', 'false');
      syncPanelState(shell, otherSide, false);
    }
  }

  /** Update a panel width token and its separator value. */
  function setPanelWidth(shell, side, width) {
    var range = getWidthRange(shell);
    var value = Math.round(Math.min(range.maximum, Math.max(range.minimum, width)));
    var property = '--wf-' + side + '-panel-width';
    var handle = shell.querySelector('[data-wf-panel-resize="' + side + '"]');
    shell.style.setProperty(property, value + 'px');
    if (handle) {
      handle.setAttribute('aria-valuemin', String(Math.round(range.minimum)));
      handle.setAttribute('aria-valuemax', String(Math.round(range.maximum)));
      handle.setAttribute('aria-valuenow', String(value));
    }
  }

  /** Close the right overlay when a narrow screen starts with both panels open. */
  function normalizeMobileState(shell) {
    var isLeftOpen = shell.getAttribute('data-wf-left-open') !== 'false';
    var isRightOpen = shell.getAttribute('data-wf-right-open') !== 'false';
    if (!desktopQuery.matches && isLeftOpen && isRightOpen) {
      setPanelOpen(shell, 'right', false);
    }
  }

  /** Begin pointer-driven resizing for one panel. */
  function startResize(shell, handle, event) {
    var side = handle.getAttribute('data-wf-panel-resize');
    var previousCursor = document.documentElement.style.cursor;
    event.preventDefault();
    shell.setAttribute('data-wf-resizing', side);
    document.documentElement.style.cursor = 'col-resize';

    /** Apply the pointer position to the active panel token. */
    function movePanel(moveEvent) {
      var bounds = shell.getBoundingClientRect();
      var width = side === 'left'
        ? moveEvent.clientX - bounds.left
        : bounds.right - moveEvent.clientX;
      setPanelWidth(shell, side, width);
    }

    /** End the resize session and restore document behavior. */
    function stopResize() {
      shell.removeAttribute('data-wf-resizing');
      document.documentElement.style.cursor = previousCursor;
      document.removeEventListener('pointermove', movePanel);
      document.removeEventListener('pointerup', stopResize);
      document.removeEventListener('pointercancel', stopResize);
    }

    document.addEventListener('pointermove', movePanel);
    document.addEventListener('pointerup', stopResize);
    document.addEventListener('pointercancel', stopResize);
  }

  /** Resize a panel from its keyboard-accessible separator. */
  function resizeWithKeyboard(shell, handle, event) {
    var side = handle.getAttribute('data-wf-panel-resize');
    var panel = getPanel(shell, side);
    if (!panel) return;
    var width = panel.getBoundingClientRect().width;
    var delta = 0;

    if (event.key === 'Home') width = 0;
    if (event.key === 'End') width = Number.MAX_SAFE_INTEGER;
    if (event.key === 'ArrowLeft') delta = side === 'left' ? -16 : 16;
    if (event.key === 'ArrowRight') delta = side === 'left' ? 16 : -16;
    if (!delta && event.key !== 'Home' && event.key !== 'End') return;

    event.preventDefault();
    setPanelWidth(shell, side, width + delta);
  }

  /** Initialize toggling and optional resizing for one panel shell. */
  function initShell(shell) {
    if (shell.hasAttribute('data-wf-panel-ready')) return;
    shell.setAttribute('data-wf-panel-ready', '');
    syncPanelState(shell, 'left', shell.getAttribute('data-wf-left-open') !== 'false');
    syncPanelState(shell, 'right', shell.getAttribute('data-wf-right-open') !== 'false');
    normalizeMobileState(shell);

    shell.addEventListener('click', function (event) {
      var toggle = event.target.closest('[data-wf-panel-toggle]');
      if (!toggle) return;
      var side = toggle.getAttribute('data-wf-panel-toggle');
      var isOpen = shell.getAttribute('data-wf-' + side + '-open') !== 'false';
      setPanelOpen(shell, side, !isOpen);
    });

    shell.addEventListener('pointerdown', function (event) {
      var handle = event.target.closest('[data-wf-panel-resize]');
      if (handle) startResize(shell, handle, event);
    });

    shell.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !desktopQuery.matches) {
        setPanelOpen(shell, 'left', false);
        setPanelOpen(shell, 'right', false);
        return;
      }
      var handle = event.target.closest('[data-wf-panel-resize]');
      if (handle) resizeWithKeyboard(shell, handle, event);
    });

    desktopQuery.addEventListener('change', function () {
      normalizeMobileState(shell);
    });
  }

  /** Initialize all panel layouts below a root node. */
  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-panel-layout]'), initShell);
  }

  window.WireframePanelLayout = {
    init: init,
    setPanelOpen: setPanelOpen,
    setPanelWidth: setPanelWidth
  };
})();
