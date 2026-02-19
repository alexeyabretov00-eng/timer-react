---
name: timer-domain
description: >-
  Provides domain-specific patterns for the timer-react app: timer state machine (idle/started/paused),
  interval management with setTimeout, time formatting (ms → H:MM:SS), and component composition rules.
  Use when implementing timer features, modifying timing logic, adding new timer controls, or debugging
  timing behaviour.
argument-hint: "[feature or topic]"
metadata:
  author: ai-factory
  version: "1.0"
  category: domain
---

# Timer Domain — timer-react

Domain patterns for the timer-react stopwatch application.

---

## Timer State Machine

A Timer component has three states:

```
idle ──[onStart]──► started ──[onPaused]──► paused
 ▲                    │                       │
 └──────[onStop]──────┘◄──────[onStop]────────┘
                              [onStart]──► started  (resume)
```

| State | Meaning | Allowed Actions |
|-------|---------|----------------|
| `idle` | Not started / was stopped | Start |
| `started` | Timer is running | Pause, Stop |
| `paused` | Timer is frozen, time preserved | Start (resume), Stop |

**State variable:** `const [status, setStatus] = useState('idle')`

---

## Refs vs State

| Value | Storage | Reason |
|-------|---------|--------|
| `value` (display ms) | `useState` | Triggers re-render to update display |
| `status` | `useState` | Drives conditional rendering of buttons |
| `start` (epoch ms timestamp) | `useRef` | Doesn't need to cause a render |
| `time` (accumulated ticks) | `useRef` | Doesn't need to cause a render |
| `pausedTime` (epoch ms when paused) | `useRef` | Doesn't need to cause a render |
| `intervalId` (setTimeout ID) | `useRef` | Doesn't need to cause a render |

---

## Interval Implementation

The timer uses **recursive setTimeout** (not `setInterval`) for drift correction:

```tsx
// Start the first tick when status changes to 'started'
useEffect(() => {
  if (status !== 'started') return;
  intervalId.current = setTimeout(updateTimer, 100);
}, [status]);

const updateTimer = () => {
  if (status !== 'started') return;

  setValue(Math.floor(Date.now() - start.current));
  time.current += 100;

  // Schedule next tick accounting for drift
  intervalId.current = setTimeout(
    updateTimer,
    Date.now() - start.current - time.current
  );
};
```

**Key insight:** `start.current` is the original epoch timestamp. `Date.now() - start.current` always gives the true elapsed time, drift-free.

---

## Starting / Resuming

```tsx
const onStart = () => {
  if (!['idle', 'paused'].includes(status)) return;

  if (!start.current && status === 'idle') {
    // First start: record epoch
    start.current = Date.now();
  } else {
    // Resume: shift start forward by the paused duration
    start.current = start.current + (Date.now() - pausedTime.current);
  }

  pausedTime.current = 0;
  setStatus('started');
};
```

---

## Pausing

```tsx
const onPaused = () => {
  pausedTime.current = Date.now();  // record when we paused
  clearTimeout(intervalId.current);
  setStatus('paused');
};
```

---

## Stopping

```tsx
const onStop = () => {
  if (!['started', 'paused'].includes(status)) return;

  clearTimeout(intervalId.current);

  // Reset all refs
  start.current = 0;
  time.current = 0;
  pausedTime.current = 0;

  setStatus('idle');
  setValue(0);
};
```

---

## Time Formatting

```tsx
const formatValue = (value: number): string => {
  const milli = value;

  const hours = Math.floor(milli / 3600000);
  const minutes = Math.floor((milli % 3600000) / 60000);
  const seconds = Math.floor(minutes > 0
    ? (milli - (minutes * 60000)) / 1000
    : value / 1000
  );

  return `${hours > 0 ? `${hours}:` : ''}${minutes > 0 ? `${minutes}:` : ''}${seconds}`;
};
```

**Output format:** Omits leading zero units.
| Elapsed | Output |
|---------|--------|
| 5s | `5` |
| 90s | `1:30` |
| 3700s | `1:1:40` |

**Note:** This function is currently defined inline in `Timer.tsx`. If time display needs to change globally, update it there.

---

## Timer Props Interface

```tsx
interface TimerProps {
  id: string;           // UUID v4 — used as React key and for deletion
  onDelete: (id: string) => void;
}
```

The `Timer` component is fully self-contained — it owns all timing state. The parent (`App`) only needs to manage the list of timer IDs.

---

## Timer List Management (App.tsx)

```tsx
const [timers, setTimers] = useState<Array<{ id: string }>>([]);

// Add
const onAdd = () => {
  setTimers([...timers, { id: uuidv4() }]);
};

// Delete
const onDeleteTimer = (id: string) => {
  setTimers(timers.filter(timer => timer.id !== id));
};
```

ID generation uses an inline `uuidv4()` function using `crypto.getRandomValues`.

---

## Visual States

| State | Text color | Separator |
|-------|-----------|-----------|
| `started` | `#ffffff` (white) | white border |
| `idle` / `paused` | `#9E9E9E` (grey) | grey border |

Props to pass: `isActive={status === 'started'}`

---

## Button Visibility Rules

| Button | Shown when | Status |
|--------|-----------|--------|
| `StartButton` | `idle` or `paused` | Implemented |
| `PauseButton` | `started` | Implemented |
| `StopButton` | always (functional only during `started` or `paused`) | Implemented |
| `DeleteButton` | always | **Pending** — spec: `001-delete-timer` |

```tsx
{['idle', 'paused'].includes(status) && <StartButton onClick={onStart} />}
{status === 'started' && <PauseButton onClick={onPaused} />}
<StopButton onClick={onStop} isActive={status === 'started'} />
```

---

## Extending the Timer

When adding new features (e.g., lap times, labels, countdown):
1. Add new state/ref to `Timer.tsx`
2. Keep the core state machine (idle/started/paused) intact — other logic is additive
3. New buttons should extend `ActionButton` from `../ActionButton`
4. New display elements should respect `isActive` for color
5. Always `clearTimeout(intervalId.current)` before changing status away from `started`
