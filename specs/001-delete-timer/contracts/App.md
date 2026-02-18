# App Component Contract (Updated)

**Location**: `src/App.tsx`

## Changes Summary

Add delete handler and update Timer mapping to wire onDelete callback to each timer instance.

## Type Signature (Updated)

```typescript
export const App = () => {
  const [timers, setTimers] = useState<Array<{ id: string }>>([]);
  
  const onAdd = () => { /* unchanged */ }
  const onDeleteTimer = (id: string): void => { /* new */ }
  
  return JSX.Element;
}
```

## New Methods

### onDeleteTimer

```typescript
const onDeleteTimer = (id: string): void => {
  setTimers(timers.filter(timer => timer.id !== id));
}
```

**Purpose**: Remove a timer from the active list by filtering it out

**Parameters**:
- `id: string` - Unique timer identifier to remove

**Behavior**:
1. Filter timers array with immutable array operation
2. Keep all timers whose ID does not match `id`
3. Invoke setTimers with new array
4. React re-renders, unmounting deleted timer component

**Return**: void

**Guarantees**:
- Immutable state update (creates new array instance)
- Synchronous operation
- Exactly one timer removed per call
- No error handling (all input valid by contract)

## State Changes

### Before Delete

```typescript
timers = [
  { id: 'abc123' },
  { id: 'def456' },  // ← to be deleted
  { id: 'ghi789' }
]
```

### After onDeleteTimer('def456')

```typescript
timers = [
  { id: 'abc123' },
  { id: 'ghi789' }
]
```

## Timer Mapping Update

**Before**:
```typescript
{timers.map(x => <Timer key={x.id} />)}
```

**After**:
```typescript
{timers.map(x => <Timer key={x.id} id={x.id} onDelete={onDeleteTimer} />)}
```

**Required Props**:
- `key={x.id}` - Existing React key (unchanged)
- `id={x.id}` - NEW: Pass timer ID to component
- `onDelete={onDeleteTimer}` - NEW: Pass handler to component

## Data Flow

```
User interaction:
  1. User clicks DeleteButton in Timer #2
  2. Timer.onDeleteClick() executes
  3. Timer cleanup happens (refs cleared, intervals stopped)
  4. Timer invokes onDelete('timer-id-2')
  
  ↓ Callback received by App

App handling:
  5. App.onDeleteTimer('timer-id-2') called
  6. setTimers called with filtered array
  7. React re-renders App
  8. Timer #2 not in new array, unmounts
  9. useEffect cleanup in Timer runs (extra cleanup safety)
  
Result:
  10. Timer list updated in UI
  11. Other timers continue running
  12. Memory freed from unmounted component
```

## Constraints

- **Immutable**: Uses array.filter(), no mutations
- **Synchronous**: No async operations
- **Single Removal**: Exactly one timer removed per call
- **State Consistency**: Called only from Timer delete handler

## Edge Cases Handled

| Scenario | Behavior | Notes |
|----------|----------|-------|
| Delete non-existent ID | Filters, array unchanged | Safe operation (no-op) |
| Delete while other timers running | Only deleted timer removed | Others continue unaffected |
| Delete all timers | Array becomes empty | App displays only AddButton |
| Rapid delete-and-add | Array updates twice | New timer gets fresh UUID (no collision) |

## Performance Characteristics

| Operation | Time | Notes |
|-----------|------|-------|
| Filter operation | <1ms | Small array (typically <10 items) |
| setTimers call | <1ms | State update scheduling |
| React render | <20ms for small arrays | DOM update for grid layout only |
| **Total** | **<25ms** | Well under 100ms target |

## Files Modified

```
src/App.tsx
├── Add onDeleteTimer handler (~2 lines)
└── Update Timer mapping (~1 line)
```

## Breaking Changes

None - this is additive, but Timer component now **requires** props:

```typescript
// OLD (still works for now if optional, but spec requires both)
<Timer />

// NEW (required by Timer.tsx update)
<Timer id={id} onDelete={handler} />
```

## Testing Requirements

### Unit Tests

```typescript
// onDeleteTimer removes timer with matching ID
// onDeleteTimer keeps other timers unchanged
// onDeleteTimer handles empty array edge case
```

### Integration Tests

```typescript
// App renders multiple timers
// Click delete on one
// Verify: One timer removed from list
// Verify: Count decreases by 1
// Verify: Other timers unaffected
```

## Stale Closures & Memoization

```typescript
// Current (no memoization needed for MVP)
const onDeleteTimer = (id: string) => {
  setTimers(timers.filter(timer => timer.id !== id));
}
```

**Why no memo**: 
- Small array size
- Simple operation
- Re-creation per render is negligible
- Complexity not justified for MVP

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-18 | Add onDeleteTimer handler and Timer prop mapping |

---

**Contract Status**: ✅ Approved for Implementation
