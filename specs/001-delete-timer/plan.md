# Implementation Plan: Delete Timer from List

**Branch**: `001-delete-timer` | **Date**: 2026-02-18 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-delete-timer/spec.md`

## Summary

Add delete button to each timer card enabling users to remove timers from the active list. Delete button displays a trash icon (#9E9E9E, 20x20px), clears internal timer state before triggering parent removal callback, and works seamlessly across all timer states. When last timer is deleted, only the "Add Timer" button remains visible. Feature supports sub-100ms deletion with zero memory leaks.

## Technical Context

**Language/Version**: TypeScript 4.9.3 with React 17.0.2  
**Primary Dependencies**: React 17.0.2, styled-components 5.3.6, Vite 4.2.0  
**Storage**: Local component state (immutable, no persistence)  
**Testing**: Not defined for this MVP (test coverage deferred)  
**Target Platform**: Web browser (React/Vite SPA)  
**Project Type**: React frontend single application  
**Performance Goals**: Delete operation completes in <100ms with zero UI jank  
**Constraints**: 
- No keyboard accessibility required (MVP scope - mouse/touch only)
- No undo/recovery functionality
- No confirmation modal required
- All state cleanup must occur synchronously before removal

**Scale/Scope**: Single-feature enhancement to existing timer application (5k LOC → ~5.5k LOC)

## Constitution Check

✅ **GATE PASSED** - No violations identified

| Principle | Assessment | Notes |
|-----------|-----------|-------|
| Component-Driven Architecture | ✅ Compliant | New DeleteButton component with single responsibility |
| Strict TypeScript | ✅ Compliant | DeleteButtonProps interface required, no implicit any |
| Styled-Components | ✅ Compliant | DeleteButton styled component, no inline styles |
| Barrel Exports | ✅ Compliant | DeleteButton/index.ts barrel export required |
| Immutable State | ✅ Compliant | Timer filtering via array.filter(), no mutations |

**Result**: Feature can proceed directly to implementation. No complexity justification needed.

---

## Phase 0: Research & Clarification

✅ **COMPLETE** - All clarifications resolved in specification session

No unknowns remain. All 5 clarification questions were resolved in specification session (2026-02-18):

1. ✅ Delete button visual design → Trash icon in #9E9E9E gray, 20x20px  
2. ✅ State cleanup sequence → Internal cleanup before parent removal  
3. ✅ Keyboard accessibility → Deferred - MVP is mouse/touch only  
4. ✅ Timer ID recycling → IDs never recycle - always fresh uuidv4()  
5. ✅ Empty state behavior → No message/placeholder - just "Add Timer" button

**No research artifacts needed** - specification is complete with all clarifications integrated.

---

## Phase 1: Design & Contracts

### 1.1 Data Model

See: [data-model.md](data-model.md)

**Core Entities**:

- **Timer**: `{ id: string; status: 'idle' | 'running' | 'paused'; value: number }`
  - Updated to accept `onDelete: (id: string) => void` callback prop
  
- **TimerList**: `Array<{id: string}>` maintained at App component level
  
- **DeleteAction**: Synchronous removal via `(timerId: string) => void` callback
  - Internal cleanup → Parent callback → Array filter → State update

**State Mutations**:
- Timer component: Clear `intervalId` ref, reset state values via cleanup function
- App component: `setTimers(timers.filter(t => t.id !== id))`

### 1.2 Component Contracts

See: `/contracts/` directory

**DeleteButton Component**
```typescript
interface DeleteButtonProps {
  onClick: () => void;
}
export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => { /* ... */ }
```
- Input: Click handler callback
- Output: Interactive button with trash SVG icon
- Render: `<ActionButton onClick={onClick}><svg>trash-icon</svg></ActionButton>`
- Side effects: None (fully stateless)

**Timer Component Update**
```typescript
interface TimerProps {
  id: string;
  onDelete: (id: string) => void;
}
```
- New prop: `id: string` (for callback parameter)
- New prop: `onDelete: (id: string) => void` (deletion callback)
- New behavior: Delete button appears in ButtonsWrapper
- Cleanup sequence:
  1. Clear `intervalId.current` via `clearTimeout()`
  2. Reset ref values: `start.current = 0`, `time.current = 0`, `pausedTime.current = 0`
  3. Reset state: User's cleanup function before calling `onDelete(id)`
  4. Call parent: `onDelete(id)` - triggers App-level removal

**App Component Update**
```typescript
const onDeleteTimer = (id: string) => {
  setTimers(timers.filter(timer => timer.id !== id));
};

<Timer key={id} id={id} onDelete={onDeleteTimer} />
```
- New handler: `onDeleteTimer` filters deleted timer from state
- Updated mapping: Pass `id` and `onDelete` to Timer
- Side effects: Triggers Timer unmount, cleanup via React effects

### 1.3 Quick Start Guide

See: [quickstart.md](quickstart.md)

**Development Checklist**:

```
☐ Create DeleteButton component (new file)
☐ Add DeleteButton to Timer (3 lines: import, ref, render)
☐ Update Timer props interface (add id, onDelete)
☐ Add Timer.tsx delete handler and cleanup logic
☐ Add App.tsx delete handler
☐ Update components barrel export
☐ Manual test: All 3 user stories
☐ Verify: No lingering intervals/refs
☐ Verify: <100ms deletion performance
```

### 1.4 Architecture Diagram

```
App Component (State: timers[])
    ↓
    ├─→ Timer Component (Props: id, onDelete)
    │       ↓
    │       ├─→ DeleteButton (Props: onClick)
    │       │       ↓
    │       │   [Trash Icon 20x20px]
    │       │       ↑
    │       │   (User clicks)
    │       │
    │       └─→ onDeleteClick handler
    │           1. cleanup(): clearTimeout + reset refs
    │           2. onDelete(id) callback
    │               ↓
    │           App receives callback
    │           filter + setTimers
    │           ↓
    │       Timer unmounts
    │       React cleanup: useEffect returns
    │
    └─→ AddButton

