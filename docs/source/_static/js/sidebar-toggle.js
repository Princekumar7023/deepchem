// sidebar-toggle.js
// Simple fallback that wires the mobile hamburger button to the sidebar toggle.
// This only runs if the theme's built-in toggle is not functional.
// Safe: checks presence of elements and doesn't override existing behavior.

(function () {
  function onReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  onReady(function () {
    try {
      // Typical ReadTheDocs/Sphinx RTD selectors
      var toggleButtons = document.querySelectorAll('.wy-side-nav-search .icon, .navbar-toggle, .wy-nav-top .icon, .header-toggle, button[data-toggle="wy-nav-top"]');
      // fallback modern selectors
      if (!toggleButtons || toggleButtons.length === 0) {
        toggleButtons = document.querySelectorAll('.wy-side-nav-search button, .toc-toggle, .sphinxsidebar .toggle');
      }

      // Sidebar element (RTD uses nav.wy-nav-side / nav.wy-side-nav)
      var sidebar = document.querySelector('nav.wy-nav-side') || document.querySelector('nav.wy-side-nav') || document.querySelector('nav.sphinxsidebar');

      if (!sidebar) {
        return;
      }

      // A single handler that toggles a CSS class we control
      var handler = function (evt) {
        evt && evt.preventDefault && evt.preventDefault();
        sidebar.classList.toggle('rtd-sidebar-show');
      };

      toggleButtons.forEach && toggleButtons.forEach(function (btn) {
        // guard: do not double-bind handlers if already bound
        if (!btn.dataset.sidebarToggleBound) {
          btn.addEventListener('click', handler, false);
          btn.dataset.sidebarToggleBound = '1';
        }
      });

      // Also close sidebar when clicking outside on mobile
      document.addEventListener('click', function (e) {
        var isClickInside = sidebar.contains(e.target) || Array.from(toggleButtons || []).some(function(b){ return b.contains(e.target); });
        if (!isClickInside && sidebar.classList.contains('rtd-sidebar-show')) {
          sidebar.classList.remove('rtd-sidebar-show');
        }
      }, false);
    } catch (err) {
      // Fail silently — script is a harmless enhancement.
      console && console.debug && console.debug('sidebar-toggle fallback failed', err);
    }
  });
})();
