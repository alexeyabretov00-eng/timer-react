# Quick Start: Delete Timer Feature

**Reference Implementation for Developers**  
**Feature**: Delete Timer from List  
**Estimated Time**: 15 minutes for experienced React developer

---

## Overview

Add delete functionality to the timer application by:
1. Creating a reusable DeleteButton component
2. Updating Timer component to accept delete callback
3. Adding delete handler to App component
4. Wiring components together with proper props

---

## Step-by-Step Implementation

### Step 1: Create DeleteButton Component (5 min)

**File**: `src/components/DeleteButton/DeleteButton.tsx`

```typescript
import React from "react"
import { ActionButton } from "../ActionButton"

export const DeleteButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (<ActionButton onClick={onClick}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5H18M8 8V14M12 8V14M3 5L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16L17 5M7 5V3C7 2.44772 7.44772 2 8 2H12C12.5523 2 13 2.44772 13 3V5" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </ActionButton>)
}
```

**Rationale**:
- Uses existing ActionButton styled component
- Trash icon SVG with #9E9E9E stroke color
- 20x20px viewBox matches other button icons
- Simple props: only `onClick` handler needed
- No internal state

### Step 2: Create DeleteButton Barrel Export (1 min)

**File**: `src/components/DeleteButton/index.ts`

```typescript
export { DeleteButton } from './DeleteButton';
```

---

### Step 3: Update Timer Component Props (2 min)

**File**: `src/components/Timer/Timer.tsx`

**At top of file, update the component definition**:

```typescript
// BEFORE
export const Timer = () => {
    const [value, setValue] = useState(0);
    // ...
}

// AFTER
interface TimerProps {
    id: string;
    onDelete: (id: string) => void;
}

export const Timer: React.FC<TimerProps> = ({ id, onDelete }) => {
    const [value, setValue] = useState(0);
    // ...
}
```

**Why**: Makes props explicit and types the delete callback parameter

---

### Step 4: Add DeleteButton Import (1 min)

**File**: `src/components/Timer/Timer.tsx`

**Add to imports at top**:

```typescript
import { DeleteButton } from '../DeleteButton';
```

---

### Step 5: Add Delete Handler (3 min)

**File**: `src/components/Timer/Timer.tsx`

**Insert after `onPaused` handler (~line 86)**:

```typescript
const onDeleteClick = () => {
    // Cleanup internal state first
    clearTimeout(intervalId.current);
    start.current = 0;
    time.current = 0;
    pausedTime.current = 0;
    
    // Then notify parent
    onDelete(id);
}
```

**Why**: Ensures all timer intervals are stopped and refs cleared before parent removal

---

### Step 6: Render DeleteButton (2 min)

**File**: `src/components/Timer/Timer.tsx`

**Find ButtonsWrapper section (~line 112-118), update it**:

```typescript
// BEFORE
<ButtonsWrapper>
    {['idle', 'paused'].includes(status) && <StartButton onClick={onStart} />}
    {status === 'started' && <PauseButton onClick={onPaused} />}
    <StopButton onClick={onStop} isActive={status === 'started'} />
</ButtonsWrapper>

// AFTER
<ButtonsWrapper>
    {['idle', 'paused'].includes(status) && <StartButton onClick={onStart} />}
    {status === 'started' && <PauseButton onClick={onPaused} />}
    <StopButton onClick={onStop} isActive={status === 'started'} />
    <DeleteButton onClick={onDeleteClick} />
</ButtonsWrapper>
```

**Why**: Makes delete button visible on all timer states, calls cleanup handler

---

### Step 7: Update App Component - Add Delete Handler (2 min)

**File**: `src/App.tsx`

**Add after `onAdd` function (~line 25)**:

```typescript
const onDeleteTimer = (id: string) => {
    setTimers(timers.filter(timer => timer.id !== id));
};
```

**Why**: Removes the deleted timer from the list immutably

---

### Step 8: Update App Component - Wire Props (1 min)

**File**: `src/App.tsx`

**Update Timer mapping (~line 36)**:

```typescript
// BEFORE
{timers.map(x => <Timer key={x.id} />)}

// AFTER
{timers.map(x => <Timer key={x.id} id={x.id} onDelete={onDeleteTimer} />)}
```

**Why**: Passes timer ID and delete handler to each Timer instance

---

### Step 9: Update Components Barrel Export (1 min)

**File**: `src/components/index.ts`

**Add export**:

```typescript
export { DeleteButton } from './DeleteButton';
```

---

## Testing the Feature

### Launch Dev Server

```bash
npm run dev
```

### Test Case 1: Delete from Multiple Timers (P1)

1. Click "Add Timer" 3 times
2. Start all 3 timers
3. Click delete on the middle timer
4. ✓ Verify: Middle timer removed, other 2 continue running
5. ✓ Verify: No jank/delay in UI update

### Test Case 2: Delete Paused Timer (P1)