Result: User removed, other timers continue
```

---

## Implementation Tasks

### Required for Feature Completion (P1)

1. **Create DeleteButton Component File**
   - Path: `src/components/DeleteButton/DeleteButton.tsx`
   - Lines: 12-15
   - Task: Import React, ActionButton, styled-components; define DeleteButtonProps; export DeleteButton functional component

2. **Create DeleteButton Barrel Export**
   - Path: `src/components/DeleteButton/index.ts`
   - Lines: 1
   - Task: Export DeleteButton from component file

3. **Update Timer Component Props Interface**
   - Path: `src/components/Timer/Timer.tsx`
   - Lines: 1-3
   - Task: Add `id: string` and `onDelete: (id: string) => void` to TimerProps interface

4. **Add Delete Handler to Timer Component**
   - Path: `src/components/Timer/Timer.tsx`
   - Lines: ~85-92
   - Task: Create `onDeleteClick` handler that cleanups state then calls callback

5. **Render DeleteButton in Timer Component**
   - Path: `src/components/Timer/Timer.tsx`
   - Lines: ~115-120
   - Task: Import DeleteButton; add to ButtonsWrapper; wire onClick

6. **Add DeleteButton to Components Index**
   - Path: `src/components/index.ts`
   - Lines: +1
   - Task: Export DeleteButton

7. **Create Delete Handler in App Component**
   - Path: `src/App.tsx`
   - Lines: ~25-28
   - Task: `const onDeleteTimer = (id: string) => setTimers(...filter)`

8. **Update Timer Mapping in App Component**
   - Path: `src/App.tsx`
   - Lines: ~38
   - Task: Change `<Timer key={x.id} />` to `<Timer key={x.id} id={x.id} onDelete={onDeleteTimer} />`

9. **Manual User Story Testing**
   - Launch dev server: `npm run dev`
   - Test P1 Story 1: Multiple timers, delete one, others continue ✓
   - Test P1 Story 2: Delete paused timer ✓
   - Test P2 Story 3: Delete running timer ✓
   - Verify no lingering intervals in DevTools

### Future Enhancements (P2)

- [ ] Add `window.confirm()` for destructive action warning
- [ ] Add keyboard accessibility (Tab focus + Enter/Space)
- [ ] Undo with toast notification
- [ ] Animation/transition on removal
- [ ] Test coverage (unit + integration)

---

## Files Changed Summary

### Create (2 files, ~15 lines)
- `src/components/DeleteButton/DeleteButton.tsx` — New component with trash icon
- `src/components/DeleteButton/index.ts` — Barrel export

### Modify (3 files, ~18 lines total)
- `src/components/Timer/Timer.tsx` — Add props, cleanup handler, DeleteButton render (+12 lines)
- `src/App.tsx` — Add handler, update mapping (+4 lines)
- `src/components/index.ts` — Export DeleteButton (+1 line)

**Total**: 2 new files, 3 modified files, ~33 lines changed

---

## Success Criteria Validation

Feature is complete when:

✅ **Functional Completeness**
- [ ] User Story 1 (P1): Multiple timers - delete one, others continue
- [ ] User Story 2 (P1): Paused timer - deleted successfully
- [ ] User Story 3 (P2): Running timer - deleted without stopping first
- [ ] Edge case: Rapid delete + add - new timer gets fresh ID
- [ ] Edge case: Empty list - only "Add Timer" visible
- [ ] All 8 Functional Requirements pass acceptance criteria

✅ **Code Quality**
- [ ] No TypeScript compilation errors
- [ ] All component props explicitly typed
- [ ] All styled-components use consistent naming (DeleteButtonStyled)
- [ ] Immutable state handling: array.filter() used
- [ ] Barrel exports in place for DeleteButton

✅ **Performance & Reliability**
- [ ] Delete completes in <100ms (DevTools measurement)
- [ ] No memory leaks: DevTools heap snapshots show no orphaned timer refs
- [ ] No console errors or warnings
- [ ] Remaining timers unaffected by deletion

✅ **UI & UX**
- [ ] Delete button visible on all timer cards (idle/running/paused)
- [ ] Trash icon renders correctly at 20x20px in gray (#9E9E9E)
- [ ] Empty state: Only AddButton visible when no timers

---

## Next Steps

1. ✅ **Specification complete** - Ready for implementation
2. **→ Generate tasks** - Run `/speckit.tasks` to create detailed task list
3. **Implement features** - Follow task breakdown in tasks.md
4. **Manual testing** - Validate all acceptance scenarios
5. **Code review** - Verify constitution compliance
6. **Merge to main** - PR ready when all criteria pass

**Status**: ✅ Implementation Plan Complete - Ready for Task Generation

---

**Generated**: 2026-02-18 | **Branch**: `001-delete-timer` | **Version**: 1.0.0
