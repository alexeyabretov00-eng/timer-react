## 1. Timer State Machine

- [x] 1.1 Add `'confirm-delete'` as a valid value to the `status` state in `Timer.tsx`
- [x] 1.2 Add a `preConfirmStatus` ref (`useRef`) to store the status at the moment the Delete button is clicked
- [x] 1.3 Update `handleDelete` to save current status to `preConfirmStatus` and set `status` to `'confirm-delete'` (instead of immediately deleting)
- [x] 1.4 Add `handleConfirmDelete` function: calls `clearTimeout(intervalId.current)` then `onDelete()`
- [x] 1.5 Add `handleCancelDelete` function: resets `status` back to `preConfirmStatus.current`

## 2. Confirm Delete Popup

- [x] 2.1 Create `src/components/ConfirmDeletePopup/ConfirmDeletePopup.tsx` — a `ReactDOM.createPortal`-based popup rendered into `document.body`, with a full-screen backdrop, "Delete this timer?" text, a Confirm button, and a Cancel button; built with styled-components only (no npm packages)
- [x] 2.2 Create `src/components/ConfirmDeletePopup/index.ts` and export the component
- [x] 2.3 Export `ConfirmDeletePopup` from `src/components/index.ts`
- [x] 2.4 In `Timer.tsx`, render `<ConfirmDeletePopup>` when `status === 'confirm-delete'`, passing `onConfirm` and `onCancel` props

## 3. Verify

- [x] 3.1 Run `npx tsc --noEmit` and fix any type errors
