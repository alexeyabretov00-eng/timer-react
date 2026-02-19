# timer-react — Project Proposal

## Overview

`timer-react` is a lightweight, browser-based multi-timer application built with React and TypeScript. Users can create any number of independent stopwatch-style timers on a single page, each running, pausing, and stopping independently of the others.

## Problem Statement

Developers, designers, and knowledge workers frequently need to time multiple concurrent activities (e.g., tracking time spent on different tasks in a workday). Generic device clocks support only one timer at a time. A simple, tab-friendly web app that provides unlimited parallel timers removes that friction without requiring a sign-up or app install.

## Goals

- Allow users to add as many independent timers as needed on one page.
- Provide clear start, pause, stop, and **delete** (with confirmation) controls per timer.
- Display elapsed time accurately in a human-readable `H:MM:SS` format.
- Keep the UI minimal, fast, and purely client-side with no backend dependency.

## Non-Goals

- No user accounts, authentication, or data persistence across sessions.
- No countdown (target-time) mode in the initial version.
- No mobile-native app; browser-only.
- No analytics or telemetry.

## Proposed Solution

### Architecture

The app is a single-page application with a flat component hierarchy:

```
App
├── Timer (×N, one per added timer)
│   ├── Block (card container)
│   ├── DeleteButton (top-right, triggers confirm-delete state)
│   ├── ConfirmDeletePopup (portal popup on confirm-delete state)
│   ├── Text (elapsed time display)
│   └── Buttons (Start | Pause, Stop)
└── AddButton (creates a new Timer instance)
```

Each `Timer` manages its own state (`idle | started | paused | confirm-delete`) and elapsed time using React `useState` and `useRef`, with a self-scheduling `setTimeout` loop that corrects for drift.

### Key Interactions

| Action | Precondition | Result |
|--------|-------------|--------|
| Add Timer | — | New timer card appears in `idle` state |
| Start | `idle` or `paused` | Timer begins/resumes counting |
| Pause | `started` | Timer freezes; elapsed time preserved |
| Stop | `started` or `paused` | Timer resets to `0` and returns to `idle` |
| Delete (✕) | any state | Timer enters `confirm-delete`; popup appears |
| Confirm delete | `confirm-delete` | Timer removed from page |
| Cancel delete | `confirm-delete` | Timer returns to prior state |

### Time Display

Elapsed time is rendered as:
- Seconds only when < 1 minute
- `M:SS` when < 1 hour
- `H:MM:SS` for longer sessions

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| UI Framework | React | 17.0.2 |
| Language | TypeScript | ~4.9 |
| Styling | styled-components | 5.3.6 |
| Build Tool | Vite | ~4.2 |

## Project Structure

```
src/
  App.tsx                        # Root: manages list of timer IDs
  components/
    Timer/                         # Core timer logic and state machine
    AddButton/                     # Adds a new timer instance
    ActionButton/                  # Base styled button
    StartButton/                   # Start control
    PauseButton/                   # Pause control
    StopButton/                    # Stop control
    DeleteButton/                  # Triggers confirm-delete state
    ConfirmDeletePopup/            # Portal-based delete confirmation popup
    Block/                         # Card wrapper
    Text/                          # Elapsed time label
  styles/
    GlobalStyles.tsx               # CSS reset / global tokens
```

> **Convention**: each component's styled-components live in a `<Component>.styled.tsx`
> sibling file, never inline in the component file.

## Success Criteria

- Multiple timers can run simultaneously without interfering with each other.
- Elapsed time is accurate to within ±100 ms over a 1-hour run.
- Adding, starting, pausing, stopping, and deleting timers all work without page reload.
- Delete confirmation uses an inline popup — `window.confirm` is never called.
- The app builds and runs with `npm run dev` and `npm run build` without errors.

## Future Considerations

- Persist timer state to `localStorage` so sessions survive page refresh.
- Add a countdown / target-time mode.
- Support labelling timers with a user-defined name.
- Keyboard shortcuts for start/pause/stop.
- Export session data (CSV or JSON).
