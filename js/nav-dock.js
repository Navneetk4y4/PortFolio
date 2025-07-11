document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation dock (excluding about icon)
    const navDock = document.querySelector('.nav-dock');
    const navIcons = document.querySelectorAll('.nav-icon:not([href="#about"])');
    
    // Add tooltips to icons (excluding about icon)
    navIcons.forEach(icon => {
        const title = icon.getAttribute('title');
        if (title) {
            const tooltip = document.createElement('span');
            tooltip.className = 'nav-tooltip';
            tooltip.textContent = title;
            icon.appendChild(tooltip);
        }
    });

    // Smooth scrolling for navigation links (excluding about icon)
    document.querySelectorAll('[href^="#"]:not([href="#about"])').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - offset,
                        behavior: 'smooth'
                    });
                    
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });


  // Sticky effect with scroll
  if (navDock) {
    let lastScroll = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        // At top of page
        navDock.style.transform = 'translateX(-50%) translateY(0)';
        navDock.style.backdropFilter = 'blur(12px)';
      } else if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        // Scrolling down
        navDock.style.transform = 'translateX(-50%) translateY(-100%)';
      } else {
        // Scrolling up
        navDock.style.transform = 'translateX(-50%) translateY(0)';
        navDock.style.backdropFilter = 'blur(15px)';
      }
      
      lastScroll = currentScroll;
    });
  }

  // Mobile menu toggle (if exists)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navItems = document.querySelector('.nav-items');
  
  if (mobileMenuBtn && navItems) {
    mobileMenuBtn.addEventListener('click', function() {
      navItems.classList.toggle('active');
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-items') && !e.target.closest('.mobile-menu-btn')) {
        navItems.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
});