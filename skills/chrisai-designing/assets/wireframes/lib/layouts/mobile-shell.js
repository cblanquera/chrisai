(function () {
  var shellStates = new WeakMap();
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /** Return a named screen inside a mobile shell. */
  function getScreen(shell, name) {
    return shell.querySelector('[data-wf-mobile-screen="' + name + '"]');
  }

  /** Set screen visibility and focusability for one transition state. */
  function setScreenState(screen, state) {
    var isAvailable = state !== 'inactive';
    screen.setAttribute('data-wf-mobile-state', state);
    screen.setAttribute('aria-hidden', String(!isAvailable));
    if (isAvailable) screen.removeAttribute('inert');
    else screen.setAttribute('inert', '');
  }

  /** Focus the primary heading after a screen becomes active. */
  function focusScreen(screen) {
    var target = screen.querySelector('[data-wf-mobile-focus]');
    if (target && typeof target.focus === 'function') target.focus();
  }

  /** Synchronize bottom navigation with the active root screen. */
  function syncTabs(shell, name) {
    Array.prototype.forEach.call(shell.querySelectorAll('[data-wf-mobile-tab]'), function (tab) {
      if (tab.getAttribute('data-wf-mobile-tab') === name) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });
  }

  /** Complete a screen transition and release its interaction lock. */
  function finishTransition(shell, state, current, target, name) {
    if (!state.isTransitioning) return;
    setScreenState(current, 'inactive');
    setScreenState(target, 'active');
    state.active = name;
    state.isTransitioning = false;
    shell.removeAttribute('data-wf-mobile-transitioning');
    focusScreen(target);
  }

  /** Move between two screens using a native-style horizontal transition. */
  function transitionTo(shell, name, direction) {
    var state = shellStates.get(shell);
    var current = getScreen(shell, state.active);
    var target = getScreen(shell, name);
    if (!current || !target || current === target || state.isTransitioning) return false;
    state.isTransitioning = true;
    shell.setAttribute('data-wf-mobile-transitioning', '');
    syncTabs(shell, name);

    if (reducedMotion.matches) {
      finishTransition(shell, state, current, target, name);
      return true;
    }

    var enterState = direction === 'back' ? 'enter-left' : 'enter-right';
    var exitState = direction === 'back' ? 'exit-right' : 'exit-left';
    var didFinish = false;
    setScreenState(target, enterState);

    /** Finish once after either transition completion or its safety timeout. */
    function finish() {
      if (didFinish) return;
      didFinish = true;
      target.removeEventListener('transitionend', onTransitionEnd);
      finishTransition(shell, state, current, target, name);
    }

    /** Accept only the target screen's transform transition. */
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

  /** Push a screen onto the current mobile navigation stack. */
  function pushScreen(shell, name) {
    var state = shellStates.get(shell);
    if (!state || !transitionTo(shell, name, 'forward')) return;
    state.stack.push(name);
  }

  /** Replace the current stack with a selected root tab. */
  function selectTab(shell, name) {
    var state = shellStates.get(shell);
    if (!state || state.active === name) return;
    if (transitionTo(shell, name, 'forward')) state.stack = [name];
  }

  /** Return to the previous screen in the active navigation stack. */
  function popScreen(shell) {
    var state = shellStates.get(shell);
    if (!state || state.stack.length < 2) return;
    var name = state.stack[state.stack.length - 2];
    if (transitionTo(shell, name, 'back')) state.stack.pop();
  }

  /** Open or close the optional navigation drawer. */
  function setDrawer(shell, isOpen, opener) {
    var state = shellStates.get(shell);
    var drawer = shell.querySelector('[data-wf-mobile-drawer]');
    var backdrop = shell.querySelector('.wf-mobile-shell__drawer-backdrop[data-wf-mobile-drawer-close]');
    var stage = shell.querySelector('.wf-mobile-shell__stage');
    var tabs = shell.querySelector('.wf-mobile-shell__tabs');
    shell.setAttribute('data-wf-mobile-drawer-visible', String(isOpen));
    Array.prototype.forEach.call(shell.querySelectorAll('[data-wf-mobile-drawer-open]'), function (toggle) {
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    if (drawer) {
      drawer.setAttribute('aria-hidden', String(!isOpen));
      if (isOpen) drawer.removeAttribute('inert');
      else drawer.setAttribute('inert', '');
    }
    if (backdrop) backdrop.hidden = !isOpen;
    if (stage) stage.toggleAttribute('inert', isOpen);
    if (tabs) tabs.toggleAttribute('inert', isOpen);
    if (isOpen && state) {
      state.drawerOpener = opener || document.activeElement;
      var firstControl = drawer && drawer.querySelector('[data-wf-mobile-drawer-close], button, a[href]');
      if (firstControl && typeof firstControl.focus === 'function') firstControl.focus();
    } else if (state && state.drawerOpener && typeof state.drawerOpener.focus === 'function') {
      state.drawerOpener.focus();
      state.drawerOpener = null;
    }
  }

  /** Initialize one mobile shell and its optional interactive regions. */
  function initShell(shell) {
    if (shell.hasAttribute('data-wf-mobile-ready')) return;
    var screens = Array.prototype.slice.call(shell.querySelectorAll('[data-wf-mobile-screen]'));
    var active = shell.querySelector('[data-wf-mobile-state="active"]') || screens[0];
    if (!active) return;
    var activeName = active.getAttribute('data-wf-mobile-screen');
    shell.setAttribute('data-wf-mobile-ready', '');
    shellStates.set(shell, { active: activeName, isTransitioning: false, stack: [activeName] });
    Array.prototype.forEach.call(screens, function (screen) {
      setScreenState(screen, screen === active ? 'active' : 'inactive');
    });
    syncTabs(shell, activeName);
    setDrawer(shell, false);

    shell.addEventListener('click', function (event) {
      var drawerOpen = event.target.closest('[data-wf-mobile-drawer-open]');
      var drawerClose = event.target.closest('[data-wf-mobile-drawer-close]');
      var back = event.target.closest('[data-wf-mobile-back]');
      var tab = event.target.closest('[data-wf-mobile-tab]');
      var forward = event.target.closest('[data-wf-mobile-go]');
      if (drawerOpen) setDrawer(shell, true, drawerOpen);
      if (drawerClose) setDrawer(shell, false);
      if (back) popScreen(shell);
      if (tab) {
        setDrawer(shell, false);
        selectTab(shell, tab.getAttribute('data-wf-mobile-tab'));
      }
      if (forward) {
        setDrawer(shell, false);
        pushScreen(shell, forward.getAttribute('data-wf-mobile-go'));
      }
    });

    shell.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && shell.getAttribute('data-wf-mobile-drawer-visible') === 'true') {
        setDrawer(shell, false);
      }
    });
  }

  /** Initialize every mobile shell below a root node. */
  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('.wf-mobile-shell'), initShell);
  }

  window.WireframeMobileShell = {
    init: init,
    popScreen: popScreen,
    pushScreen: pushScreen,
    selectTab: selectTab,
    setDrawer: setDrawer
  };
})();
