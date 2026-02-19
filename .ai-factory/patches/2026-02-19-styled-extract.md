# Extract styled components to separate .styled.tsx files

**Date:** 2026-02-19
**Files:** src/components/AddButton/AddButton.styled.tsx (created), src/components/Text/Text.styled.tsx (created), src/components/StopButton/StopButton.styled.tsx (created), src/components/Timer/Timer.styled.tsx (created), plus updated AddButton.tsx, Text.tsx, StopButton.tsx, Timer.tsx
**Severity:** low

## Problem

Styled component definitions were mixed into component `.tsx` files alongside React logic. This made components harder to scan (need to scroll past large CSS blocks to find logic) and violated separation of concerns.

## Root Cause

No convention existed for where to put styled components. The natural path of least resistance was to define them at the bottom of the component file, which worked but didn't scale — Timer.tsx had 7 styled definitions inline making the logic hard to find.

## Solution

Introduced the `<ComponentName>.styled.tsx` convention: all `styled.*` definitions move to a dedicated file and are named exports. The component file imports from `.styled.tsx` instead of defining them inline.

Affected components:
- `AddButton` — `AddButtonStyled`
- `Text` — `TextStyled`
- `StopButton` — `StopButtonStyled`
- `Timer` — `TimerStyled`, `ButtonsWrapper`, `Separator`, `ConfirmWrapper`, `ConfirmPrompt`, `ConfirmButton`, `CancelButton`

Components that are themselves pure styled exports (`ActionButton`, `Block`) stay as-is — they have no React logic to separate from.

## Prevention

- Component template in `docs/contributing.md`, `docs/architecture.md`, and `.github/skills/react-patterns/SKILL.md` all updated to show two-file structure
- The rule is now explicit: **all `styled.*` definitions go in `<ComponentName>.styled.tsx`**
- Code review: flag any `import styled from 'styled-components'` in a `ComponentName.tsx` file

## Tags

`#styled-components` `#refactor` `#separation-of-concerns` `#react` `#conventions`