1. Add a timer
2. Start it, let it run for 2 seconds
3. Click pause
4. Click delete
5. ✓ Verify: Timer removed from list
6. ✓ Verify: No error in console

### Test Case 3: Delete Running Timer (P2)

1. Add a timer
2. Start it
3. Click delete while running (don't click stop first)
4. ✓ Verify: Timer removed immediately
5. ✓ Verify: Interval cancelled (no more updates)

### Test Case 4: Delete All Timers

1. Add 1 timer
2. Click delete
3. ✓ Verify: Only "Add Timer" button visible
4. ✓ Verify: Can click "Add Timer" and timer appears

### Performance Check

1. Open DevTools → Performance tab
2. Start recording
3. Add 5 timers, start 3 of them
4. Delete one timer
5. Stop recording
6. ✓ Verify: Delete event takes <100ms
7. ✓ Verify: React render takes <50ms

### Memory Check

1. Open DevTools → Memory tab
2. Take heap snapshot before delete
3. Delete a timer
4. Take heap snapshot after delete
5. Compare snapshots
6. ✓ Verify: No "Timer" references in detached objects
7. ✓ Verify: No "intervalId" refs lingering

---

## Common Issues & Solutions

### Issue: TypeScript Error - "Property 'id' does not exist"

**Solution**: Ensure Timer component has props interface with `id: string`

```typescript
interface TimerProps {
    id: string;      // ← Add this
    onDelete: (id: string) => void;
}
```

### Issue: Delete Button Doesn't Appear

**Solution**: Check import and render

```typescript
import { DeleteButton } from '../DeleteButton';  // ← In Timer imports

<DeleteButton onClick={onDeleteClick} />  // ← In ButtonsWrapper
```

### Issue: Timer Doesn't Delete When Clicked

**Solution**: Verify cleanup handler and props are wired

```typescript
const onDeleteClick = () => {
    clearTimeout(intervalId.current);
    // ... reset refs ...
    onDelete(id);  // ← Must be called
}

// In App:
{timers.map(x => <Timer key={x.id} id={x.id} onDelete={onDeleteTimer} />)}
//                                                      ↑ Must pass handler
```

### Issue: Timer Continues Running After Delete

**Solution**: Ensure `clearTimeout` is called in cleanup

```typescript
const onDeleteClick = () => {
    clearTimeout(intervalId.current);  // ← CRITICAL
    start.current = 0;
    time.current = 0;
    pausedTime.current = 0;
    onDelete(id);
}
```

### Issue: Console Errors About Memory

**Solution**: Check useEffect cleanup is working

```typescript
// Ensure Timer component cleanup runs on unmount
useEffect(() => {
    // ... existing code ...
    return () => {
        clearTimeout(intervalId.current);
    };
}, [status]);
```

---

## File Checklist

After implementation, verify all changes:

- [ ] `src/components/DeleteButton/DeleteButton.tsx` created with trash icon
- [ ] `src/components/DeleteButton/index.ts` created with barrel export
- [ ] `src/components/Timer/Timer.tsx` updated with TimerProps interface
- [ ] `src/components/Timer/Timer.tsx` updated with DeleteButton import
- [ ] `src/components/Timer/Timer.tsx` updated with onDeleteClick handler
- [ ] `src/components/Timer/Timer.tsx` updated with DeleteButton render
- [ ] `src/App.tsx` updated with onDeleteTimer handler
- [ ] `src/App.tsx` updated with Timer mapping (id and onDelete props)
- [ ] `src/components/index.ts` updated with DeleteButton export
- [ ] `npm run dev` launches with no errors
- [ ] All test cases pass

---

## Constitution Compliance

✅ Verify implementation follows project constitution:

- [x] **Component-Driven**: DeleteButton is stateless, single responsibility
- [x] **TypeScript Strict**: All props typed (DeleteButtonProps, TimerProps)
- [x] **Styled-Components**: DeleteButton uses ActionButton styled component
- [x] **Barrel Exports**: DeleteButton/index.ts created
- [x] **Immutable State**: Timer filtering via array.filter()

---

## Branch & Commits

```bash
# Current branch
git branch  # Should show: * 001-delete-timer

# Review changes
git status  # Shows modified Timer.tsx, App.tsx, index.ts and untracked DeleteButton/

# Stage changes (command from speckit)
git add src/

# Commit (example)
git commit -m "feat: add delete button to timer cards

- Create DeleteButton component with trash icon
- Update Timer component to accept onDelete callback
- Add delete handler in App component
- All 3 user stories passing (P1, P1, P2)"

# Push (when ready)
git push origin 001-delete-timer
```

---

## Next Steps

1. ✅ Run implementation following steps above
2. ✅ Test all 4 test cases
3. ✅ Fix any issues using troubleshooting guide
4. → Run `/speckit.tasks` for detailed task checklist
5. → Create pull request when ready for review

---

**Time Estimate**: 15 minutes implementation + 10 minutes testing + 5 minutes fixes = 30 min total
