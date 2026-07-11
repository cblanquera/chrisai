(function () {
  function format(value, includeYear) {
    if (!value) return '';
    var options = { month: 'short', day: 'numeric' };
    if (includeYear) options.year = 'numeric';
    return new Date(value + 'T12:00:00').toLocaleDateString('en-US', options);
  }

  function paint(field) {
    var start = field.querySelector('[data-wf-date-range-start]').value;
    var end = field.querySelector('[data-wf-date-range-end]').value;
    var output = field.querySelector('[data-wf-date-range-output]');
    var status = field.querySelector('[data-wf-date-range-status]');
    Array.prototype.forEach.call(field.querySelectorAll('[data-wf-date-value]'), function (day) {
      var value = day.dataset.wfDateValue;
      day.toggleAttribute('data-wf-date-edge', value === start || value === end);
      day.toggleAttribute('data-wf-date-in-range', Boolean(start && end && value > start && value < end));
    });
    if (output) output.textContent = start && end ? format(start, false) + ' - ' + format(end, true) : 'Select date range';
    if (status) status.textContent = start && !end ? 'Select an end date' : 'Select a start date';
  }

  function setOpen(field, open) {
    var trigger = field.querySelector('[data-wf-date-range-trigger]');
    var popover = field.querySelector('[data-wf-date-range-popover]');
    trigger.setAttribute('aria-expanded', String(open));
    popover.hidden = !open;
  }

  function select(field, value) {
    var start = field.querySelector('[data-wf-date-range-start]');
    var end = field.querySelector('[data-wf-date-range-end]');
    if (!start.value || end.value) {
      start.value = value;
      end.value = '';
    } else {
      end.value = value;
      if (end.value < start.value) {
        var first = start.value;
        start.value = end.value;
        end.value = first;
      }
    }
    paint(field);
    if (start.value && end.value) setOpen(field, false);
  }

  function init(root) {
    root = root || document;
    Array.prototype.forEach.call(root.querySelectorAll('[data-wf-date-range]'), paint);
    root.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-wf-date-range-trigger]');
      var day = event.target.closest('[data-wf-date-value]');
      var clear = event.target.closest('[data-wf-date-range-clear]');
      if (trigger) {
        var field = trigger.closest('[data-wf-date-range]');
        setOpen(field, trigger.getAttribute('aria-expanded') !== 'true');
      } else if (day) {
        select(day.closest('[data-wf-date-range]'), day.dataset.wfDateValue);
      } else if (clear) {
        var clearField = clear.closest('[data-wf-date-range]');
        clearField.querySelector('[data-wf-date-range-start]').value = '';
        clearField.querySelector('[data-wf-date-range-end]').value = '';
        paint(clearField);
      } else {
        Array.prototype.forEach.call(root.querySelectorAll('[data-wf-date-range]'), function (field) {
          if (!field.contains(event.target)) setOpen(field, false);
        });
      }
    });
    root.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') Array.prototype.forEach.call(root.querySelectorAll('[data-wf-date-range]'), function (field) { setOpen(field, false); });
    });
  }

  window.WireframeDateRange = { init: init, paint: paint, select: select };
})();
