(function () {
  function html(strings) {
    var values = Array.prototype.slice.call(arguments, 1);
    return strings.reduce(function (out, part, index) {
      return out + part + (values[index] == null ? '' : values[index]);
    }, '');
  }

  function mount(target, markup) {
    if (typeof target === 'string') target = document.querySelector(target);
    if (target) target.innerHTML = markup;
    return target;
  }

  function repeat(items, render) {
    return items.map(render).join('');
  }

  window.WireframeTemplates = { html: html, mount: mount, repeat: repeat };
})();
