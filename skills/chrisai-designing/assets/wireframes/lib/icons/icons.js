(function () {
  var paths = {
    add: '<path d="M12 5v14M5 12h14"/>',
    alert: '<path d="M12 8v5"/><path d="M12 17h.01"/><path d="M10.2 4.4 2.7 17.5A2 2 0 0 0 4.4 20h15.2a2 2 0 0 0 1.7-2.5L13.8 4.4a2 2 0 0 0-3.6 0Z"/>',
    'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    bell: '<path d="M10.3 21a2 2 0 0 0 3.4 0"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>',
    bold: '<path d="M6 4h8a4 4 0 0 1 0 8H6z"/><path d="M6 12h9a4 4 0 0 1 0 8H6z"/>',
    calendar: '<path d="M7 2v4M17 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/>',
    check: '<path d="m20 6-11 11-5-5"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    edit: '<path d="M12 20h9"/><path d="m16.5 3.5 4 4L8 20H4v-4Z"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="m3 3 18 18"/><path d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a17.4 17.4 0 0 1-2.1 2.8M6.6 6.6C3.6 8.5 2 12 2 12s3.5 6 10 6a10.7 10.7 0 0 0 5.4-1.4"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    filter: '<path d="M4 5h16l-6 7v5l-4 2v-7Z"/>',
    home: '<path d="m3 11 9-9 9 9"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    italic: '<path d="M19 4h-9M14 20H5M15 4 9 20"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    'list-ordered': '<path d="M10 6h11M10 12h11M10 18h11"/><path d="M4 6h1V3M4 10h2l-2 3h2M4 17h2v4H4"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    more: '<path d="M12 12h.01M19 12h.01M5 12h.01"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 2.1-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-3v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-2.1-2.1.1-.1A1.7 1.7 0 0 0 5 14.6a1.7 1.7 0 0 0-1.5-1H3v-3h.5A1.7 1.7 0 0 0 5 9.6a1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-2.1.1.1A1.7 1.7 0 0 0 8.7 6a1.7 1.7 0 0 0 1-1.5V4h3v.5a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 2.1 2.1-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.5v3h-.5a1.7 1.7 0 0 0-1.5 1Z"/>',
    star: '<path d="m12 2.5 3 6.1 6.7 1-4.9 4.7 1.2 6.7-6-3.2-6 3.2 1.2-6.7-4.9-4.7 6.7-1Z"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 16h10l1-16"/>',
    upload: '<path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/>',
    underline: '<path d="M6 3v7a6 6 0 0 0 12 0V3M4 21h16"/>',
    undo: '<path d="M9 7 4 12l5 5"/><path d="M20 17a8 8 0 0 0-8-8H4"/>',
    redo: '<path d="m15 7 5 5-5 5"/><path d="M4 17a8 8 0 0 1 8-8h8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/>'
  };

  function svg(name) {
    var path = paths[name] || paths.info;
    return '<span class="wf-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg></span>';
  }

  function render(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-icon]'), function (node) {
      node.innerHTML = svg(node.getAttribute('data-wf-icon'));
    });
  }

  window.WireframeIcons = { svg: svg, render: render, names: Object.keys(paths) };
  document.addEventListener('DOMContentLoaded', function () { render(document); });
})();
