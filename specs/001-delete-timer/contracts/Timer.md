# Timer Component Contract (Updated)

**Location**: `src/components/Timer/Timer.tsx`

## Changes Summary

Update Timer component to accept delete callback prop and cleanup internal state before triggering parent removal.

## Type Signature (Updated)

```typescript
interface TimerProps {
  id: string;
  onDelete: (id: string) => void;
}

export const Timer: React.FC<TimerProps> = ({ id, onDelete }) => JSX.Element;
```

## Props Contract (Updated)

| Prop | Type | Required | Description | Default |
|------|------|----------|-------------|---------|
| `id` | `string` | ✓ Yes | Unique timer identifier, passed to onDelete callback | N/A |
| `onDelete` | `(id: string) => void` | ✓ Yes | Callback invoked when delete action triggered | N/A |

**Previous props remain unchanged**

## New Methods

### onDeleteClick

```typescript
const onDeleteClick = (): void => {
  // 1. Cleanup internal state
  clearTimeout(intervalId.current);
  start.current = 0;
  time.current = 0;
  pausedTime.current = 0;
  
  // 2. Notify parent
  onDelete(id);
}
```

**Purpose**: Cancel internal timer intervals and clear all state before notifying parent

**Execution Order** (CRITICAL):
1. Clear timeout first (stops any pending setState)
2. Reset all ref values
3. Call parent callback last

**Return**: void (no return value)

## Rendering Changes

### DeleteButton Addition

**Location**: In ButtonsWrapper (alongside StartButton, PauseButton, StopButton)

```typescript
<ButtonsWrapper>
  {['idle', 'paused'].includes(status) && <StartButton onClick={onStart} />}
  {status === 'started' && <PauseButton onClick={onPaused} />}
  <StopButton onClick={onStop} isActive={status === 'started'} />
  <DeleteButton onClick={onDeleteClick} />
</ButtonsWrapper>
```

**Visibility**: DeleteButton visible in all timer states (idle, running, paused)

## Cleanup Sequence Guarantee

When delete is triggered:

1. **Internal Cleanup** (synchronous)
   - `clearTimeout(intervalId.current)` - Stop next update tick
   - `start.current = 0` - Clear start timestamp
   - `time.current = 0` - Clear elapsed tracking
   - `pausedTime.current = 0` - Clear pause timestamp
   - No pending setState calls

2. **Parent Notification** (synchronous)
   - `onDelete(id)` callback invoked immediately

3. **Parent Removal** (React-driven)
   - App filters timer from list
   - Timer component unmounts
   - React invokes useEffect cleanup handlers

## Constraints

- **Synchronous**: Delete action completes without async operations
- **State Consistency**: No state updates after parent callback
- **Cleanup Guaranteed**: Always executes before parent notification
- **No Error Handling**: Parent responsible for any error scenarios

## Edge Cases Handled

| Scenario | Handler | Result |
|----------|---------|--------|
| Delete while running | clearTimeout stops interval | Deletion completes, no stale updates |
| Delete while paused | Refs already reset | Deletion completes normally |
| Delete while idle | No interval active | Deletion completes immediately |
| Delete then re-add quickly | Fresh UUID generated | No ID collision |
| Delete with pending setState | clearTimeout prevents | setState not invoked |

## Performance Characteristics

| Operation | Target | Notes |
|-----------|--------|-------|
| Cleanup execution | <1ms | Ref resets + timeout clear |
| Callback invocation | <1ms | Synchronous function call |
| Total delete | <100ms | Parent state update is major contributor |

## Files Modified

```
src/components/Timer/
├── Timer.tsx       ← Updated with:
│                     - TimerProps interface update
│                     - DeleteButton import
│                     - onDeleteClick handler
│                     - DeleteButton render in ButtonsWrapper
└── index.ts        (unchanged)
```

## Breaking Changes

None - this is additive. Existing Timer usage requires:

```typescript
// OLD USAGE (will break - missing props)
<Timer />

// NEW USAGE (required)
<Timer id="some-uuid" onDelete={(id) => console.log(id)} />
```

## Testing Requirements

### Unit Tests

```typescript
// Delete handler clears intervals
// Delete handler resets refs
// Delete handler invokes callback with correct ID
```

### Integration Tests

```typescript
// Timer with running update interval
// Click delete
// Verify: Interval cancelled
// Verify: onDelete callback invoked with timer ID
// Verify: Parent can remove timer from list
```

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-18 | Add id & onDelete props, delete handler, DeleteButton render |

---

**Contract Status**: ✅ Approved for Implementation
