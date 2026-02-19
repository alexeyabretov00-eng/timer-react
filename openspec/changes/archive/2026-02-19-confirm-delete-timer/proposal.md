## Why

The current delete action removes a timer instantly on click, with no confirmation. A misclick permanently destroys a running timer. An inline confirmation step protects users from accidental deletion without resorting to the intrusive, unstyled browser `window.confirm` dialog.

## What Changes

- Clicking the Delete (✕) button no longer immediately removes the timer.
- Instead, the timer card enters a **confirm-delete** state, showing inline "Confirm" and "Cancel" controls.
- Confirming removes the timer; cancelling returns the card to its previous state.
- `window.confirm` SHALL NOT be used — the confirmation UI is rendered inside the card.

## Capabilities

### New Capabilities

<!-- None — this extends an existing capability. -->

### Modified Capabilities

- `timer-delete`: Deletion is no longer immediate. A two-step inline confirmation is now required before a timer is removed.

## Impact

- **`src/components/Timer/Timer.tsx`** — add a `confirm-delete` status state; render inline Confirm/Cancel controls when in that state.
- **New components** — `ConfirmDeleteOverlay` (or equivalent inline UI) may be introduced to keep `Timer` readable.
- No changes to `App.tsx`, routing, or data model.
- No new dependencies.
