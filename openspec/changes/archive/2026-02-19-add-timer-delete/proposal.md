## Why

Users can add timers but have no way to remove them — once added, a timer card persists for the entire session. A delete control lets users clean up timers they no longer need without refreshing the page.

## What Changes

- Each timer card gains a **Delete** button.
- Clicking Delete removes that timer instance from the page entirely.
- If the timer is running or paused when deleted, it is stopped and its state is discarded.
- The `App` component's timer list is updated to reflect the removal.

## Capabilities

### New Capabilities

- `timer-delete`: A delete action on each Timer card that removes it from the active timer list.

### Modified Capabilities

<!-- No existing spec-level requirements are changing. -->

## Impact

- **`src/App.tsx`** — `onDelete` handler removes a timer by ID from the `timers` state array; ID passed down to each `Timer`.
- **`src/components/Timer/Timer.tsx`** — Accepts an `onDelete` prop and renders a Delete button; triggers `onDelete` on click.
- **New component** — A `DeleteButton` component (consistent with existing `StopButton`, `StartButton`, etc.) may be introduced.
- No new dependencies required.
