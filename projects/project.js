document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', '../js/particles-config.json', function() {
            console.log('Particles.js loaded successfully');
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // Project card expansion functionality
    const projectCards = document.querySelectorAll('.project-card');
    
    function toggleCard(card) {
        const isExpanding = !card.classList.contains('expanded');
        card.classList.toggle('expanded');
        
        // Toggle chevron icon
        const chevron = card.querySelector('.toggle-expand i');
        chevron.classList.toggle('fa-chevron-down');
        chevron.classList.toggle('fa-chevron-up');
        
        // Update read more/less text
        const readMore = card.querySelector('.read-more');
        if (readMore) {
            readMore.textContent = isExpanding ? ' Read less' : ' Read more';
        }
        
        // Scroll to card if expanding
        if (isExpanding) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    projectCards.forEach(card => {
        const toggleBtn = card.querySelector('.toggle-expand');
        const closeBtn = card.querySelector('.btn-ghost');
        
        // Toggle expand/collapse
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleCard(card);
        });
        
        // Close details button handler
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleCard(card);
            });
        }
        
        // Text expand functionality
        const readMore = card.querySelector('.read-more');
        if (readMore) {
            readMore.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleCard(card);
            });
        }
        
        // Close when clicking outside on mobile
        if (window.innerWidth <= 768) {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.toggle-expand') || 
                    e.target.closest('.btn-ghost') || 
                    e.target.closest('a') || 
                    e.target.closest('button')) {
                    return;
                }
                
                if (card.classList.contains('expanded')) {
                    toggleCard(card);
                }
            });
        }
    });

    // Tab functionality
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.code-tabs');
            
            // Remove active class from all buttons and tabs
            tabContainer.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            tabContainer.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const menuIcon = mobileMenuBtn.querySelector('i');
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    });

    // Add copy buttons to all terminal code blocks
    document.querySelectorAll('.terminal-code').forEach(terminal => {
        const copyBtn = document.createElement('button');
        copyBtn.classList.add('copy-btn');
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        terminal.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', async () => {
            const code = terminal.querySelector('code').textContent;
            try {
                await navigator.clipboard.writeText(code);
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                    copyBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                copyBtn.innerHTML = '<i class="fas fa-times"></i> Error';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            }
        });
    });

    // Close expanded cards when clicking outside on desktop
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.project-card.expanded').forEach(card => {
                if (!card.contains(e.target)) {
                    toggleCard(card);
                }
            });
        }
    });

    // Handle keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Close expanded cards with Escape key
        if (e.key === 'Escape') {
            document.querySelectorAll('.project-card.expanded').forEach(card => {
                toggleCard(card);
            });
        }
    });
});