# Project: timer-react

## Overview
A multi-timer web application built with React and TypeScript. Users can add multiple independent stopwatch-style timers to a canvas. Each timer operates independently with its own start, pause, stop, and delete controls.

## Core Features
- Add unlimited timers to the workspace
- Per-timer controls: Start, Pause, Stop (delete scaffolded, awaiting UI)
- Elapsed time display (seconds, minutes, hours auto-formatted)
- Timer state machine: idle → started → paused → idle (via stop)
- Visual feedback: active timers display differently (white text/separator) vs idle (grey)

## Pending Features (spec ready)
- **Delete timer** — `onDelete` prop + `App.tsx` wiring exist; `DeleteButton` component not yet created (`specs/001-delete-timer`)

## Tech Stack
- **Language:** TypeScript 4.9
- **Framework:** React 17 (functional components + hooks)
- **Build Tool:** Vite 4
- **Styling:** styled-components 5 (CSS-in-JS)
- **State Management:** React local state (useState, useRef, useEffect)
- **No backend, no database** — purely client-side application

## Architecture Notes
- `App.tsx` owns the list of timers as an array of `{ id: string }` objects
- Each `Timer` component manages its own state independently via hooks
- `uuidv4()` is implemented inline in App.tsx for generating unique IDs
- Components are co-located in `src/components/<ComponentName>/` with an `index.ts` barrel file each
- Base UI primitives: `Block` (container), `ActionButton` (clickable icon base), `Text`
- Timer buttons (`StartButton`, `PauseButton`, `StopButton`) extend `ActionButton`
- `DeleteButton` is planned (spec: `001-delete-timer`) — `onDelete` callback on `Timer` already wired through to `App`
- `AddButton` lives at the App level to append new timers
- Styling: dark theme — `#696969` card background, `#ffffff` / `#9E9E9E` text states

## Timer State Machine
```
idle ──[Start]──► started ──[Pause]──► paused
  ▲                  │                    │
  └──────[Stop]──────┘◄──────[Stop]───────┘
                             [Start again]──► started
```

## Time Formatting
`formatValue(ms: number): string` — converts milliseconds to `H:MM:SS` or `M:SS` or `S`, omitting leading zero units.

## Non-Functional Requirements
- No external state management library — keep it simple with React hooks
- No routing — single-page canvas
- Component isolation: each Timer is fully self-contained after receiving `id` and `onDelete` props
