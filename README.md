# timer-react

A lightweight, browser-based multi-timer app. Add as many independent stopwatch-style timers as you need — each one runs, pauses, and stops on its own.

## Features

- Add unlimited parallel timers on a single page
- Start, pause, and stop controls per timer
- Accurate elapsed-time display (`S`, `M:SS`, or `H:MM:SS`)
- Drift-corrected `setTimeout` loop for precision
- Purely client-side — no backend, no sign-up

## Tech Stack

| | |
|---|---|
| UI | React 17 |
| Language | TypeScript 4.9 |
| Styling | styled-components 5 |
| Build | Vite 4 |

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

Open [http://localhost:5173](http://localhost:5173) in your browser.

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

Multiple timers can run simultaneously and are fully independent of each other.

## License

MIT