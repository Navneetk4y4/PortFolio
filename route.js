// route.js - Enhanced for your structure
document.addEventListener('DOMContentLoaded', function() {
    // Projects button in index.html
    const projectsBtn = document.querySelector('.btn-view-all');
    if (projectsBtn) {
        projectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = './projects/project.html';
        });
    }

    // Back button in project.html
    const backBtn = document.querySelector('.back-to-home');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '../index.html';
        });
    }
});