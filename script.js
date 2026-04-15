document.addEventListener('DOMContentLoaded', function() {
    const captchaCheckbox = document.getElementById('captcha-checkbox');
    const modal = document.getElementById('verificationModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModal');
    let verificationTimer;

    // Show modal when checkbox is clicked
    captchaCheckbox.addEventListener('change', function() {
        if (this.checked) {
            openModal();
            // Keep steps visible longer until the user closes the modal
            if (verificationTimer) {
                clearTimeout(verificationTimer);
            }
            verificationTimer = setTimeout(() => {
                showVerificationReady();
            }, 3000);
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
        if (verificationTimer) {
            clearTimeout(verificationTimer);
        }
        restoreModalContent();
    }

    function showVerificationReady() {
        const modalBody = modal.querySelector('.modal-body');
        if (!modalBody.querySelector('.verification-ready')) {
            const readyTag = document.createElement('div');
            readyTag.className = 'verification-ready';
            readyTag.textContent = 'Ready';
            modalBody.insertBefore(readyTag, modalBody.firstChild);
        }
    }

    function restoreModalContent() {
        modal.querySelector('.modal-body').innerHTML = `
            <p class="intro-text">Follow these demo verification steps below. No actual system action is required.</p>
            <div class="steps-container">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-text">Press Windows Button " ⊞ " + R</div>
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
