# CAPTCHA Demo

A simple, local CAPTCHA-style verification page built with pure HTML, CSS, and JavaScript. This is an **educational demonstration only** - it uses no external CAPTCHA service and is safe to open directly in the browser.

## Features

- 🔒 **Local verification UI** - No external reCAPTCHA scripts or API calls
- ✨ **Modern design** - Clean layout with a polished verification modal
- 🎯 **Interactive modal** - Shows verification steps when the checkbox is clicked
- 📱 **Responsive layout** - Works on desktop and mobile
- ⌨️ **Keyboard support** - Press ESC to close the modal

## Project Structure

```
captcha.github.io/
├── index.html      # Main HTML file with CAPTCHA-style UI and modal
├── styles.css      # Styling and layout rules
├── script.js       # Local verification interactions
└── README.md       # This file
```

## Setup Instructions

### Run locally

Open `index.html` in your browser directly, or serve it with a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server
```

Then visit `http://localhost:8000`.

## How It Works

1. **User Views Page** - The landing page loads with a checkbox and verification card
2. **User Clicks Checkbox** - Clicking the "I'm not a robot" checkbox opens the verification modal
3. **Verification Steps Displayed** - The modal shows the requested instructions
4. **Verification Completes** - The page simulates a quick verification success
5. **Modal Closes** - The verification success message appears briefly, then the modal closes

## Customization

### Change Colors
Edit the color values in `styles.css`:
- Primary Blue: `#4285f4`
- Text Color: `#3c4043`
- Background Gradient: `#667eea` / `#764ba2`

### Modify Verification Steps
Edit the steps in `index.html` inside the `.steps-container` section:
```html
<div class="step">
    <div class="step-number">1</div>
    <div class="step-text">Your custom instruction here</div>
</div>
```

### Update Header Text
Change the `<h1>` and `<p>` tags in `index.html` to customize the page message.

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support

## Notes

- **This page is a local UI mockup and educational demonstration only.** It does not use Google reCAPTCHA or provide real bot protection.
- Intended for demonstration, design reference, or educational use rather than real security implementation.

## License

MIT License - Feel free to use this for your own projects!
