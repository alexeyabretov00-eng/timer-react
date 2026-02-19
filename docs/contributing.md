[← Components](components.md) · [Back to README](../README.md)

# Contributing

How to add features, modify components, and follow project conventions.

---

## Development Setup

```bash
npm install
npm run dev   # http://localhost:5173
```

---

## Coding Conventions

### Component Structure

Every component lives in its own directory:

```
src/components/ComponentName/
├── ComponentName.tsx    # Component + its styled components
└── index.ts             # export { ComponentName } from './ComponentName'
```

Add the new export to `src/components/index.ts`.

### Component Template

```tsx
import React from 'react';
import styled from 'styled-components';

interface ComponentNameProps {
  // props
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
- Use `React.FC<Props>` with explicit interface
- Root styled component named `<ComponentName>Styled`
- Named exports only — no `export default`
- Keep logic and styled components in the same `.tsx` file

### Styling

- Extend `ActionButton` for anything that handles a click on a 20px icon
- For state-dependent colours, pass `isActive: boolean` as a styled-component prop:
  ```tsx
  const El = styled.div<{ isActive: boolean }>`
    color: ${p => p.isActive ? '#ffffff' : '#9e9e9e'};
  `;
  ```
- Dark theme tokens: background `#353638`, card `#696969`, active `#ffffff`, idle `#9e9e9e`

### TypeScript

- Always define a `Props` interface — even for single-prop components
- Use `string` for IDs (UUID v4)
- Typed styled props inline: `styled.div<{ isActive: boolean }>`

### File Naming

| What | Convention |
|------|-----------|
| Component files | `PascalCase.tsx` |
| Directories | `PascalCase/` |
| Barrel files | `index.ts` |
| Style files | `PascalCase.tsx` |

---

## Adding a New Component — Checklist

- [ ] Create `src/components/NewComponent/NewComponent.tsx`
- [ ] Create `src/components/NewComponent/index.ts` with barrel export
- [ ] Add export to `src/components/index.ts`
- [ ] Follow `React.FC<Props>` + named export pattern
- [ ] Name root styled component `NewComponentStyled`
- [ ] Extend `ActionButton` if it's a clickable icon

---

## Adding a New Feature to Timer

The `Timer` component owns its own state. When extending it:

1. Add state/refs at the top of `Timer.tsx`
2. Keep the state machine (`idle` / `started` / `paused`) intact — only add on top
3. Always `clearTimeout(intervalId.current)` before transitioning away from `started`
4. New buttons must extend `ActionButton`; pass `isActive` for colour
5. Update `TimerProps` interface if new props are needed

---

## Before Committing

- [ ] `npm run build` passes (TypeScript + Vite build, no errors)
- [ ] Component renders correctly at http://localhost:5173
- [ ] No `any` types introduced
- [ ] New component exported from `src/components/index.ts`

---

## See Also

- [Architecture](architecture.md) — structural overview and patterns
- [Components](components.md) — component API reference
