(function () {
  var toggleCommands = ['bold', 'italic', 'underline'];

  function run(editor, command) {
    editor.focus();
    var value = command === 'createLink' ? '#' : null;
    document.execCommand(command, false, value);
    var shell = editor.closest('[data-wf-wysiwyg]');
    Array.prototype.forEach.call(shell.querySelectorAll('[data-wf-editor-command]'), function (button) {
      var name = button.dataset.wfEditorCommand;
      if (toggleCommands.indexOf(name) !== -1) button.setAttribute('aria-pressed', String(document.queryCommandState(name)));
    });
  }

  function init(root) {
    root = root || document;
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-wf-editor-command]');
      if (!button) return;
      var editor = button.closest('[data-wf-wysiwyg]').querySelector('[data-wf-editor-content]');
      run(editor, button.dataset.wfEditorCommand);
    });
  }

  window.WireframeWysiwyg = { init: init, run: run };
})();
