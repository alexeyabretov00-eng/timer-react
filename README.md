# timer-react

A lightweight, browser-based multi-timer app. Add as many independent stopwatch-style timers as you need — each one runs, pauses, and stops on its own.

## Features

- Add unlimited parallel timers on a single page
- Start, pause, and stop controls per timer
- **Delete** any timer to remove it from the page
- Accurate elapsed-time display (`S`, `M:SS`, or `H:MM:SS`)
- Drift-corrected `setTimeout` loop for precision
- Browser opens automatically on `npm run dev`
- Purely client-side — no backend, no sign-up

## Tech Stack

| | |
|---|---|
| UI | React 19 |
| Language | TypeScript 5 |
| Styling | styled-components 6 |
| Build | Vite 6 |

## Getting Started

### Prerequisites

- Node.js 16+
- npm 7+

### Install

```bash
npm install
```

### Run (development)

```bash
npm run dev
```

The browser opens automatically at [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

Output is written to `dist/`.

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
  App.tsx                   # Root — manages the list of timer instances
  components/
    Timer/                  # Core timer logic and display
    AddButton/              # Adds a new timer card
    ActionButton/           # Base styled button primitive
    StartButton/            # Start control
    PauseButton/            # Pause control
    StopButton/             # Stop control
    DeleteButton/           # Removes a timer card
    Block/                  # Card/container wrapper
    Text/                   # Elapsed time label
  styles/
    GlobalStyles.tsx        # CSS reset and global tokens
```

## Usage

1. Click **+** to add a new timer.
2. Press **Start** to begin counting.
3. Press **Pause** to freeze the elapsed time (resume with **Start**).
4. Press **Stop** to reset the timer back to zero.
5. Press **✕** (top-right of the card) to delete the timer entirely.

Multiple timers can run simultaneously and are fully independent of each other.

## License

MIT