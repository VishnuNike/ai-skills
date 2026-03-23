---
name: browser
description: Minimal Chrome DevTools Protocol tools for browser automation and scraping. Use when you need to start Chrome, navigate pages, execute JavaScript, take screenshots, or interactively pick DOM elements.
---

# Browser Tools

Minimal CDP tools for collaborative site exploration and scraping.

**IMPORTANT**: All scripts are located in `~/.factory/skills/browser/` and must be called with full paths.

## Start Chrome

```bash
~/.factory/skills/browser/start.js
```

Start Chrome on `127.0.0.1:9222` with remote debugging using a fresh, isolated profile.

> **Security note**: Chrome is started with a temporary empty profile and the
> debugging port is bound to localhost only. User browser data (cookies,
> passwords, sessions) is never accessed.

## Navigate

```bash
~/.factory/skills/browser/nav.js https://example.com
~/.factory/skills/browser/nav.js https://example.com --new
```

Navigate current tab or open new tab.

> **Security note**: Only `http://` and `https://` URLs are allowed.
> Navigation to `file://`, `javascript:`, and private/internal IP addresses
> is blocked to prevent SSRF and local file access.

## Evaluate JavaScript

```bash
~/.factory/skills/browser/eval.js 'document.title'
~/.factory/skills/browser/eval.js 'document.querySelectorAll("a").length'
```

Execute JavaScript in active tab (async context, sandboxed).

**IMPORTANT**: The code must be a single expression or use IIFE for multiple statements:

- Single expression: `'document.title'`
- Multiple statements: `'(() => { const x = 1; return x + 1; })()'`
- Avoid newlines in the code string - keep it on one line

> **Security note**: Code runs in an isolated execution context with
> sensitive browser APIs (cookies, localStorage, sessionStorage,
> credentials, indexedDB) disabled. Cross-origin fetch is also blocked.

## Screenshot

```bash
~/.factory/skills/browser/screenshot.js
```

Screenshot current viewport, returns temp file path.

## Pick Elements

```bash
~/.factory/skills/browser/pick.js "Click the submit button"
```

Interactive element picker. Click to select, Cmd/Ctrl+Click for multi-select, Enter to finish.

## Usage Notes

- Start Chrome first before using other tools
- JavaScript evaluation runs in a sandboxed async context in the page
- Pick tool allows you to visually select DOM elements by clicking on them
