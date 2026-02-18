# Timer React Constitution

## Core Principles

### I. Component-Driven Architecture
Every UI element must be a reusable, composable React component. Components are functional components using hooks; class components are prohibited. Each component has a single responsibility with clear input/output contracts via TypeScript props.

### II. Strict TypeScript Usage
All code must be written in TypeScript with strict mode enabled. Implicit `any` types are forbidden. Every function parameter and component prop must have explicit type definitions. Generic types must be used where appropriate.

### III. Styled-Components for Styling
Styling is exclusively managed through `styled-components`. BEM, CSS classes, or inline styles are prohibited. Styled components are colocated with component code unless shared across multiple components, in which case they are extracted to a separate file.

### IV. Barrel Exports for Clean Imports
Every directory containing components must export an `index.ts` file. All components are imported via their barrel exports to maintain clean import paths and enable refactoring without cascading changes.

### V. Immutable State Management
React state is treated as immutable. Use new object/array instances when updating state; never mutate state directly. Array operations: use spread operator or array methods that return new arrays (map, filter, concat).

## Naming & Organization Conventions

### Component Files
- **File Names**: PascalCase (e.g., `Timer.tsx`, `StartButton.tsx`)
- **Component Names**: Exported as `export const ComponentName: React.FC<Props>`
- **Directory Structure**: One component per directory with `Component.tsx` + `index.ts` barrel export
- **Props Interfaces**: Named `{ComponentName}Props` or defined inline if simple
- Example structure:
  ```
  components/
    Timer/
      Timer.tsx
      index.ts
    StartButton/
      StartButton.tsx
      index.ts
  ```

### Utility Functions
- **File Names**: camelCase (e.g., `formatValue.ts`, `calculateTime.ts`)
- **Location**: Create `utils/` directory at `src/` level for shared utilities
- **Naming**: Clear, single-responsibility purpose (e.g., `formatValue(value: number): string`)

### Styled Components
- **Naming**: `{ComponentName}Styled` suffix (e.g., `TimerStyled`, `AppStyled`)
- **Location**: Colocated at bottom of component file or in separate `{ComponentName}.styles.ts`
- **Scope**: Scoped to parent component unless explicitly shared

### State Variables
- **Naming**: camelCase describing the state value (e.g., `isRunning`, `timerValue`, `selectedId`)
- **Boolean States**: Prefix with `is`, `has`, or `should` (e.g., `isVisible`, `hasError`, `shouldRender`)

## Type Definition Standards

### Props Types
- Always define props interfaces/types above component definition
- Include JSDoc comments for props that need clarification
- Use discriminated unions for complex conditional props
- Example:
  ```typescript
  interface TimerProps {
    /** Callback fired when timer completes */
    onComplete?: () => void;
  }
  ```

### Event Handlers
- Name event handler props with `on{Action}` convention (e.g., `onClick`, `onStart`, `onComplete`)
- Type as `(param: Type) => void` or `() => void` as appropriate
- Use React event types (e.g., `React.MouseEvent<HTMLButtonElement>`)

### Utility Type Functions
- Generic utility functions should be typed generically where possible
- Return types must be explicit (inference from usage is acceptable for internal utilities)

## Code Quality

### Component Simplicity
- Components should be reasonably sized (ideally < 150 lines)
- Complex state logic should be extracted into custom hooks
- Multiple responsibilities should be split into separate components

### Hook Usage
- `useState` for local component state (single values or related state grouped in objects)
- `useRef` for mutable values that don't trigger re-renders (DOM refs, timers, previous values)
- `useEffect` with proper dependency arrays; missing dependencies trigger build warnings and should be reviewed critically
- Custom hooks created in `hooks/` directory if reusable across components

### Performance
- Avoid inline function/object creation in props (extract to component level)
- Use React.memo sparingly; profile before implementing
- Render optimization should be data-driven, not premature

## Directory Structure Standards

```
src/
  App.tsx
  index.tsx
  components/
    index.ts              # Barrel export
    Button/
      Button.tsx
      index.ts
    Text/
      Text.tsx
      index.ts
  styles/
    GlobalStyles.tsx
  utils/
    formatValue.ts
    calculateTime.ts
  hooks/
    useTimer.ts
```

### Rules
- Never import from nested folders; always use barrel exports
- Styles directory contains Global styles only; component styles are colocated
- One component per directory; no mixed components in shared directories
- Utilities that don't fit elsewhere go in `utils/`

## Development Workflow

### Before Committing
1. Run TypeScript compiler: `npm run build` (includes `tsc`)
2. Verify no type errors appear
3. Test functionality manually in dev server: `npm run dev`
4. Check that imports use barrel exports only

### Pull Request Requirements
- All type errors must be resolved
- New components must include proper TypeScript types
- Styled-components must not contain magic values (use theme if available)
- Component responsibility must be single and clear

## Governance

This constitution supersedes all other development practices. All contributors must adhere to these standards. Constitution violations should be caught in code review and in build checks (TypeScript compilation failures).

**Version**: 1.0.0 | **Ratified**: 2026-02-18 | **Last Amended**: 2026-02-18
