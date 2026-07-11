(function () {
  function setExpanded(trigger, expanded) {
    trigger.setAttribute('aria-expanded', String(expanded));
    var targetId = trigger.getAttribute('aria-controls');
    if (targetId) {
      var target = document.getElementById(targetId);
      if (target) target.hidden = !expanded;
    }
  }

  function toggleExpanded(trigger) {
    var expanded = trigger.getAttribute('aria-expanded') === 'true';
    setExpanded(trigger, !expanded);
  }

  function setSelected(nodes, selected) {
    Array.prototype.forEach.call(nodes, function (node) {
      node.setAttribute('aria-selected', String(node === selected));
    });
  }

  window.WireframeState = {
    setExpanded: setExpanded,
    toggleExpanded: toggleExpanded,
    setSelected: setSelected
  };
})();
