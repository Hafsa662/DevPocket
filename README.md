# DevPocket

DevPocket is a personal code snippet manager, I built to keep my reusable code organized in one place. Instead of digging through old projects or sticky notes, I can save snippets by folder, language, or tags and find them quickly whenever I need them.
It features a warm, earthy interface with dark and light modes, along with built-in AI tools to explain tricky code or spot bugs.

## What It Can Do

- **Organize Easily:** Group snippets into folders, tag them, mark favorites, or search across titles and code using `Ctrl+K` (`⌘K` on Mac).
- **AI Help:** Use **Ask AI** for a quick breakdown of what a snippet does, or **Fix Bugs** to check for errors and edge cases.
- **Share & Backup:** Copy formatted Markdown, share directly to GitHub Gist or LinkedIn, or export/import your snippets as a JSON file.
- **Custom Themes:** Switch between Dark and Light modes and pick your preferred syntax highlighting theme.
- **Local Storage:** Everything is saved locally in a lightweight SQLite database (`devpocket.db`).

## Built With

- **Backend:** Python, Flask, SQLite
- **Frontend:** HTML, CSS, JavaScript, Highlight.js
- **AI:** Google Gemini API (with a built-in offline fallback so it works even without an API key)

## How to Run Locally

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Hafsa662/DevPocket.git](https://github.com/Hafsa662/DevPocket.git)
   cd DevPocket
