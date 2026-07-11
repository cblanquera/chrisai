(function () {
  var dialogOpeners = new WeakMap();
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /** Return whether a dialog uses an animated sheet variant. */
  function isSheet(dialog) {
    return dialog.classList.contains('wf-dialog--sheet');
  }

  /** Close a dialog immediately and return focus to its opener. */
  function finishClose(dialog, value) {
    var opener = dialogOpeners.get(dialog);
    dialog.removeAttribute('data-wf-dialog-opening');
    dialog.removeAttribute('data-wf-dialog-closing');
    dialog.close(value || '');
    if (opener && typeof opener.focus === 'function') opener.focus();
  }

  /** Open a dialog, starting optional sheet motion from its resting edge. */
  function openDialog(dialog, opener) {
    if (!dialog || typeof dialog.showModal !== 'function' || dialog.open) return;
    dialogOpeners.set(dialog, opener);
    if (!isSheet(dialog) || reducedMotion.matches) {
      dialog.showModal();
      return;
    }
    dialog.setAttribute('data-wf-dialog-opening', '');
    dialog.showModal();
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        dialog.removeAttribute('data-wf-dialog-opening');
      });
    });
  }

  /** Close a dialog after its optional sheet exit motion completes. */
  function closeDialog(dialog, value) {
    if (!dialog || !dialog.open) return;
    if (!isSheet(dialog) || reducedMotion.matches) {
      finishClose(dialog, value);
      return;
    }
    var didFinish = false;
    dialog.setAttribute('data-wf-dialog-closing', '');

    /** Finish once after either transition completion or its safety timeout. */
    function finish() {
      if (didFinish) return;
      didFinish = true;
      dialog.removeEventListener('transitionend', onTransitionEnd);
      finishClose(dialog, value);
    }

    /** Accept only the sheet dialog's transform transition. */
    function onTransitionEnd(event) {
      if (event.target === dialog && event.propertyName === 'transform') finish();
    }

    dialog.addEventListener('transitionend', onTransitionEnd);
    window.setTimeout(finish, 320);
  }

  /** Bind cancellation behavior once for each dialog below a root node. */
  function bindDialogs(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('dialog.wf-dialog'), function (dialog) {
      if (dialog.hasAttribute('data-wf-dialog-ready')) return;
      dialog.setAttribute('data-wf-dialog-ready', '');
      dialog.addEventListener('cancel', function (event) {
        if (!isSheet(dialog) || reducedMotion.matches) return;
        event.preventDefault();
        closeDialog(dialog, 'cancel');
      });
    });
  }

  /** Initialize dialog open, close, and optional backdrop interactions. */
  function init(root) {
    root = root || document;
    bindDialogs(root);
    root.addEventListener('click', function (event) {
      var open = event.target.closest('[data-wf-dialog-open]');
      var close = event.target.closest('[data-wf-dialog-close]');
      if (open) {
        openDialog(document.querySelector(open.getAttribute('data-wf-dialog-open')), open);
        return;
      }
      if (close) {
        closeDialog(close.closest('dialog'), close.value || '');
        return;
      }
      if (event.target.matches('dialog[data-wf-dialog-backdrop-close]')) {
        closeDialog(event.target, 'backdrop');
      }
    });
  }

  window.WireframeDialog = {
    close: closeDialog,
    init: init,
    open: openDialog
  };
})();
