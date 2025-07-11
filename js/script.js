document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };

            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success glass';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you! Your message has been sent.</p>
            `;
            this.parentNode.insertBefore(successMsg, this.nextSibling);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMsg.classList.add('fade-out');
                setTimeout(() => successMsg.remove(), 500);
            }, 5000);
            
            this.reset();
        });
    }

    // Certification verification handler
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        // Add click event for verification
        card.addEventListener('click', function() {
            const certTitle = this.querySelector('h3').textContent.trim();
            
            // Verification URLs for different certifications
            const verificationUrls = {
                'CompTIA Security+': 'https://www.credly.com/badges/31ebd096-f64b-4850-a10b-8ad08ba69760/public_url',
                'QuickHeal Digital Forensic Investigator': 'https://lms.quickhealacademy.com/certificates/verification/exam?id=LPU-0000-028171',
                'CompTIA Network+': 'https://www.credly.com/badges/2845718e-9db6-480c-a86c-d5cd2bc60043/public_url',
            };
            
            if (verificationUrls[certTitle]) {
                window.open(verificationUrls[certTitle], '_blank');
            }
        });
    });

    // Social Media Dock functionality
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        // Add tooltip
        const title = item.getAttribute('title');
        const tooltip = document.createElement('span');
        tooltip.className = 'dock-tooltip';
        tooltip.textContent = title;
        item.appendChild(tooltip);
        
        // Position tooltip
        item.addEventListener('mouseenter', () => {
            const rect = item.getBoundingClientRect();
            tooltip.style.left = `${rect.width + 10}px`;
        });

        // Add click animation
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href')) return; // Allow default link behavior
            
            this.style.transform = 'translateX(8px) scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'translateX(8px) scale(1.15)';
            }, 100);
        });
    });



    




    

    








    // Scroll animation
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.skill-category, .project-card, .cert-card, .timeline-content, .section-title');
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 150 * index);
            }
        });
    };

    // Initialize animated elements
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .cert-card, .timeline-content, .section-title');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });

    // Run once on load and then on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Terminal typing effect with highlights
    const terminalContent = document.querySelector('.terminal-content');
    if (terminalContent) {
        const whoami = terminalContent.querySelector('p:nth-child(1)');
        const description = terminalContent.querySelector('p:nth-child(2)');
        const prompt = terminalContent.querySelector('p:nth-child(3)');

        // Clear initial content
        whoami.textContent = '';
        description.textContent = '';
        prompt.textContent = '';

        // Type "whoami" command
        typeText(whoami, '$ whoami', function() {
            // Then type the description with highlighted keywords
            const descText = 'Cyber security professional with expertise in network security, penetration testing, and digital forensics. CompTIA Security+ and Network+ certified, ranked in top 4% on TryHackMe.';
            const keywords = ['network security', 'penetration testing', 'digital forensics', 'Security+', 'Network+', 'TryHackMe'];
            
            typeTextWithHighlights(description, descText, keywords, function() {
                // Then show the prompt with animated cursor
                typeText(prompt, '$', function() {
                    // Advanced blinking cursor with pulse effect
                    const cursor = document.createElement('span');
                    cursor.className = 'blinking-cursor';
                    cursor.textContent = '_';
                    cursor.style.animation = 'cursorPulse 1s infinite, blink 1s step-end infinite';
                    prompt.appendChild(cursor);
                });
            });
        });
    }

    // Initialize Particles.js with cyber theme
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 60,
                    density: { 
                        enable: true,
                        value_area: 800 
                    }
                },
                color: { 
                    value: "#00ffaa" 
                },
                shape: { 
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#00ffaa"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00ffaa",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Typing helper function
function typeText(element, text, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, Math.random() * 50 + 20);
        } else {
            if (callback) callback();
        }
    }
    
    type();
}

// Highlighted typing function
function typeTextWithHighlights(element, text, highlights, callback) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            // Check if we're at a highlight point
            const remainingText = text.substring(i);
            const foundHighlight = highlights.find(h => remainingText.startsWith(h));
            
            if (foundHighlight) {
                const highlightSpan = document.createElement('span');
                highlightSpan.className = 'text-highlight';
                highlightSpan.textContent = foundHighlight;
                element.appendChild(highlightSpan);
                i += foundHighlight.length;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            
            setTimeout(type, Math.random() * 30 + 10);
        } else {
            if (callback) callback();
        }
    }
    
    type();
}

// Dynamic year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();