[← Architecture](architecture.md) · [Back to README](../README.md) · [Contributing →](contributing.md)

# Components

Reference for all components in `src/components/`.

---

## Overview

| Component | Type | Props | Description |
|-----------|------|-------|-------------|
| `ActionButton` | Styled div | — | Base 20×20px clickable icon primitive |
| `AddButton` | React.FC | `onClick` | "+" card — appends a new timer |
| `Block` | Styled div | — | Dark-grey card container |
| `PauseButton` | React.FC | `onClick` | `||` pause icon |
| `StartButton` | React.FC | `onClick` | `▶` play icon |
| `StopButton` | React.FC | `isActive`, `onClick` | `■` stop icon, colour changes when active |
| `Text` | React.FC | `isActive`, `children` | Timer digit display |
| `Timer` | React.FC | `id`, `onDelete` | Full timer card with state machine |

---

## ActionButton

Base primitive for all icon buttons.

```tsx
import { ActionButton } from '../ActionButton';

// Direct usage (as container):
<ActionButton onClick={handler}>
  <svg .../>
</ActionButton>

// Or extend via styled-components:
const MyButtonStyled = styled(ActionButton)`
  /* overrides */
`;
```

**Styles:** `width: 20px; height: 20px; cursor: pointer;`

---

## AddButton

```tsx
import { AddButton } from './components';

<AddButton onClick={onAdd} />
```

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | Called when user clicks the card |

Renders a `Block` card containing a `+` SVG icon. Clicking anywhere on the card fires `onClick`.

---

## Block

```tsx
import { Block } from './components';

<Block>
  {/* content */}
</Block>
```

A styled `div` — no props. Used as the card shell for `Timer` and `AddButton`.

**Styles:** `min-width: 225px; height: 120px; background: #696969; padding: 20px 0px;`

---

## PauseButton

```tsx
import { PauseButton } from './components';

<PauseButton onClick={onPaused} />
```

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | Called when user clicks pause |

Renders a white `||` SVG inside `ActionButton`. Only shown when timer `status === 'started'`.

---

## StartButton

```tsx
import { StartButton } from './components';

<StartButton onClick={onStart} />
```

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | Called when user clicks start / resume |

Renders a grey `▶` SVG inside `ActionButton`. Shown when `status === 'idle'` or `status === 'paused'`.

---

## StopButton

```tsx
import { StopButton } from './components';

<StopButton isActive={status === 'started'} onClick={onStop} />
```

| Prop | Type | Description |
|------|------|-------------|
| `isActive` | `boolean` | `true` → white icon; `false` → grey icon |
| `onClick` | `() => void` | Called when user clicks stop |

Always rendered. Icon colour reflects whether the timer is currently running.

---

## Text

```tsx
import { Text } from './components';

<Text isActive={status === 'started'}>
  {formatValue(value)}
</Text>
```

| Prop | Type | Description |
|------|------|-------------|
| `isActive` | `boolean` | `true` → `#FFFFFF`; `false` → `#9E9E9E` |
| `children` | `ReactNode` | The elapsed time string |

**Font:** 22px Gotham Pro.

---

## Timer

The core component — manages its own state machine independently.

```tsx
import { Timer } from './components';

<Timer key={id} id={id} onDelete={onDeleteTimer} />
```

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | UUID v4 — used as React `key` and passed to `onDelete` |
| `onDelete` | `(id: string) => void` | Called when the timer should be removed |

**Internal state:**

| Variable | Storage | Description |
|----------|---------|-------------|
| `value` | `useState<number>` | Elapsed ms — drives the display |
| `status` | `useState<string>` | `'idle'` \| `'started'` \| `'paused'` |
| `start` | `useRef<number>` | Epoch timestamp of when timer started |
| `time` | `useRef<number>` | Accumulated ticks (drift correction) |
| `pausedTime` | `useRef<number>` | Epoch timestamp of when timer was paused |
| `intervalId` | `useRef<number>` | `setTimeout` ID |

> **Note:** `onDelete` is wired through `App.tsx` but the `DeleteButton` UI is not yet rendered — it's part of the pending `specs/001-delete-timer` feature.

---

## Adding a New Component

1. Create `src/components/NewName/NewName.tsx`
2. Create `src/components/NewName/index.ts`:
   ```ts
   export { NewName } from './NewName';
   ```
3. Add to `src/components/index.ts`:
   ```ts
   export { NewName } from './NewName';
   ```

See [Contributing](contributing.md) for full conventions.

---

## See Also

- [Architecture](architecture.md) — component hierarchy and patterns
- [Contributing](contributing.md) — conventions and checklist
