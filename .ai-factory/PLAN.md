# Implementation Plan: Confirm Remove Timer

Branch: feature/confirm-delete-timer
Created: 2026-02-19

## Settings
- Testing: no
- Docs: yes

## Overview

Add an inline confirmation step before a timer is deleted. When the user clicks the `×` button, the timer card switches to a "confirm" state showing a prompt and two buttons (Confirm / Cancel). Only on Confirm does `onDelete(id)` fire. Pressing Cancel returns to the normal view.

## Approach

Keep the confirmation entirely inside `Timer.tsx` using a local `confirmingDelete` boolean state. No new component file needed — add styled sub-components directly in `Timer.tsx` (same pattern used for `Separator`, `ButtonsWrapper`).

**Confirm state UI:**
- Text: `"DELETE?"` (styled like the separator label — small, grey)
- `ConfirmButton` — renders a checkmark (✓) using `ActionButton`
- `CancelButton` — renders an × (same SVG as DeleteButton patched slightly or just "×" text) using `ActionButton`
- Replace the entire `ButtonsWrapper` with `ConfirmWrapper` when `confirmingDelete === true`

## State machine extension

```
Normal view:
  [Start|Pause] [Stop] [Delete×]
        ↓ click Delete×
Confirm view:
  "DELETE?" [✓ Confirm] [× Cancel]
        ↓ Confirm → onDelete(id)
        ↓ Cancel → back to Normal view
```

## Tasks

### Phase 1: Core Implementation

- [ ] Task 1: Update `Timer.tsx` — add confirm delete state + UI
- [ ] Task 2: Update docs — components.md, architecture.md

<!-- 🔄 Single commit after both tasks: feat: add inline confirmation before timer delete -->

## Task Details

### Task 1: Update Timer.tsx

**File:** `src/components/Timer/Timer.tsx`

Changes:
1. Add `const [confirmingDelete, setConfirmingDelete] = useState(false)` 
2. Change `<DeleteButton onClick={() => onDelete(id)} />` → `<DeleteButton onClick={() => setConfirmingDelete(true)} />`
3. Add conditional render: when `confirmingDelete`, show `ConfirmWrapper` instead of `ButtonsWrapper`
4. `ConfirmWrapper` contains:
   - A `ConfirmPrompt` styled span ("DELETE?")
   - `ConfirmButton` (ActionButton with ✓ SVG) → calls `onDelete(id)`
   - `CancelButton` (ActionButton with × SVG) → calls `setConfirmingDelete(false)`
5. Add the new styled components (`ConfirmWrapper`, `ConfirmPrompt`, `ConfirmButton`, `CancelButton`) at bottom of file

### Task 2: Update docs

**Files:** `docs/components.md`, `docs/architecture.md`

- `docs/components.md` → add "Confirm state" section to Timer component entry; note `confirmingDelete` internal state
- `docs/architecture.md` → extend state machine description to mention confirm-delete flow
