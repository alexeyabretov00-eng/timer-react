# Implementation Checklist: Delete Timer from List

**Feature**: Delete Timer from List  
**Branch**: `001-delete-timer`  
**Date Created**: 2026-02-18  
**Estimated Time**: 45 minutes (implementation + testing)

---

## Phase 1: Component Creation

### Step 1A: Create DeleteButton Component File
- [ ] Create directory: `src/components/DeleteButton/`
- [ ] Create file: `src/components/DeleteButton/DeleteButton.tsx`
- [ ] Import React from "react"
- [ ] Import ActionButton from "../ActionButton"
- [ ] Define DeleteButtonProps interface with `onClick: () => void`
- [ ] Export DeleteButton as React.FC<DeleteButtonProps>
- [ ] Add trash icon SVG (20x20px, #9E9E9E stroke color)
- [ ] Render ActionButton with onClick prop
- [ ] Verify: No TypeScript errors in file

**Acceptance Criteria**:
- File exists at correct path
- Component is stateless (no useState/useRef)
- SVG renders correctly (trash icon)
- Prop types properly defined
- BuildCommand passes: `npm run build`

---

### Step 1B: Create DeleteButton Barrel Export
- [ ] Create file: `src/components/DeleteButton/index.ts`
- [ ] Add line: `export { DeleteButton } from './DeleteButton';`
- [ ] Verify file syntax is correct

**Acceptance Criteria**:
- File exists at correct path
- Export statement is syntactically valid
- Import from this file in other modules works

---

## Phase 2: Update Timer Component

### Step 2A: Update Timer Props Interface
- [ ] Open `src/components/Timer/Timer.tsx`
- [ ] Find current Timer component definition (around line 20)
- [ ] Add to TimerProps interface:
  ```typescript
  interface TimerProps {
    id: string;
    onDelete: (id: string) => void;
  }
  ```
- [ ] Update component signature: `export const Timer: React.FC<TimerProps> = ({ id, onDelete }) => {`
- [ ] Remove old code without props if present
- [ ] Verify: TypeScript compiles without errors

**Acceptance Criteria**:
- Props interface includes both `id` and `onDelete`
- Component destructures both props
- No implicit `any` types
- Build passes

---

### Step 2B: Import DeleteButton in Timer
- [ ] Open `src/components/Timer/Timer.tsx`
- [ ] Find import section at top
- [ ] Add line: `import { DeleteButton } from '../DeleteButton';`
- [ ] Verify import path is correct

**Acceptance Criteria**:
- Import statement is syntactically correct
- Path points to barrel export
- No TypeScript errors

---

### Step 2C: Create delete handler in Timer
- [ ] Open `src/components/Timer/Timer.tsx`
- [ ] Find `onPaused` handler (around line 76)
- [ ] Add after `onPaused`, new handler:
  ```typescript
  const onDeleteClick = () => {
      clearTimeout(intervalId.current);
      start.current = 0;
      time.current = 0;
      pausedTime.current = 0;
      onDelete(id);
  }
  ```
- [ ] Verify all refs are reset
- [ ] Verify onDelete callback is called with id parameter
- [ ] Check: No TypeScript errors

**Acceptance Criteria**:
- Handler clears timeout first
- All refs reset to 0/null
- Parent callback invoked with correct ID
- No unintended state changes

---

### Step 2D: Render DeleteButton in Timer
- [ ] Open `src/components/Timer/Timer.tsx`
- [ ] Find ButtonsWrapper section (around line 112)
- [ ] Add DeleteButton to the JSX (after StopButton):
  ```typescript
  <DeleteButton onClick={onDeleteClick} />
  ```
- [ ] Verify button renders in all timer states
- [ ] Check JSX syntax

**Acceptance Criteria**:
- DeleteButton appears in ButtonsWrapper
- onClick is wired to onDeleteClick handler
- Renders without errors in dev server
- Visible alongside other action buttons

---

### Step 2E: Verify Timer Changes Complete
- [ ] Component props include id and onDelete ✓
- [ ] DeleteButton imported ✓
- [ ] Delete handler created with cleanup logic ✓
- [ ] DeleteButton rendered with correct props ✓
- [ ] `npm run build` passes ✓

---

## Phase 3: Update App Component

### Step 3A: Create Delete Handler in App
- [ ] Open `src/App.tsx`
- [ ] Find `onAdd` handler (around line 18)
- [ ] Add after `onAdd`, new handler:
  ```typescript
  const onDeleteTimer = (id: string) => {
      setTimers(timers.filter(timer => timer.id !== id));
  };
  ```
- [ ] Verify filter operation is immutable
- [ ] Check: Handler signature matches Timer's onDelete type

**Acceptance Criteria**:
- Handler accepts string parameter (timer ID)
- Uses array.filter() (immutable)
- updatesstimer state
- No TypeScript errors

---

### Step 3B: Update Timer Mapping with Delete Props
- [ ] Open `src/App.tsx`
- [ ] Find Timer rendering section (around line 35)
- [ ] Change from:
  ```typescript
  {timers.map(x => <Timer key={x.id} />)}
  ```
  To:
  ```typescript
  {timers.map(x => <Timer key={x.id} id={x.id} onDelete={onDeleteTimer} />)}
  ```
- [ ] Verify all props are passed correctly
- [ ] Check JSX syntax

**Acceptance Criteria**:
- `id` prop passed with `x.id`
- `onDelete` prop passed with `onDeleteTimer` handler
- `key` prop unchanged
- No TypeScript errors

---

### Step 3C: Verify App Changes Complete
- [ ] Delete handler created ✓
- [ ] Timer mapping updated with id prop ✓
- [ ] Timer mapping updated with onDelete prop ✓
- [ ] `npm run build` passes ✓

---

## Phase 4: Update Exports

### Step 4A: Add DeleteButton to Components Exports
- [ ] Open `src/components/index.ts`
- [ ] Add line: `export { DeleteButton } from './DeleteButton';`
- [ ] Verify file syntax is correct
- [ ] Check that other exports remain unchanged

**Acceptance Criteria**:
- Export statement added
- Syntax is correct
- Other exports not affected
- File can be imported by

---

## Phase 5: Build & Type Check

### Step 5A: Run TypeScript Compiler
- [ ] Open terminal in project root
- [ ] Run: `npm run build`
- [ ] Verify: No TypeScript errors
- [ ] Verify: No compilation errors

**Acceptance Criteria**:
- Build succeeds
- No type errors
- No warnings about implicit any
- Output artifacts generated

---

### Step 5B: Check for Lint Issues (if configured)
- [ ] Run: `npm run lint` (if available)
- [ ] Verify: No lint warnings/errors related to changes
- [ ] If no lint config, skip this step

**Acceptance Criteria**:
- No new lint violations
- Code style consistent with project

---

## Phase 6: Manual Testing

### Test 6A: Start Development Server
- [ ] Run: `npm run dev`
- [ ] Verify: Dev server starts without errors
- [ ] Open browser to http://localhost:5173 (or shown URL)
- [ ] Verify: App loads without errors

**Acceptance Criteria**:
- Dev server running
- App renders
- No console errors
- Delete buttons visible on timers

---

### Test 6B: User Story 1 - Multiple Timers (P1)
**Scenario**: User has multiple timers running, deletes one

- [ ] Click "Add Timer" three times to create 3 timers
- [ ] Click "Start" on each timer to run all 3
- [ ] Wait 2-3 seconds for timers to show elapsed time
- [ ] Click delete button on the middle timer (second one)
- [ ] **Verify**: Middle timer is removed from the list
- [ ] **Verify**: First and third timers continue running
- [ ] **Verify**: Time still incrementing on remaining timers
- [ ] **Verify**: No console errors

**Acceptance Criteria**:
- Deleted timer removed immediately
- Other timers continue without interruption
- No errors/warnings in console
- UI updates correctly

---

### Test 6C: User Story 2 - Delete Paused Timer (P1)
**Scenario**: User has a paused timer, deletes it

- [ ] Click "Add Timer"
- [ ] Click "Start" and let it run for 2-3 seconds
- [ ] Click "Pause"
- [ ] Verify timer is paused (display frozen)
- [ ] Click delete button on the paused timer
- [ ] **Verify**: Timer is removed from list
- [ ] **Verify**: List becomes empty (only "Add Timer" button visible)
- [ ] **Verify**: No console errors

**Acceptance Criteria**:
- Paused timer deleted successfully
- List updates correctly
- No lingering timer references

---

### Test 6D: User Story 3 - Delete Running Timer (P2)
**Scenario**: User deletes a timer while it's running

- [ ] Click "Add Timer"
- [ ] Click "Start"
- [ ] Let timer run for ~3 seconds
- [ ] Click delete button (WITHOUT clicking Stop first)
- [ ] **Verify**: Timer is removed immediately
- [ ] **Verify**: No stale updates after deletion
- [ ] **Verify**: No console errors

**Acceptance Criteria**:
- Running timer deleted without Stop needed
- Deletion is immediate (<100ms)
- No pending updates occur

---

### Test 6E: Edge Case - Empty State
**Scenario**: Delete all timers from list

- [ ] Click "Add Timer"
- [ ] Click delete immediately (while in idle state)
- [ ] **Verify**: Timer is removed
- [ ] **Verify**: Only "Add Timer" button visible
- [ ] **Verify**: Grid layout shows only the add button
- [ ] Click "Add Timer" again
- [ ] **Verify**: New timer appears with fresh ID

**Acceptance Criteria**:
- All timers can be deleted
- Empty state shows only AddButton
- New timer has unique ID (no collision)

---

### Test 6F: Performance Check
**Scenario**: Measure deletion performance

- [ ] Open browser DevTools (F12)
- [ ] Go to Performance tab
- [ ] Click "Start recording"
- [ ] Add 5 timers, start 3 of them
- [ ] Delete one of the running timers
- [ ] Stop recording
- [ ] **Verify**: Delete event <100ms total
- [ ] **Verify**: React render <50ms
- [ ] **Verify**: No long tasks or jank

**Acceptance Criteria**:
- Delete <100ms execution time
- Render <50ms
- No frame drops

---

### Test 6G: Memory Check
**Scenario**: Verify no memory leaks from deleted timers

- [ ] Open browser DevTools (F12)
- [ ] Go to Memory tab
- [ ] Click "Take heap snapshot" (before any deletes)
- [ ] Add 3 timers, start them
- [ ] Wait 5 seconds
- [ ] Delete one timer
- [ ] Force garbage collection: Click trash icon in DevTools
- [ ] Take another heap snapshot
- [ ] Compare snapshots:
  - [ ] **Verify**: No "Timer" component references in "Detached DOM Nodes"
  - [ ] **Verify**: No "intervalId" refs lingering
  - [ ] **Verify**: Memory freed from deleted timer

**Acceptance Criteria**:
- No memory leaks detected
- Deleted timer state fully cleaned
- Orphaned refs freed after GC

---

## Phase 7: Verification & Compliance

### Step 7A: Constitution Compliance Check
- [ ] **Component-Driven**: DeleteButton is stateless component ✓
- [ ] **Strict TypeScript**: All props explicitly typed ✓
- [ ] **Styled-Components**: Uses ActionButton (styled-components) ✓
- [ ] **Barrel Exports**: DeleteButton/index.ts created ✓
- [ ] **Immutable State**: Timer filtering via array.filter() ✓

**Acceptance Criteria**:
- All 5 constitution principles verified
- No violations present

---

### Step 7B: Code Review Checklist
- [ ] Props interfaces properly defined
- [ ] No implicit `any` types
- [ ] Variable names follow camelCase convention
- [ ] Event handlers follow on{Action} pattern
- [ ] Components are single-responsibility
- [ ] No inline function creation in props
- [ ] All cleanup code executes before callback
- [ ] State updates are immutable

**Acceptance Criteria**:
- Code follows project patterns
- No anti-patterns present
- Maintainable and clear

---

### Step 7C: All Spec Requirements Met
- [ ] **FR-001**: Timer accepts delete callback ✓
- [ ] **FR-002**: Delete button visible on all states ✓
- [ ] **FR-003**: Delete button triggers removal ✓
- [ ] **FR-004**: Internal cleanup before parent removal ✓
- [ ] **FR-005**: Deleted timer completely removed ✓
- [ ] **FR-006**: Deletion immediate (no loading state) ✓
- [ ] **FR-007**: Trash icon in gray (#9E9E9E, 20x20px) ✓
- [ ] **FR-008**: Empty state shows only AddButton ✓

**Acceptance Criteria**:
- All 8 functional requirements satisfied
- All acceptance scenarios pass
- All success criteria met

---

## Phase 8: Final Verification

### Step 8A: Files Checklist
- [ ] `src/components/DeleteButton/DeleteButton.tsx` — Created ✓
- [ ] `src/components/DeleteButton/index.ts` — Created ✓
- [ ] `src/components/Timer/Timer.tsx` — Updated (+12 lines) ✓
- [ ] `src/App.tsx` — Updated (+4 lines) ✓
- [ ] `src/components/index.ts` — Updated (+1 line) ✓

**Acceptance Criteria**:
- All required files created/modified
- No unintended changes
- Total ~33 lines changed

---

### Step 8B: Git Status Check
- [ ] Run: `git status`
- [ ] Verify: Only expected files modified
- [ ] No extraneous changes
- [ ] Ready for commit

**Acceptance Criteria**:
- Clean working directory
- All changes intentional

---

### Step 8C: Ready for Merge Review
- [ ] All tests passing ✓
- [ ] No TypeScript errors ✓
- [ ] Constitution compliant ✓
- [ ] All spec requirements met ✓
- [ ] Performance verified ✓
- [ ] Memory clean ✓
- [ ] Code reviewed ✓

**Acceptance Criteria**:
- Feature complete
- Ready for PR
- Ready for main branch merge

---

## Success Criteria Summary

| Category | Criteria | Status |
|----------|----------|--------|
| **Functional** | All 3 user stories passing (P1, P1, P2) | ▢ |
| **Technical** | No TypeScript errors | ▢ |
| **Code Quality** | Constitution compliant | ▢ |
| **Performance** | <100ms delete, <50ms render | ▢ |
| **Reliability** | No memory leaks, clean cleanup | ▢ |
| **UX** | Delete button visible, immediate removal | ▢ |

---

## Timeline

| Phase | Time | Status |
|-------|------|--------|
| 1. Component Creation | 5 min | ▢ |
| 2. Update Timer | 5 min | ▢ |
| 3. Update App | 2 min | ▢ |
| 4. Update Exports | 1 min | ▢ |
| 5. Build & Type Check | 5 min | ▢ |
| 6. Manual Testing | 15 min | ▢ |
| 7. Verification | 5 min | ▢ |
| 8. Final Check | 2 min | ▢ |
| **TOTAL** | **40 min** | ▢ |

---

## Troubleshooting Guide

### Issue: TypeScript Error - "Property 'id' does not exist"
**Solution**: Check Timer component has TimerProps interface with id field
```bash
# Verify: src/components/Timer/Timer.tsx line 1-3 has:
interface TimerProps {
  id: string;
  onDelete: (id: string) => void;
}
```

### Issue: Delete Button Doesn't Appear
**Solution**: Verify import and render in Timer.tsx
```bash
# Check 1: Import added
grep "import { DeleteButton }" src/components/Timer/Timer.tsx

# Check 2: Rendered in ButtonsWrapper
grep "<DeleteButton" src/components/Timer/Timer.tsx
```

### Issue: Timer Doesn't Delete on Click
**Solution**: Verify cleanup handler and prop wiring
```bash
# Check: onDeleteClick handler exists
grep "const onDeleteClick" src/components/Timer/Timer.tsx

# Check: DeleteButton onClick prop wired
grep "onClick={onDeleteClick}" src/components/Timer/Timer.tsx
```

### Issue: Build Fails with Errors
**Solution**: Check for TypeScript issues
```bash
npm run build 2>&1 | grep error
```

---

## Notes & Comments

- DeleteButton is intentionally stateless for maximum reusability
- Cleanup MUST execute before parent callback to prevent race conditions
- Timer IDs are never recycled (fresh UUID always)
- No keyboard accessibility in MVP (deferred to future enhancement)
- No undo/recovery available (acceptable for MVP)

---

## Sign-Off

**Developer**: ________________  
**Date**: ________________  
**Notes**: ________________________________________________

---

**Created**: 2026-02-18  
**Version**: 1.0.0
