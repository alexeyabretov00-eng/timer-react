# DeleteButton Component Contract

**Location**: `src/components/DeleteButton/DeleteButton.tsx`

## Type Signature

```typescript
interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => JSX.Element;
```

## Props Contract

| Prop | Type | Required | Description | Default |
|------|------|----------|-------------|---------|
| `onClick` | `() => void` | ✓ Yes | Callback invoked when button is clicked | N/A |

## Behavior

### Rendering
- Renders an ActionButton styled component
- Contains a trash/delete icon SVG (20x20px)
- Icon color: #9E9E9E (gray, matching other action buttons)
- No internal styling modifications

### Interaction
- Clickable area is the ActionButton component
- On click: Invokes `onClick` callback
- Visual feedback: Inherits from ActionButton styling (cursor: pointer)
- No hover state modifications from DeleteButton (handled by ActionButton)

### Props Behavior
- `onClick` callback has no return value expectation
- Callback is invoked synchronously on user click
- Component does not validate or guard callback invocation
- Parent is responsible for all business logic

## Constraints

- **Stateless**: No useState, useRef, or internal state
- **No Side Effects**: No useEffect, no API calls
- **No Styling**: Uses ActionButton, no additional styled-components
- **No Dependencies**: Only uses React, ActionButton, SVG
- **Keyboard**: Not accessible (no keyboard support, MVP scope)

## Visual Design

### Icon Specification

```typescript
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 5H18M8 8V14M12 8V14M3 5L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16L17 5M7 5V3C7 2.44772 7.44772 2 8 2H12C12.5523 2 13 2.44772 13 3V5" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
```

- **Size**: 20x20px (matches StartButton, PauseButton, StopButton)
- **Color**: #9E9E9E stroke (gray, consistent with action buttons)
- **Icon Style**: Trash can outline
- **Rendering**: SVG inline in JSX

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Multiple rapid clicks | Each click invokes callback (no debounce) |
| onClick is undefined | Runtime error (propTypes should catch in dev) |
| Component unmounts while click pending | Callback will not execute (React handles cleanup) |
| onClick throws error | Error propagates to parent (not caught by component) |

## Testing

### Unit Test Requirements

```typescript
// Mock example
const handleDelete = jest.fn();
const { getByRole } = render(<DeleteButton onClick={handleDelete} />);

fireEvent.click(getByRole('button'));
expect(handleDelete).toHaveBeenCalledTimes(1);
```

### Integration Test Requirements

- DeleteButton renders within Timer component
- Clicking DeleteButton invokes Timer's delete handler
- Delete handler properly cleans up timer state

## File Structure

```
src/components/DeleteButton/
├── DeleteButton.tsx      # Component implementation
└── index.ts              # Barrel export: export { DeleteButton }
```

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-18 | Initial contract for MVP |

---

**Contract Status**: ✅ Approved for Implementation
