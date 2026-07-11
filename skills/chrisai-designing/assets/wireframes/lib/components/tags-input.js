(function () {
  function addTag(field, value) {
    value = value.trim().replace(/,$/, '');
    if (!value) return;
    var items = field.querySelector('[data-wf-tags-items]');
    var tag = document.createElement('span');
    tag.className = 'wf-tags-input__tag';
    tag.textContent = value;
    var button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-wf-tag-remove', '');
    button.setAttribute('aria-label', 'Remove ' + value);
    button.innerHTML = window.WireframeIcons ? window.WireframeIcons.svg('close') : '';
    tag.appendChild(button);
    items.appendChild(tag);
  }

  function init(root) {
    root = root || document;
    root.addEventListener('keydown', function (event) {
      if (!event.target.matches('[data-wf-tags-input]')) return;
      if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        addTag(event.target.closest('[data-wf-tags]'), event.target.value);
        event.target.value = '';
      } else if (event.key === 'Backspace' && !event.target.value) {
        var tags = event.target.closest('[data-wf-tags]').querySelectorAll('.wf-tags-input__tag');
        if (tags.length) tags[tags.length - 1].remove();
      }
    });
    root.addEventListener('click', function (event) {
      var remove = event.target.closest('[data-wf-tag-remove]');
      if (remove) remove.closest('.wf-tags-input__tag').remove();
    });
  }

  window.WireframeTagsInput = { add: addTag, init: init };
})();
