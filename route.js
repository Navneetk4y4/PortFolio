document.addEventListener('DOMContentLoaded', function() {
    // Projects button - navigate to projects page
    const projectsBtn = document.querySelector('.btn-view-all');
    if (projectsBtn) {
        projectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Use correct relative path
            const projectsPath = window.location.pathname.includes('/projects/') 
                              ? 'project.html' 
                              : 'projects/project.html';
            window.location.href = projectsPath;
        });
    }

    // Back button - navigate to home page
    const backBtn = document.querySelector('.back-to-home');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Use correct relative path based on current location
            const homePath = window.location.pathname.includes('/projects/') 
                          ? '../index.html' 
                          : 'index.html';
            window.location.href = homePath;
        });
    }

    // About icon - handle navigation
    const aboutIcon = document.querySelector('.nav-icon[href="#about"]');
    if (aboutIcon) {
        aboutIcon.addEventListener('click', function(e) {
            // Check if we're on home page (multiple possible indicators)
            const isHomePage = window.location.pathname.endsWith('index.html') || 
                             window.location.pathname.endsWith('/') ||
                             window.location.pathname.split('/').filter(Boolean).length <= 1;
            
            if (!isHomePage) {
                e.preventDefault();
                // Navigate to home page with correct relative path
                const homePath = window.location.pathname.includes('/projects/')
                              ? '../index.html'
                              : 'index.html';
                window.location.href = homePath;
            } else {
                // On home page - scroll to about section
                e.preventDefault();
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    window.scrollTo({
                        top: aboutSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    history.pushState(null, null, '#about');
                }
            }
        });
    }
});