/**
 * N1b Institutional Navigation & Mobile Drawer Controller
 */
export function initNavigation() {
  const header = document.querySelector('.nav-header');
  const toggleBtn = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  // Scroll elevation listener
  if (header) {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastKnownScrollPosition > 24) {
            header.classList.add('is-scrolled');
          } else {
            header.classList.remove('is-scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Dropdown menus interaction (Click & Keyboard support)
  const dropdownItems = document.querySelectorAll('.nav-item--dropdown');
  dropdownItems.forEach(item => {
    const trigger = item.querySelector('.nav-link--dropdown');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('is-open');
      
      // Close all other dropdowns first
      dropdownItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherTrigger = other.querySelector('.nav-link--dropdown');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns on clicking outside or ESC
  document.addEventListener('click', (e) => {
    dropdownItems.forEach(item => {
      if (!item.contains(e.target)) {
        item.classList.remove('is-open');
        const trigger = item.querySelector('.nav-link--dropdown');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownItems.forEach(item => {
        if (item.classList.contains('is-open')) {
          item.classList.remove('is-open');
          const trigger = item.querySelector('.nav-link--dropdown');
          if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
            trigger.focus();
          }
        }
      });
    }
  });

  // Mobile Drawer Toggle
  if (toggleBtn && drawer) {
    const openDrawer = () => {
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (closeBtn) closeBtn.focus();
    };

    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    };

    toggleBtn.addEventListener('click', openDrawer);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    // Dismiss on clicking backdrop
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        closeDrawer();
      }
    });

    // Dismiss on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // Active Link Highlight based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--dropdown), .mobile-nav-link, .mobile-nav-sublink, .nav-drop-item, .nav-actions .btn--outline');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === '/index.html') || href === `/${currentPath}`) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');

      // If link is inside a dropdown, also highlight the parent dropdown trigger
      const parentDropdown = link.closest('.nav-item--dropdown');
      if (parentDropdown) {
        const parentTrigger = parentDropdown.querySelector('.nav-link--dropdown');
        if (parentTrigger) {
          parentTrigger.classList.add('is-active');
        }
      }
    } else {
      link.classList.remove('is-active');
    }
  });
}
