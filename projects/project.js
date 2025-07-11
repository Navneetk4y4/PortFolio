// Add this to your existing script.js
// Project page navigation
document.querySelectorAll('.project-more-info').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // You can add analytics or other tracking here
        console.log('Viewing project:', this.getAttribute('href'));
        // Normal link behavior will proceed
    });
});

// Back button functionality
const backButtons = document.querySelectorAll('.back-to-projects');
backButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'projects.html';
        // Or use history.back() if you prefer
    });
});