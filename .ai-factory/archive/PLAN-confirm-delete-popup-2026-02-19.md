# Implementation Plan: Confirm Delete → Popup Modal

Branch: feature/confirm-delete-timer
Created: 2026-02-19

## Settings
- Testing: no
- Docs: yes
- Auto-commit: no

## Overview

Replace the existing inline "DELETE? [✓] [×]" row inside the timer card with a full-screen popup modal overlay. Clicking `×` opens a centered dialog above everything; confirming removes the timer, cancelling closes the dialog.

## Approach

New **`ConfirmDialog`** component renders a `position:fixed` overlay with a centred dark-themed card. `Timer.tsx` renders it as a sibling to `<Block>` (wrapped in a fragment) when `confirmingDelete === true`. The inline confirm row and its styled components are removed.

## Component Structure

```
src/components/ConfirmDialog/
├── ConfirmDialog.tsx        # Component
├── ConfirmDialog.styled.tsx # Overlay, Card, Message, Buttons styled components
└── index.ts                 # export { ConfirmDialog } from './ConfirmDialog'
```

## Tasks

### Phase 1: Build

- [x] Task 1: Create `ConfirmDialog` component + styled file + barrel export
- [x] Task 2: Update `Timer.tsx` — render `<ConfirmDialog>` and remove inline confirm row
- [x] Task 3: Clean up `Timer.styled.tsx` — remove `ConfirmWrapper`, `ConfirmPrompt`, `ConfirmButton`, `CancelButton`

### Phase 2: Docs

- [x] Task 4: Update docs — components.md, architecture.md, getting-started.md, README.md

<!-- Single commit (manual): feat: replace inline confirm with popup dialog -->

## Task Details

### Task 1: Create ConfirmDialog

**Files:**
- `src/components/ConfirmDialog/ConfirmDialog.tsx`
- `src/components/ConfirmDialog/ConfirmDialog.styled.tsx`
- `src/components/ConfirmDialog/index.ts`

Also add `export { ConfirmDialog } from './ConfirmDialog';` to `src/components/index.ts`.

**Props:**
```tsx
interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}
```

**Render structure:**
```
<Overlay onClick={onCancel}>
  <Card onClick={e => e.stopPropagation()}>
    <Message>Delete this timer?</Message>
    <Buttons>
      <CancelBtn onClick={onCancel}>Cancel</CancelBtn>
      <ConfirmBtn onClick={onConfirm}>Delete</ConfirmBtn>
    </Buttons>
  </Card>
</Overlay>
```

**Styles (dark theme):**
- `Overlay`: `position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:100`
- `Card`: `background:#353638; padding:24px 32px; display:flex; flex-direction:column; gap:20px; min-width:200px`
- `Message`: `color:#9E9E9E; font-size:14px; text-align:center`
- `ConfirmBtn`: `color:#ffffff; background:transparent; border:1px solid #ffffff; cursor:pointer; padding:6px 16px; font-size:12px`
- `CancelBtn`: `color:#9E9E9E; background:transparent; border:1px solid #9E9E9E; cursor:pointer; padding:6px 16px; font-size:12px`
- `Buttons`: `display:flex; gap:12px; justify-content:center`

### Task 2: Update Timer.tsx

- Add `import { ConfirmDialog } from '../ConfirmDialog'`
- Remove `ConfirmWrapper`, `ConfirmPrompt`, `ConfirmButton`, `CancelButton` from the `Timer.styled` import
- Replace the conditional `confirmingDelete ? <ConfirmWrapper>...</ConfirmWrapper> : <ButtonsWrapper>...` with just `<ButtonsWrapper>...</ButtonsWrapper>` (always render the button row)
- Wrap the whole return in a `<>...</>` fragment
- After `</Block>`, add: `{confirmingDelete && <ConfirmDialog onConfirm={() => onDelete(id)} onCancel={() => setConfirmingDelete(false)} />}`

### Task 3: Clean up Timer.styled.tsx

Remove exports: `ConfirmWrapper`, `ConfirmPrompt`, `ConfirmButton`, `CancelButton`.
Keep: `TimerStyled`, `ButtonsWrapper`, `Separator`.

### Task 4: Update docs

- `docs/components.md` — replace inline confirm description with popup description for Timer; add `ConfirmDialog` component entry
- `docs/architecture.md` — update state machine confirm-delete description; add `ConfirmDialog/` to directory structure
- `docs/getting-started.md` — update step 6 wording to describe popup
- `README.md` — update Example block to reflect popup instead of inline confirm row
