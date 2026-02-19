[Back to README](../README.md) · [Architecture →](architecture.md)

# Getting Started

Everything you need to install, run, and build timer-react.

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | 16+ | Required for Vite |
| npm | 7+ | Comes with Node |

No backend, no database — this is a purely client-side app.

---

## Installation

```bash
git clone <repo-url>
cd timer-react
npm install
```

---

## Development

```bash
npm run dev
```

Starts the Vite dev server. Open http://localhost:5173.

Changes to `.tsx` and `.ts` files hot-reload in the browser instantly (HMR).

---

## Build

```bash
npm run build
```

Runs TypeScript type-checking (`tsc`) then produces an optimised bundle in `dist/`.

```bash
npm run preview
```

Serves the `dist/` build locally to verify before deploying.

---

## Verify It Works

1. Open http://localhost:5173.
2. Click the **+** button — a new timer card appears.
3. Click **▶** (Start) — the timer starts counting.
4. Click **||** (Pause) — time freezes, then **▶** resumes from where you left off.
5. Click **■** (Stop) — resets the timer to 0.
6. Click **×** (Delete) — an inline confirmation appears: `DELETE? [✓] [×]`.
   - Click **✓** to confirm — the timer is removed.
   - Click **×** to cancel — returns to the normal controls.
7. Add multiple timers and control each independently.

---

## Project Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Vite HMR dev server |
| Type-check + build | `npm run build` | Production bundle to `dist/` |
| Preview build | `npm run preview` | Serve `dist/` locally |

---

## See Also

- [Architecture](architecture.md) — project structure and patterns
- [Components](components.md) — component API reference
