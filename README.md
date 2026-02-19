# timer-react

> A multi-timer stopwatch app built with React, TypeScript, and Vite.

Add as many independent timers as you need. Each timer runs on its own — start, pause, and stop individually without affecting the others.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Key Features

- **Multiple timers** — add unlimited timers to a shared canvas
- **Independent controls** — each timer has its own Start / Pause / Stop / Delete
- **Delete confirmation** — clicking × opens a popup dialog before removing a timer
- **Drift-free timing** — uses recursive `setTimeout` with epoch-anchored accuracy
- **Dark theme** — styled-components CSS-in-JS with active/idle visual states

## Example

```
[ 1:23 ]           [ 0 ]           [ 45 ]
[▶] [■] [×]       [▶] [■] [×]     [||] [■] [×]
  idle              idle            running

# Click × → popup dialog:
┌─────────────────────────┐
│  Delete this timer?   │
│  [Cancel]  [Delete]   │
└─────────────────────────┘
```

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/getting-started.md) | Prerequisites, install, dev server, build |
| [Architecture](docs/architecture.md) | Project structure, component patterns, timer state machine |
| [Components](docs/components.md) | Component reference — props, usage, and visual behaviour |
| [Contributing](docs/contributing.md) | How to add features, coding conventions, checklist |

## License

MIT