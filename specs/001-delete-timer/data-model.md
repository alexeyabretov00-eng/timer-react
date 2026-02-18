# Data Model: Delete Timer Feature

**Feature**: Delete Timer from List  
**Date**: 2026-02-18  
**Scope**: Component prop updates + parent callback integration

---

## Entities

### Timer Entity (Updated)

**Purpose**: Represents a single timer in the active list with delete capability

**Type Definition**:
```typescript
interface Timer {
  id: string;
  status: 'idle' | 'running' | 'paused';
  value: number;
}

interface TimerProps {
  id: string;
  onDelete: (id: string) => void;
}
```

**Fields**:

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | `string` | Unique timer identifier passed to onDelete callback | UUID v4, immutable, never recycled |
| `status` | `'idle' \| 'running' \| 'paused'` | Current timer state | See state machine |
| `value` | `number` | Accumulated milliseconds elapsed | ≥ 0, updated every 100ms |
| `onDelete` | `(id: string) => void` | Delete callback from parent | Must be called after cleanup |

**State Machine**:
```
┌─────────┐
│  idle   │ ←──────────────────┐
└────┬────┘                    │
     │ onStart()               │ reset() / delete
     ↓                         │
┌─────────┐     onPaused()    ┌─────────┐
│ running │────────────→│ paused │
└────┬────┘              └────┬────┘
     │ onStop() / delete      │ onStart() / delete
     └──────────────────┬─────┘
                        ↓
                    cleanup
                    remove from list
```

**Lifecycle**:

1. **Creation**: App creates timer with fresh UUID
   - `{ id: uuidv4(), status: 'idle', value: 0 }`

2. **Deletion** (from any state):
   - User clicks DeleteButton
   - Timer.onDeleteClick() called
   - Cleanup logic executes:
     - `clearTimeout(intervalId.current)` - stop any pending update
     - `start.current = 0` - reset start timestamp
     - `time.current = 0` - reset elapsed time
     - `pausedTime.current = 0` - reset pause timestamp
     - Clear any pending state updates
   - `onDelete(id)` callback invoked with timer ID
   - App filters timer from list
   - Component unmounts
   - React cleanup phase: any useEffect return() calls execute

3. **Memory Cleanup**:
   - All refs cleared before unmount
   - No dangling setTimeout/setInterval
   - No orphaned component state
   - Parent maintains clean timers array

---

### TimerList Entity (Updated)

**Purpose**: Array of active timers managed at App level

**Type Definition**:
```typescript
interface TimerListState {
  timers: Array<{ id: string }>;
}

interface AppProps {} // Stateless function component

interface AppState {
  timers: Array<{ id: string }>;
}
```

**Structure**:
```typescript
// App.tsx
const [timers, setTimers] = useState<Array<{ id: string }>>([]);

// Operations:
// Add timer
setTimers([...timers, { id: uuidv4() }]);

// Remove timer (delete operation)
setTimers(timers.filter(timer => timer.id !== deletedId));
```

**Constraints**:
- Must maintain insertion order (flex layout respects order)
- Each timer ID must be unique within list
- Ids are never recycled within session
- Deletions are permanent (no recovery mechanism)

---

### DeleteAction Entity (New)

**Purpose**: Encapsulates the deletion operation with guaranteed cleanup sequence

**Type Definition**:
```typescript
type DeleteTimerCallback = (id: string) => void;

interface DeleteActionContext {
  timerId: string;
  cleanup: () => void;
  triggerRemoval: () => void;
}
```

**Execution Flow**:

```
User clicks DeleteButton
       ↓
DeleteButton.onClick triggered
       ↓
Timer.onDeleteClick handler
       ├─→ 1. CLEANUP PHASE (synchronous)
       │       ├─→ clearTimeout(intervalId.current)
       │       ├─→ Reset all refs to 0/null
       │       └─→ Clear any pending setState
       │
       ├─→ 2. CALLBACK PHASE (synchronous)
       │       └─→ onDelete(id) ← parent callback
       │
       └─→ 3. PARENT REMOVAL PHASE
               └─→ App.onDeleteTimer(id)
                   └─→ setTimers(timers.filter(...))
                       └─→ React re-renders
                           └─→ Timer component unmounts
                               └─→ useEffect cleanup runs
```

**Guarantees**:
- Cleanup ALWAYS executes before removal
- No stale updates can occur after delete
- Parent callback receives valid timer ID
- Synchronous execution (no race conditions)
- <100ms total execution time

---

## State Transitions

### Valid Delete Transitions

From any state (idle, running, paused):

