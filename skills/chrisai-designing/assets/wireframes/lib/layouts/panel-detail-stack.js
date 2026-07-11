(function () {
  var stackStates = new WeakMap();
  var initializedRoots = new WeakSet();
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function getScreen(stack, name) {
    return stack.querySelector('[data-wf-detail-screen="' + name + '"]');
  }

  function setScreenState(screen, state) {
    var isAvailable = state !== 'inactive';
    screen.setAttribute('data-wf-detail-state', state);
    screen.setAttribute('aria-hidden', String(!isAvailable));
    screen.toggleAttribute('inert', !isAvailable);
  }

  function focusScreen(screen) {
    var target = screen.querySelector('[data-wf-detail-focus]');
    if (target && typeof target.focus === 'function') target.focus({ preventScroll: true });
  }

  function finishTransition(stack, state, current, target, name) {
    if (!state.isTransitioning) return;
    setScreenState(current, 'inactive');
    setScreenState(target, 'active');
    state.active = name;
    state.isTransitioning = false;
    stack.removeAttribute('data-wf-detail-transitioning');
    focusScreen(target);
  }

  function transitionTo(stack, name, direction) {
    var state = stackStates.get(stack);
    var current = state && getScreen(stack, state.active);
    var target = getScreen(stack, name);
    if (!state || !current || !target || current === target || state.isTransitioning) return false;
    state.isTransitioning = true;
    stack.setAttribute('data-wf-detail-transitioning', '');

    if (reducedMotion.matches) {
      finishTransition(stack, state, current, target, name);
      return true;
    }

    var enterState = direction === 'back' ? 'enter-left' : 'enter-right';
    var exitState = direction === 'back' ? 'exit-right' : 'exit-left';
    var didFinish = false;
    setScreenState(target, enterState);

    function finish() {
      if (didFinish) return;
      didFinish = true;
      target.removeEventListener('transitionend', onTransitionEnd);
      finishTransition(stack, state, current, target, name);
    }

    function onTransitionEnd(event) {
      if (event.target === target && event.propertyName === 'transform') finish();
    }

    target.addEventListener('transitionend', onTransitionEnd);
    window.setTimeout(finish, 320);
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        setScreenState(current, exitState);
        setScreenState(target, 'active');
      });
    });
    return true;
  }

  function activateImmediately(stack, name) {
    var state = stackStates.get(stack);
    var target = getScreen(stack, name);
    if (!state || !target) return false;
    Array.prototype.forEach.call(stack.querySelectorAll('[data-wf-detail-screen]'), function (screen) {
      setScreenState(screen, screen === target ? 'active' : 'inactive');
    });
    state.active = name;
    state.stack = [name];
    state.isTransitioning = false;
    stack.removeAttribute('data-wf-detail-transitioning');
    focusScreen(target);
    return true;
  }

  function setSelectedTrigger(stack, selected) {
    var state = stackStates.get(stack);
    if (state && state.rootTrigger) {
      state.rootTrigger.removeAttribute('data-wf-detail-selected');
      if (state.rootTrigger.hasAttribute('aria-selected')) state.rootTrigger.setAttribute('aria-selected', 'false');
    }
    if (selected) {
      selected.setAttribute('data-wf-detail-selected', '');
      if (selected.hasAttribute('aria-selected')) selected.setAttribute('aria-selected', 'true');
    }
    if (state) state.rootTrigger = selected || null;
  }

  function setPanelOpen(stack, isOpen) {
    var shell = stack.closest('[data-wf-panel-layout]');
    if (shell && window.WireframePanelLayout) {
      window.WireframePanelLayout.setPanelOpen(shell, 'right', isOpen);
    }
  }

  function openRoot(stack, name, trigger) {
    if (!getScreen(stack, name)) return;
    setPanelOpen(stack, true);
    if (!activateImmediately(stack, name)) return;
    setSelectedTrigger(stack, trigger);
    stack.dispatchEvent(new CustomEvent('wf:detail-open', {
      bubbles: true,
      detail: { name: name, trigger: trigger }
    }));
  }

  function push(stack, name) {
    var state = stackStates.get(stack);
    if (state && transitionTo(stack, name, 'forward')) state.stack.push(name);
  }

  function close(stack) {
    var state = stackStates.get(stack);
    if (!state) return;
    var trigger = state.rootTrigger;
    setPanelOpen(stack, false);
    setSelectedTrigger(stack, null);
    if (trigger && typeof trigger.focus === 'function') trigger.focus();
  }

  function back(stack) {
    var state = stackStates.get(stack);
    if (!state) return;
    if (state.stack.length < 2) {
      close(stack);
      return;
    }
    var name = state.stack[state.stack.length - 2];
    if (transitionTo(stack, name, 'back')) state.stack.pop();
  }

  function resolveStack(trigger) {
    var selector = trigger.getAttribute('data-wf-detail-stack-target');
    if (selector) return document.querySelector(selector);
    var shell = trigger.closest('[data-wf-panel-layout]');
    return shell && shell.querySelector('[data-wf-detail-stack]');
  }

  function initStack(stack) {
    if (stack.hasAttribute('data-wf-detail-ready')) return;
    var screens = Array.prototype.slice.call(stack.querySelectorAll('[data-wf-detail-screen]'));
    var active = stack.querySelector('[data-wf-detail-state="active"]') || screens[0];
    if (!active) return;
    var name = active.getAttribute('data-wf-detail-screen');
    stack.setAttribute('data-wf-detail-ready', '');
    stackStates.set(stack, { active: name, isTransitioning: false, rootTrigger: null, stack: [name] });
    Array.prototype.forEach.call(screens, function (screen) {
      setScreenState(screen, screen === active ? 'active' : 'inactive');
    });
  }

  function init(root) {
    root = root || document;
    Array.prototype.forEach.call(root.querySelectorAll('[data-wf-detail-stack]'), initStack);
    if (initializedRoots.has(root)) return;
    initializedRoots.add(root);

    root.addEventListener('click', function (event) {
      var opener = event.target.closest('[data-wf-detail-open]');
      var go = event.target.closest('[data-wf-detail-go]');
      var backControl = event.target.closest('[data-wf-detail-back]');
      var panelToggle = event.target.closest('[data-wf-panel-toggle="right"]');
      if (opener) {
        var targetStack = resolveStack(opener);
        if (targetStack) openRoot(targetStack, opener.getAttribute('data-wf-detail-open'), opener);
      } else if (go) {
        var goStack = go.closest('[data-wf-detail-stack]');
        if (goStack) push(goStack, go.getAttribute('data-wf-detail-go'));
      } else if (backControl) {
        var backStack = backControl.closest('[data-wf-detail-stack]');
        if (backStack) back(backStack);
      } else if (panelToggle) {
        var shell = panelToggle.closest('[data-wf-panel-layout]');
        var panelStack = shell && shell.querySelector('[data-wf-detail-stack]');
        if (panelStack && shell.getAttribute('data-wf-right-open') === 'false') setSelectedTrigger(panelStack, null);
      }
    });

    root.addEventListener('keydown', function (event) {
      var opener = event.target.closest('[data-wf-detail-open]');
      if (opener && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        var stack = resolveStack(opener);
        if (stack) openRoot(stack, opener.getAttribute('data-wf-detail-open'), opener);
      } else if (event.key === 'Escape') {
        var shell = event.target.closest('[data-wf-panel-layout]');
        var detailStack = shell && shell.querySelector('[data-wf-detail-stack]');
        if (detailStack && shell.getAttribute('data-wf-right-open') === 'false') close(detailStack);
      }
    });

    root.addEventListener('submit', function (event) {
      var form = event.target.closest('[data-wf-detail-submit]');
      if (!form) return;
      event.preventDefault();
      var stack = form.closest('[data-wf-detail-stack]');
      var submitEvent = new CustomEvent('wf:detail-submit', {
        bubbles: true,
        cancelable: true,
        detail: { form: form }
      });
      if (stack && stack.dispatchEvent(submitEvent)) back(stack);
    });
  }

  window.WireframePanelDetailStack = {
    back: back,
    close: close,
    init: init,
    openRoot: openRoot,
    push: push
  };
})();
