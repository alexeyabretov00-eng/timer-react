---
name: react-patterns
description: >-
  Provides React component patterns, conventions, and best practices for the timer-react project.
  Use when creating new components, refactoring existing ones, or making architectural decisions
  about React hooks, styled-components, and TypeScript usage in this codebase.
argument-hint: "[component-name or topic]"
metadata:
  author: ai-factory
  version: "1.0"
  category: frontend
---

# React Patterns — timer-react

Conventions and patterns for the timer-react codebase: React 17, TypeScript, styled-components 5, Vite 4.

---

## Component Structure

Every component lives in its own directory with a barrel export:

```
src/components/ComponentName/
├── ComponentName.tsx     # Component implementation
└── index.ts             # Barrel: export { ComponentName } from './ComponentName'
```

All components are re-exported from `src/components/index.ts`.

**Barrel pattern:**
```ts
// src/components/ComponentName/index.ts
export { ComponentName } from './ComponentName';

// src/components/index.ts
export { ComponentName } from './ComponentName';
export { OtherComponent } from './OtherComponent';
// ...
```

**Usage:**
```tsx
import { Timer, AddButton } from './components';
```

---

## Component Template

```tsx
import React from 'react';
import styled from 'styled-components';

interface ComponentNameProps {
  // props here
}

export const ComponentName: React.FC<ComponentNameProps> = ({ /* props */ }) => {
  return (
    <ComponentNameStyled>
      {/* content */}
    </ComponentNameStyled>
  );
};

const ComponentNameStyled = styled.div`
  /* styles */
`;
```

**Rules:**
- Use `React.FC<Props>` for all components
- Keep logic and styled components in the same file
- Name the root styled component `<ComponentName>Styled`
- Export only the component (no default exports)

---

## Styled Components

**Theme (globals):** Dark theme — `#696969` card background, white/grey text.

**Active vs Idle states:** Pass boolean props for styling:
```tsx
const Text = styled.span<{ isActive: boolean }>`
  color: ${props => props.isActive ? '#ffffff' : '#9E9E9E'};
`;
```

**Base primitives to extend:**
- `ActionButton` — base 20×20px clickable icon (from `./ActionButton`)
- `Block` — card container with dark grey background and padding

**Extending ActionButton:**
```tsx
import { ActionButton } from '../ActionButton';
import styled from 'styled-components';

const MyButtonStyled = styled(ActionButton)`
  /* additional styles */
`;
```

---

## Hooks Patterns

**Timer uses `useRef` for values that should NOT trigger re-renders:**
```tsx
const intervalId = useRef(0);    // setTimeout ID
const start = useRef(0);         // timestamp in ms
const time = useRef(0);          // accumulated ticks
```

**`useEffect` for side effects tied to state changes:**
```tsx
useEffect(() => {
  if (status !== 'started') return;
  // start interval
}, [status]);  // only re-run when status changes
```

---

## TypeScript Conventions

- All component props have explicit interfaces named `<ComponentName>Props`
- Use `string` for IDs (uuid v4 format)
- Avoid `any` — use proper types
- Styled component prop types inline: `styled.div<{ isActive: boolean }>`
- `React.FC<Props>` explicit typing (not inferred)

---

## File Naming

| What | Convention | Example |
|------|-----------|---------|
| Component files | PascalCase | `Timer.tsx` |
| Directories | PascalCase | `Timer/` |
| Barrel files | lowercase | `index.ts` |
| Style files | PascalCase | `GlobalStyles.tsx` |

---

## Adding a New Component Checklist

1. Create `src/components/NewComponent/NewComponent.tsx`
2. Create `src/components/NewComponent/index.ts` with barrel export
3. Add export to `src/components/index.ts`
4. Import using `import { NewComponent } from './components'` (or `'../components'` from deeper paths)

---

## Global Styles

Global styles live in `src/styles/GlobalStyles.tsx` as a styled-components `createGlobalStyle` component. Inject it at the top of `App.tsx`:

```tsx
import { GlobalStyles } from './styles/GlobalStyles';
// ...
return (<AppStyled>
  <GlobalStyles />
  {/* rest of app */}
</AppStyled>)
```