```
┌─────────────────────────────┐
│ Timer State (any)           │
│ - idle                      │
│ - running                   │
│ - paused                    │
└──────────┬──────────────────┘
           │ user clicks delete
           ↓
    ┌─ ─ ─ ─ ─ ┐
    │ CLEANUP  │ (synchronous)
    │ ─ ─ ─ ─ ─│
    │ No state │
    │ changes  │
    └──────┬───┘
           │ complete
           ↓
    ┌─ ─ ─ ─ ─ ┐
    │ CALLBACK │ (onDelete)
    │ ─ ─ ─ ─ ─│
    │ Parent   │
    │ filters  │
    └──────┬───┘
           │
           ↓
    ┌──────────────┐
    │   REMOVED    │
    │ from list    │
    │ unmounts     │
    └──────────────┘
```

---

## Immutability Constraints

### Parent State Update

❌ **WRONG** - Direct mutation:
```typescript
const onDelete = (id: string) => {
  timers.splice(timers.findIndex(t => t.id === id), 1);  // ✗ Mutates array
  setTimers(timers);  // ✗ React doesn't detect change
};
```

✅ **CORRECT** - Immutable filter:
```typescript
const onDeleteTimer = (id: string) => {
  setTimers(timers.filter(timer => timer.id !== id));  // ✓ New array instance
};
```

### Component State Cleanup

Timer component cleanup happens before parent callback:

```typescript
const onDeleteClick = () => {
  // ✓ Cleanup refs first
  clearTimeout(intervalId.current);
  start.current = 0;
  time.current = 0;
  pausedTime.current = 0;
  
  // ✓ Then notify parent
  onDelete(id);
};
```

---

## Naming Conventions (Per Constitution)

### Component Props
- Interface: `TimerProps` (name + "Props" suffix)
- Callback: `onDelete` (on + Action pattern)
- Method: `onDeleteClick` (handler prefix + description)

### Styled Components
- Name: `DeleteButtonStyled` (ComponentName + "Styled" suffix)
- Scope: Colocated in DeleteButton.tsx

### State Variables
- Refs: `intervalId`, `start`, `time`, `pausedTime` (camelCase, descriptive)
- Status: `status` (required state, not boolean, not "isX")
- Handler: `onDeleteClick` (on + Action pattern)

---

## Performance Characteristics

| Operation | Target | Measurement |
|-----------|--------|------------|
| Delete execution | <100ms | Total time from click to React re-render |
| Cleanup phase | <1ms | clearTimeout + ref resets |
| State update | <5ms | App filter + setTimers |
| UI render | <50ms | Children unchanged, parent updates grid layout |
| Memory | <1 orphaned ref | All timer refs cleared on delete |

---

## Error Handling & Edge Cases

### No Error Conditions

Delete operation is synchronous and guaranteed to succeed. No error states defined because:
- Timer ID always valid (passed from component)
- Cleanup operations always safe (no external dependencies)
- Parent callback always callable (required prop)

### Edge Cases Handled

1. **Delete while pending interval update**
   - Cleanup phase clears `intervalId.current`
   - Pending setTimeout never fires
   - ✓ No stale state updates

2. **Delete then immediately add**
   - New timer gets fresh UUID not recycled
   - ✓ No ID collisions

3. **Delete from running state**
   - Cleanup cancels timeout
   - ✓ Interval stops immediately

4. **Delete from paused state**
   - Timer already not updating
   - ✓ Cleanup succeeds, removal clean

5. **Delete all timers**
   - Array becomes empty
   - ✓ App shows only AddButton per FR-008

---

## Data Flow Example

**Scenario**: User has 3 running timers, deletes timer #2

```
Initial State:
  timers = [
    { id: 'abc123' },  // Timer #1 - running
    { id: 'def456' },  // Timer #2 - running (DELETE THIS)
    { id: 'ghi789' }   // Timer #3 - running
  ]

User clicks delete on timer #2:

1. Timer #2 component receives onClick
2. Timer#2.onDeleteClick() executes
   - clearTimeout(intervalId.current) ← Stops update loop
   - start.current = 0
   - time.current = 0
   - pausedTime.current = 0
3. onDelete('def456') callback invoked with ID
4. App.onDeleteTimer('def456') receives callback:
   - setTimers(timers.filter(t => t.id !== 'def456'))
5. React re-renders App
6. Timer #2 component unmounts
7. useEffect cleanup executes

Result State:
  timers = [
    { id: 'abc123' },  // Still running ✓
    { id: 'ghi789' }   // Still running ✓
  ]

Grid layout updates, showing 2 timers
```

---

## Validation Rules

### Pre-Delete
- Timer ID must exist in list
- Timer can be any status (idle/running/paused)
- onDelete callback must be function type

### Post-Delete
- Timer ID removed from list
- All refs/state cleared in component
- No timer in list with deleted ID
- Remaining timers unaffected
- Memory freed (no orphaned refs)

---

**Version**: 1.0.0 | **Date**: 2026-02-18
