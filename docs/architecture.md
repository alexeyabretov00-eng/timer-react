[← Getting Started](getting-started.md) · [Back to README](../README.md) · [Components →](components.md)

# Architecture

Project structure, component patterns, and the timer state machine.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript 4.9 |
| UI Framework | React 17 (functional components + hooks) |
| Build Tool | Vite 4 |
| Styling | styled-components 5 (CSS-in-JS) |
| State | React hooks — no external store |

---

## Directory Structure

```
src/
├── App.tsx                   # Root — owns the list of timers
├── vite-env.d.ts             # Vite type shims
├── components/
│   ├── index.ts              # Barrel — all components re-exported here
│   ├── ActionButton/         # Base 20×20px clickable icon primitive
│   ├── AddButton/            # "+" button — adds a new timer to the canvas
│   ├── Block/                # Dark-grey card container (225px min-width)│   ├── DeleteButton/         # × icon — removes the timer, extends ActionButton│   ├── PauseButton/          # || icon — extends ActionButton
│   ├── StartButton/          # ▶ icon — extends ActionButton
│   ├── StopButton/           # ■ icon — extends ActionButton (with isActive prop)
│   ├── Text/                 # Timer display — white (active) / grey (idle)
│   └── Timer/                # Full timer card — owns its own state machine
└── styles/
    └── GlobalStyles.tsx      # CSS reset + Gotham Pro font + dark background
```

---

## Component Hierarchy

```
App
├── GlobalStyles (CSS reset + font + background)
├── Timer (× N — one per timer in the list)
│   └── Block (card)
│       ├── Text (elapsed time display)
│       ├── Separator (hr, white when active)
│       └── ButtonsWrapper
│           ├── StartButton  — shown when idle or paused
│           ├── PauseButton  — shown when started
│           ├── StopButton   — always visible
│           └── DeleteButton — always visible
└── AddButton (appends a new timer)
```

---

## Timer State Machine

Each `Timer` component runs its own independent state machine:

```
idle ──[Start]──► started ──[Pause]──► paused
 ▲                  │                    │
 └──────[Stop]──────┘◄──────[Stop]───────┘
                             [Start]──► started  (resume)
```

| State | Running? | Visible buttons |
|-------|---------|----------------|
| `idle` | No | Start, Stop, Delete |
| `started` | Yes | Pause, Stop, Delete |
| `paused` | No | Start, Stop, Delete |

---

## Timing Implementation

Uses **recursive `setTimeout`** (not `setInterval`) to avoid timer drift:

```tsx
const updateTimer = () => {
  setValue(Math.floor(Date.now() - start.current));  // drift-free display
  time.current += 100;
  intervalId.current = setTimeout(
    updateTimer,
    Date.now() - start.current - time.current  // compensate for tick delay
  );
};
```

`start.current` is an epoch timestamp (ms). The display value is always `Date.now() - start.current`, so accumulated drift in `setTimeout` delays doesn't affect the shown time.

---

## Refs vs State

| Variable | Type | Reason |
|----------|------|--------|
| `value` | `useState` | Needs to trigger re-render (display update) |
| `status` | `useState` | Drives conditional button rendering |
| `start` | `useRef` | Epoch timestamp — no re-render needed |
| `time` | `useRef` | Accumulated tick counter — no re-render needed |
| `pausedTime` | `useRef` | Pause epoch — no re-render needed |
| `intervalId` | `useRef` | setTimeout ID — no re-render needed |

---

## Component Pattern

Each component lives in its own directory with a barrel export:

```
src/components/ComponentName/
├── ComponentName.tsx    # Implementation
└── index.ts             # export { ComponentName } from './ComponentName'
```

All components are re-exported from `src/components/index.ts` — consumed as:

```tsx
import { Timer, AddButton } from './components';
```

---

## Styling Conventions

| Token | Value | Usage |
|-------|-------|-------|
| Page background | `#353638` | Dark grey, set in GlobalStyles |
| Card background | `#696969` | `Block` component |
| Active text | `#FFFFFF` | `isActive={true}` |
| Idle text | `#9E9E9E` | `isActive={false}` |
| Font | Gotham Pro | `public/fonts/gothampro.ttf` |

Active state is passed as an `isActive: boolean` prop and mapped to colours via styled-components template literals.

---

## See Also

- [Components](components.md) — detailed component API reference
- [Contributing](contributing.md) — how to add new components
