const checkbox = document.getElementById('robotCheckbox');
const verifyButton = document.getElementById('verifyButton');
const verificationResult = document.getElementById('verificationResult');
const commandBox = document.getElementById('commandBox');
const demoCommand = document.getElementById('demoCommand');

const safeCommand = `echo "DEMO: fake malware command would run here"
# This is a harmless demo command. Do not run unknown commands from random pages.`;

const typeOnlyClipboard = async (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
};

checkbox.addEventListener('change', () => {
  verifyButton.disabled = !checkbox.checked;
});

verifyButton.addEventListener('click', async () => {
  verificationResult.classList.remove('hidden');
  commandBox.classList.remove('hidden');
  demoCommand.textContent = safeCommand;

  try {
    await typeOnlyClipboard(safeCommand);
  } catch (error) {
    console.warn('Clipboard copy failed; user can still copy manually.');
  }

  verifyButton.textContent = 'Copied!';
  setTimeout(() => {
    verifyButton.textContent = 'Verify';
  }, 1800);
});
