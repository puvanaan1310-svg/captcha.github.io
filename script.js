document.addEventListener('DOMContentLoaded', function() {
    const captchaCheckbox = document.getElementById('captcha-checkbox');
    const modal = document.getElementById('verificationModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModal');

    // Show modal when checkbox is clicked
    captchaCheckbox.addEventListener('change', function() {
        if (this.checked) {
            openModal();
            // Simulate verification delay
            setTimeout(() => {
                verifyWithRecaptcha();
            }, 1000);
        }
    });

    // Close modal functions
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    function openModal() {
        modal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        captchaCheckbox.checked = false;
    }

    // reCAPTCHA v3 Integration
    function verifyWithRecaptcha() {
        if (typeof grecaptcha !== 'undefined') {
            grecaptcha.ready(function() {
                grecaptcha.execute('YOUR_RECAPTCHA_V3_SITE_KEY', { action: 'submit' }).then(function(token) {
                    // Send token to your backend for verification
                    verifyTokenOnBackend(token);
                }).catch(function(error) {
                    console.error('reCAPTCHA error:', error);
                    showVerificationComplete(false);
                });
            });
        } else {
            // Fallback if reCAPTCHA script not loaded
            showVerificationComplete(true);
        }
    }

    function verifyTokenOnBackend(token) {
        // In a real implementation, you would send this token to your backend
        // For now, we'll simulate a successful verification after a delay
        setTimeout(() => {
            showVerificationComplete(true);
        }, 2000);
    }

    function showVerificationComplete(success) {
        const modalBody = modal.querySelector('.modal-body');
        
        if (success) {
            const successMessage = document.createElement('div');
            successMessage.className = 'verification-success';
            successMessage.innerHTML = `
                <div class="success-icon">✓</div>
                <p>Verification successful!</p>
            `;
            
            setTimeout(() => {
                closeModal();
            }, 1500);
        } else {
            showError('Verification failed. Please try again.');
        }
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        modal.querySelector('.modal-body').appendChild(errorDiv);
    }
});

// Keyboard shortcut to close modal (ESC key)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('verificationModal');
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.getElementById('modalOverlay').classList.remove('active');
            document.body.style.overflow = '';
            document.getElementById('captcha-checkbox').checked = false;
        }
    }
});
