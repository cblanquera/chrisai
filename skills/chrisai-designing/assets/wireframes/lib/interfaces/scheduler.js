(function () {
  var ready = new WeakSet();
  var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var firstHour = 8;
  var lastHour = 18;

  function esc(value) {
    var node = document.createElement('span');
    node.textContent = value == null ? '' : String(value);
    return node.innerHTML;
  }

  function attr(value) {
    return esc(value).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function iso(date) {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  }

  function parseDate(value) {
    var parts = String(value || '').split('-');
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2] || 1));
  }

  function startOfWeek(date) {
    var start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return start;
  }

  function isToday(date) {
    return iso(date) === iso(new Date());
  }

  function formatHour(hour) {
    return new Date(2000, 0, 1, hour).toLocaleTimeString(undefined, { hour: 'numeric' });
  }

  function hourValue(hour) {
    return String(hour).padStart(2, '0') + ':00';
  }

  function eventHour(event) {
    return Number(String(event.time || '00:00').split(':')[0]);
  }

  function notify(title, body) {
    if (window.WireframeNotifier) window.WireframeNotifier.show({ title: title, body: body });
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-scheduler]'), function (scheduler) {
      if (ready.has(scheduler)) return;
      ready.add(scheduler);

      var data;
      try {
        data = JSON.parse(scheduler.querySelector('[data-wf-scheduler-data]').textContent);
      } catch (error) {
        data = { month: iso(new Date()).slice(0, 7), events: [] };
      }

      data.events = Array.isArray(data.events) ? data.events : [];
      var cursor = parseDate(data.date || data.month + '-01');
      var currentView = 'month';
      var editing = '';
      var calendar = scheduler.querySelector('[data-wf-scheduler-calendar]');
      var period = scheduler.querySelector('[data-wf-scheduler-period]');
      var viewSelect = scheduler.querySelector('[data-wf-scheduler-view]');
      var form = scheduler.querySelector('[data-wf-scheduler-form]');
      var dialog = scheduler.querySelector('#scheduler-event-dialog');

      function eventById(id) {
        return data.events.find(function (event) { return event.id === id; });
      }

      function eventsFor(date, hour) {
        return data.events.filter(function (event) {
          return event.date === date && (hour == null || eventHour(event) === hour);
        }).sort(function (a, b) { return String(a.time).localeCompare(String(b.time)); });
      }

      function eventMarkup(event, showOwner) {
        return '<button class="wf-scheduler__event" type="button" data-event-id="' + attr(event.id) + '" title="' + attr(event.title) + '"><strong>' + esc(event.time) + ' ' + esc(event.title) + '</strong>' + (showOwner && event.owner ? '<span class="wf-scheduler__event-owner">' + esc(event.owner) + '</span>' : '') + '</button>';
      }

      function renderMonth() {
        var first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
        var start = new Date(first);
        start.setDate(1 - first.getDay());
        var heading = dayNames.map(function (name) {
          return '<div class="wf-scheduler__weekday">' + name + '</div>';
        }).join('');
        var days = Array.from({ length: 42 }, function (_, index) {
          var date = new Date(start);
          date.setDate(start.getDate() + index);
          var key = iso(date);
          return '<div class="wf-scheduler__day" data-date="' + key + '" data-other-month="' + (date.getMonth() !== cursor.getMonth()) + '" data-is-today="' + isToday(date) + '" tabindex="0" role="button" aria-label="Add event on ' + attr(date.toLocaleDateString()) + '"><span class="wf-scheduler__date">' + date.getDate() + '</span>' + eventsFor(key).map(function (event) { return eventMarkup(event, false); }).join('') + '</div>';
        }).join('');
        calendar.innerHTML = heading + days;
        period.textContent = cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
      }

      function timeHeader(date) {
        return '<div class="wf-scheduler__time-day" data-is-today="' + isToday(date) + '"><span class="wf-scheduler__day-name">' + dayNames[date.getDay()] + '</span><span class="wf-scheduler__day-number">' + date.getDate() + '</span></div>';
      }

      function timeSlot(date, hour, showOwner) {
        var key = iso(date);
        var time = hourValue(hour);
        return '<div class="wf-scheduler__slot" data-date="' + key + '" data-time="' + time + '" tabindex="0" role="button" aria-label="Add event on ' + attr(date.toLocaleDateString()) + ' at ' + attr(formatHour(hour)) + '">' + eventsFor(key, hour).map(function (event) { return eventMarkup(event, showOwner); }).join('') + '</div>';
      }

      function renderWeek() {
        var start = startOfWeek(cursor);
        var dates = Array.from({ length: 7 }, function (_, index) {
          var date = new Date(start);
          date.setDate(start.getDate() + index);
          return date;
        });
        var html = '<div class="wf-scheduler__time-head">Time</div>' + dates.map(timeHeader).join('');
        for (var hour = firstHour; hour <= lastHour; hour += 1) {
          html += '<div class="wf-scheduler__hour">' + esc(formatHour(hour)) + '</div>';
          html += dates.map(function (date) { return timeSlot(date, hour, false); }).join('');
        }
        calendar.innerHTML = html;
        var end = dates[6];
        var sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
        var sameYear = start.getFullYear() === end.getFullYear();
        if (sameMonth) {
          period.textContent = start.toLocaleDateString(undefined, { month: 'long' }) + ' ' + start.getDate() + '–' + end.getDate() + ', ' + end.getFullYear();
        } else if (sameYear) {
          period.textContent = start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' – ' + end.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ', ' + end.getFullYear();
        } else {
          period.textContent = start.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) + ' – ' + end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        }
      }

      function renderDay() {
        var html = '<div class="wf-scheduler__time-head">Time</div>' + timeHeader(cursor);
        for (var hour = firstHour; hour <= lastHour; hour += 1) {
          html += '<div class="wf-scheduler__hour">' + esc(formatHour(hour)) + '</div>' + timeSlot(cursor, hour, true);
        }
        calendar.innerHTML = html;
        period.textContent = cursor.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      }

      function render() {
        calendar.dataset.view = currentView;
        if (currentView === 'week') renderWeek();
        else if (currentView === 'day') renderDay();
        else renderMonth();
        var unit = currentView.charAt(0).toUpperCase() + currentView.slice(1);
        scheduler.querySelector('[data-wf-scheduler-prev]').setAttribute('aria-label', 'Previous ' + currentView);
        scheduler.querySelector('[data-wf-scheduler-next]').setAttribute('aria-label', 'Next ' + currentView);
        calendar.setAttribute('aria-label', unit + ' calendar');
      }

      function openEditor(id, date, time, opener) {
        editing = id || '';
        var item = id ? eventById(id) : null;
        form.elements.title.value = item ? item.title : '';
        form.elements.date.value = item ? item.date : date;
        form.elements.time.value = item ? item.time : (time || '09:00');
        form.elements.owner.value = item ? item.owner : 'Operations';
        scheduler.querySelector('[data-wf-scheduler-dialog-title]').textContent = item ? 'Edit event' : 'Add event';
        scheduler.querySelector('[data-wf-scheduler-delete]').hidden = !item;
        if (window.WireframeDialog) window.WireframeDialog.open(dialog, opener);
      }

      function moveCursor(amount) {
        if (currentView === 'month') {
          var day = cursor.getDate();
          var target = new Date(cursor.getFullYear(), cursor.getMonth() + amount, 1);
          var finalDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
          target.setDate(Math.min(day, finalDay));
          cursor = target;
        } else {
          cursor.setDate(cursor.getDate() + amount * (currentView === 'week' ? 7 : 1));
        }
        render();
      }

      scheduler.addEventListener('click', function (click) {
        var eventButton = click.target.closest('[data-event-id]');
        if (eventButton) {
          click.stopPropagation();
          openEditor(eventButton.dataset.eventId, '', '', eventButton);
          return;
        }
        var slot = click.target.closest('[data-date]');
        if (slot) openEditor('', slot.dataset.date, slot.dataset.time, slot);
        if (click.target.closest('[data-wf-scheduler-prev]')) moveCursor(-1);
        if (click.target.closest('[data-wf-scheduler-next]')) moveCursor(1);
        if (click.target.closest('[data-wf-scheduler-today]')) { cursor = new Date(); render(); }
        if (click.target.closest('[data-wf-scheduler-add]')) openEditor('', iso(cursor), currentView === 'month' ? '09:00' : hourValue(firstHour), click.target.closest('[data-wf-scheduler-add]'));
        if (click.target.closest('[data-wf-scheduler-delete]')) {
          var item = eventById(editing);
          data.events = data.events.filter(function (candidate) { return candidate.id !== editing; });
          dialog.close();
          render();
          notify('Event removed', item.title + ' was removed.');
        }
      });

      calendar.addEventListener('keydown', function (event) {
        if (event.target.closest('[data-event-id]')) return;
        var slot = event.target.closest('[data-date]');
        if (slot && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          openEditor('', slot.dataset.date, slot.dataset.time, slot);
        }
      });

      viewSelect.addEventListener('change', function () {
        currentView = viewSelect.value;
        render();
      });

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var values = Object.fromEntries(new FormData(form).entries());
        var item = editing ? eventById(editing) : { id: 'event-' + Date.now() };
        Object.assign(item, values);
        if (!editing) data.events.push(item);
        cursor = parseDate(item.date);
        dialog.close();
        render();
        notify('Event saved', item.title + ' is scheduled.');
      });

      render();
    });
  }

  window.WireframeScheduler = { init: init };
})();
