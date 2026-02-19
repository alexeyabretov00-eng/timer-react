# AGENTS.md

> Project map for AI agents. Keep this file up-to-date as the project evolves.

## Project Overview
A multi-timer web application where users can add, control (start/pause/stop/delete), and track multiple independent stopwatch-style timers simultaneously. Built as a purely client-side React + TypeScript app.

## Tech Stack
- **Language:** TypeScript 4.9
- **Framework:** React 17
- **Build Tool:** Vite 4
- **Styling:** styled-components 5
- **State Management:** React hooks (no external store)

## Project Structure
```
timer-react/
├── index.html              # Vite HTML entry point
├── index.tsx               # React DOM root mount
├── vite.config.ts          # Vite + React plugin config
├── tsconfig.json           # TypeScript config
├── package.json
├── public/
│   └── fonts/              # Custom fonts
└── src/
    ├── App.tsx             # Root component — owns timer list state
    ├── vite-env.d.ts       # Vite type declarations
    ├── components/
    │   ├── index.ts        # Barrel — re-exports all components
    │   ├── ActionButton/   # Base styled div for clickable icons (20x20px)
    │   ├── AddButton/      # Button to add a new timer to the canvas
    │   ├── Block/          # Card container (225px wide, dark grey bg)
    │   ├── PauseButton/    # Timer pause control (extends ActionButton)
    │   ├── StartButton/    # Timer start control (extends ActionButton)
    │   ├── StopButton/     # Timer stop control (extends ActionButton)
    │   ├── Text/           # Timer display text (white when active, grey when idle)
    │   └── Timer/          # Full timer card — owns its own state machine
    └── styles/
        └── GlobalStyles.tsx  # Global CSS reset and base styles
```

## Key Entry Points
| File | Purpose |
|------|---------|
| [src/App.tsx](src/App.tsx) | Root component — manages timer list array, renders `Timer` + `AddButton` |
| [src/components/Timer/Timer.tsx](src/components/Timer/Timer.tsx) | Core timer logic — state machine, interval management, time display |
| [src/components/index.ts](src/components/index.ts) | Component barrel — single import point for all components |
| [index.tsx](index.tsx) | React DOM root mount |
| [vite.config.ts](vite.config.ts) | Build configuration |

## Component Hierarchy
```
App
├── GlobalStyles
├── Timer (× N — one per added timer)
│   └── Block
│       └── TimerStyled
│           ├── Text          (elapsed time display)
│           ├── Separator     (horizontal rule)
│           └── ButtonsWrapper
│               ├── StartButton  (shown when idle or paused)
│               ├── PauseButton  (shown when started)
│               └── StopButton
└── AddButton
```

## Timer State Machine
```
idle ──[Start]──► started ──[Pause]──► paused
 ▲                  │                    │
 └──────[Stop]──────┘◄──────[Stop]───────┘
```

## In-Progress Features
| Feature | Spec | Status |
|---------|------|--------|
| Delete timer | `specs/001-delete-timer/` | `onDelete` prop + App wiring done — `DeleteButton` UI component pending |

## Documentation
| Document | Path | Description |
|----------|------|-------------|
| README | [README.md](README.md) | Project landing page |
| Getting Started | [docs/getting-started.md](docs/getting-started.md) | Prerequisites, install, dev server, build |
| Architecture | [docs/architecture.md](docs/architecture.md) | Project structure, patterns, timer state machine |
| Components | [docs/components.md](docs/components.md) | Component reference — props, usage, visual behaviour |
| Contributing | [docs/contributing.md](docs/contributing.md) | Conventions, checklist, adding features |
| Project Spec | [.ai-factory/DESCRIPTION.md](.ai-factory/DESCRIPTION.md) | Full project specification and tech stack |

## AI Context Files
| File | Purpose |
|------|---------|
| AGENTS.md | This file — project structure map |
| [.ai-factory/DESCRIPTION.md](.ai-factory/DESCRIPTION.md) | Project specification and tech stack |

## Skills Available
| Skill | Path | Description |
|-------|------|-------------|
| react-patterns | .github/skills/react-patterns/ | React component conventions for this project |
| timer-domain | .github/skills/timer-domain/ | Timer state machine, time formatting, domain patterns |
| fix | .github/skills/fix/ | Bug fixing workflow |
| feature | .github/skills/feature/ | Feature development workflow |
| implement | .github/skills/implement/ | Implementation from spec/plan |
| task | .github/skills/task/ | Task planning |
| review | .github/skills/review/ | Code review |
| improve | .github/skills/improve/ | Code improvement |
| verify | .github/skills/verify/ | Verification and testing |
| docs | .github/skills/docs/ | Documentation generation |
