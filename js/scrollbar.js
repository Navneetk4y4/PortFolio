// scrollbar.js - Custom Cyberpunk Scrollbar Implementation

function initializeCustomScrollbar() {
    // Add custom scrollbar styles dynamically
    const style = document.createElement('style');
    style.id = 'custom-scrollbar-styles';
    style.textContent = `
        /* Main scrollbar styling */
        ::-webkit-scrollbar {
            width: 14px;
            height: 14px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--dark-grey);
            border-left: 1px solid rgba(0, 255, 170, 0.2);
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, var(--glossy-green), var(--glossy-blue));
            border-radius: 8px;
            border: 3px solid var(--dark-grey);
            background-size: 200% 200%;
            animation: scrollbarGradient 3s ease infinite;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, var(--glossy-blue), var(--glossy-purple));
            box-shadow: 0 0 15px rgba(0, 255, 170, 0.7);
        }
        
        ::-webkit-scrollbar-corner {
            background: var(--dark-grey);
        }
        
        /* Firefox scrollbar */
        html {
            scrollbar-width: thin;
            scrollbar-color: var(--glossy-green) var(--dark-grey);
        }
        
        /* Scrollbar animations */
        @keyframes scrollbarGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Scroll progress indicator */
        .cyber-scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--glossy-green), var(--glossy-purple));
            z-index: 9999;
            transform-origin: left;
            transition: transform 0.1s linear;
            box-shadow: 0 0 10px rgba(0, 255, 170, 0.5);
        }
    `;
    document.head.appendChild(style);
    
    // Create scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'cyber-scroll-progress';
    document.body.prepend(progressBar);
    
    // Scroll event listener for progress bar
    let lastScrollPosition = 0;
    let ticking = false;
    
    const updateProgressBar = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.transform = `scaleX(${progress / 100})`;
        
        // Add glow effect when scrolling
        if (Math.abs(scrollTop - lastScrollPosition) > 5) {
            progressBar.style.boxShadow = '0 0 15px rgba(0, 255, 170, 0.8)';
        } else {
            progressBar.style.boxShadow = '0 0 10px rgba(0, 255, 170, 0.5)';
        }
        lastScrollPosition = scrollTop;
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateProgressBar);
            ticking = true;
        }
    });
    
    // Initialize with proper progress
    updateProgressBar();
}

// Wait for DOM and CSS variables to be ready
document.addEventListener('DOMContentLoaded', initializeCustomScrollbar);

// Re-initialize if CSS variables change (optional)
if (window.CSS && CSS.registerProperty) {
    CSS.registerProperty({
        name: '--glossy-green',
        syntax: '<color>',
        inherits: true,
        initialValue: '#00ffaa',
    });
    CSS.registerProperty({
        name: '--glossy-blue',
        syntax: '<color>',
        inherits: true,
        initialValue: '#00aaff',
    });
}
