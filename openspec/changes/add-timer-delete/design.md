## Context

The app renders a dynamic list of `Timer` components managed by `App`. Each timer has its own isolated state. Currently there is no way to remove a timer — the list only grows. The existing component pattern (e.g. `StopButton`, `StartButton`) provides a clear model to follow for adding new controls.

## Goals / Non-Goals

**Goals:**
- Add a Delete control to each timer card that removes it from the active list.
- Keep the implementation consistent with the existing button component pattern.
- Ensure a running or paused timer is cleanly discarded when deleted (no lingering `setTimeout` callbacks).

**Non-Goals:**
- No confirmation dialog — deletion is immediate.
- No undo / restore capability.
- No persistence of deleted timer data.

## Decisions

### 1. Callback prop for deletion (`onDelete`)

**Decision**: `App` owns the timer list and passes an `onDelete: () => void` prop to each `Timer`. The timer calls it when the user clicks Delete.

**Rationale**: Consistent with React's one-way data flow. The timer itself should not know about the parent list — it just signals intent. `App` filters the timer out by ID.

**Alternative considered**: A shared context or global store. Rejected — overkill for a flat two-level component tree.

---

### 2. New `DeleteButton` component

**Decision**: Add a `DeleteButton` component under `src/components/DeleteButton/`, following the same file structure as `StopButton`, `StartButton`, etc.

**Rationale**: Maintains consistency with the existing button component pattern. Each button type has its own directory with `index.ts` and a component file.

**Alternative considered**: Reuse `ActionButton` directly inside `Timer`. Rejected — it breaks the established abstraction and makes `Timer` harder to read.

---

### 3. Button placement — top-right corner of the card

**Decision**: Render the Delete button in the top-right corner of the `Block` card, outside the existing `ButtonsWrapper`.

**Rationale**: Separates the "manage timer lifecycle" controls (Start/Pause/Stop) from the "manage timer existence" control (Delete). Top-right is a conventional position for dismiss/close actions.

---

### 4. Cleanup on delete

**Decision**: `Timer` clears its internal `setTimeout` in a `useEffect` cleanup or directly in the `onDelete` handler before calling `props.onDelete`.

**Rationale**: Prevents the orphaned interval from firing after the component is unmounted, which would cause a React state-update-on-unmounted-component warning.

## Risks / Trade-offs

- **Accidental deletion** → No undo. Mitigation: low-stakes for a timer app; a confirmation dialog can be added later if needed.
- **Timeout leak on fast delete** → If the user deletes a running timer before the next tick, the callback fires on an unmounted component. Mitigation: call `clearTimeout(intervalId.current)` before invoking `props.onDelete`.
