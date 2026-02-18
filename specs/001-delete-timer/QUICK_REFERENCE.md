# Quick Reference: Delete Timer Implementation

**Print this page or bookmark it while implementing**

---

## Files to Create

```
src/components/DeleteButton/
├── DeleteButton.tsx     ← New component with trash icon
└── index.ts             ← export { DeleteButton }
```

**Lines of code to add**: ~33 total

---

## Files to Modify

```
Timer: +12 lines
├─ Add: TimerProps interface (id, onDelete)
├─ Add: DeleteButton import
├─ Add: onDeleteClick handler (cleanup + callback)
└─ Add: <DeleteButton onClick={onDeleteClick} /> in render

App: +4 lines
├─ Add: onDeleteTimer handler (filter timers array)
└─ Update: Timer mapping with id and onDelete props

Components Index: +1 line
└─ Add: export { DeleteButton }
```

---

## Step-by-Step

### 1. Create DeleteButton/DeleteButton.tsx
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

### 2. Create DeleteButton/index.ts
```typescript
export { DeleteButton } from './DeleteButton';
```

### 3. Update Timer.tsx
```typescript
// Add interface at top
interface TimerProps {
  id: string;
  onDelete: (id: string) => void;
}

// Update component signature
export const Timer: React.FC<TimerProps> = ({ id, onDelete }) => {

// Add import
import { DeleteButton } from '../DeleteButton';

// Add handler (after onPaused)
const onDeleteClick = () => {
  clearTimeout(intervalId.current);
  start.current = 0;
  time.current = 0;
  pausedTime.current = 0;
  onDelete(id);
}

// Add to ButtonsWrapper (after StopButton)
<DeleteButton onClick={onDeleteClick} />
```

### 4. Update App.tsx
```typescript
// Add handler (after onAdd)
const onDeleteTimer = (id: string) => {
  setTimers(timers.filter(timer => timer.id !== id));
};

// Update Timer mapping
{timers.map(x => <Timer key={x.id} id={x.id} onDelete={onDeleteTimer} />)}
```

### 5. Update src/components/index.ts
```typescript
export { DeleteButton } from './DeleteButton';
```

### 6. Verify
```bash
npm run build    # Should pass with no errors
npm run dev      # Start server and test
```

---

## Test Cases

| # | User Story | Test | Pass |
|---|-----------|------|------|
| 1 | Multiple timers - delete one | Add 3, start all, delete middle | ▢ |
| 2 | Delete paused timer | Pause timer, delete | ▢ |
| 3 | Delete running timer | Delete without stopping | ▢ |
| 4 | Empty state | Delete all, only AddButton shows | ▢ |
| 5 | Performance | Delete <100ms | ▢ |
| 6 | Memory | No leaks (heap check) | ▢ |

---

## Verification

```
✓ TypeScript: npm run build (no errors)
✓ Components: DeleteButton renders, delete works
✓ Props: Timer accepts id and onDelete
✓ Cleanup: onDeleteClick clears intervals/refs
✓ Parent: App removes timer from list
✓ UI: Delete button visible on all states
✓ Empty state: Only AddButton when no timers
✓ Constitution: No violations
```

---

## Common Mistakes

❌ **Forgetting to clear timeout** → Timer keeps updating after delete  
✓ **Always** call `clearTimeout(intervalId.current)` first

❌ **Calling parent callback before cleanup** → Race conditions  
✓ **Always** cleanup first, callback last

❌ **Mutating timers array** → React doesn't detect change  
✓ **Always** use `timers.filter(...)` (immutable)

❌ **Not passing ID prop to Timer** → onDelete receives undefined  
✓ **Always** pass `id={x.id}` when rendering Timer

---

## Dev Server

```bash
npm run dev          # Start server
# Open http://localhost:5173
# Test all 6 test cases above
# Check DevTools console for errors
```

---

## Time Budget

```
Code: 10 min (create files + add lines)
Test: 15 min (manual testing)
Fix:  ~5 min (if issues found)
Total: ~30 min
```

---

**Ready? Start with Step 1 above →**
