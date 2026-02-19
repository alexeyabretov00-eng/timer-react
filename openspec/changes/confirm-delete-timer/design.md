## Context

The `Timer` component currently has three states: `idle`, `started`, and `paused`. Clicking the Delete button triggers `handleDelete` immediately (clears the timeout and calls `onDelete`). There is no intermediary state. The `window.confirm` browser API is explicitly ruled out — the confirmation UI must be rendered inline within the card.

## Goals / Non-Goals

**Goals:**
- Introduce a `confirm-delete` state into the Timer's state machine.
- Render inline Confirm and Cancel controls within the card when in that state.
- Confirm proceeds with deletion; Cancel returns to the previous state.
- UI is self-contained — no modals, portals, or global state.

**Non-Goals:**
- No `window.confirm` or any browser-native dialog.
- No animation or transition (can be added later).
- No changes to the timer's running behaviour during the confirm step.

## Decisions

### 1. `confirm-delete` as a local state value, not a boolean flag

**Decision**: Extend the existing `status` string to include a `'confirm-delete'` value, storing the pre-confirm status in a separate `ref` (`preConfirmStatus`).

**Rationale**: The Timer already uses `status` as the source of truth for conditional rendering. Adding one more value keeps the rendering logic in one place and avoids a second parallel boolean that must stay in sync.

**Alternative considered**: A separate `boolean` state `isConfirming`. Rejected — creates two independent pieces of state that can drift (e.g. `status === 'started' && isConfirming === true`) and complicates the already status-based render branches.

---

### 2. Custom popup rendered via React Portal, no npm packages

**Decision**: When `status === 'confirm-delete'`, render a custom popup (centred modal overlay) using `ReactDOM.createPortal` into `document.body`. No npm package is used — the popup is a plain styled-component with a backdrop. It contains "Delete this timer?" text, a Confirm button, and a Cancel button.

**Rationale**: A popup is visually distinct and clearly prompts a deliberate decision. A portal ensures the popup sits above all other content without z-index conflicts inside the card. No external library is needed — the UI is simple enough to build with styled-components alone.

**Alternative considered**: In-card overlay (absolutely positioned within `Block`). Rejected per user requirement — a popup was explicitly requested.

---

### 3. Timer continues in its previous state while confirming

**Decision**: Do not stop or pause the timer when it enters `confirm-delete`. The elapsed time continues to advance (or remains frozen if already paused). Cancelling returns to the exact pre-confirm state without any elapsed time correction.

**Rationale**: Stopping the timer on confirmation entry would be a surprising side-effect. The user chose to confirm or cancel — not to stop.

## Risks / Trade-offs

- **Stale `preConfirmStatus` ref** if state changes occur between confirm entry and resolution → Mitigation: only enter `confirm-delete` from a direct user click; no async path can change status while the popup is shown.
- **Portal cleanup** → `createPortal` unmounts automatically when the Timer unmounts; no manual cleanup required.
- **z-index stacking** → The backdrop uses a high fixed `z-index` (e.g. 1000); no other element in the app uses fixed positioning, so no conflict.
