# PromptWala / Prompt Shelf — UI Upgrade

This version keeps the existing vanilla HTML/CSS/JavaScript structure and prompt data files.

## Improvements
- Refreshed responsive styling with clearer spacing, card hierarchy, focus states, and reduced-motion support.
- Manual theme control: dark → light → system, saved locally in the browser.
- Search clear button.
- Live result count.
- Sort prompts by recommended order, title A–Z, or title Z–A.
- “Surprise me” scrolls to a randomly selected visible prompt.
- Improved mobile button layout and larger touch targets.
- Expanded meta description for search previews.

## Run locally
Open `index.html` in a browser, or use GitHub Pages to host the static site. The existing `.js`, image, manifest, and service-worker assets remain included.

## Notes
- Theme and favorites are stored locally in the visitor's browser.
- This is a static site; there is no server/database or account sync.
