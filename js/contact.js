document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Handle form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    showFormMessage('Message sent successfully!', 'success');
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showFormMessage('Oops! There was a problem sending your message.', 'error');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // Create and show form messages
        function showFormMessage(message, type) {
            // Remove existing messages
            const existingMessage = contactForm.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Create new message element
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-message ${type}`;
            messageDiv.textContent = message;
            
            // Insert after the form
            contactForm.appendChild(messageDiv);
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => messageDiv.remove(), 500);
            }, 5000);
        }
    }
});