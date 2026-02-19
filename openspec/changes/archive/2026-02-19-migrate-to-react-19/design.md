## Context

The app is built on React 17 with the classic JSX transform (`"jsx": "react"` in tsconfig), `ReactDOM.render()` at the entry point, styled-components v5, Vite 4, and TypeScript 4.9. React 19 removes `ReactDOM.render`, mandates `createRoot`, and fully supports the automatic JSX runtime introduced in React 17. styled-components v5 is not compatible with React 19's internal fiber changes; v6 is required. This is a cross-cutting dependency upgrade touching every source file (JSX transform) and the build toolchain.

## Goals / Non-Goals

**Goals:**
- Upgrade the full React stack (react, react-dom, types) from 17 → 19.
- Replace the removed `ReactDOM.render` entry point with `createRoot`.
- Switch to the automatic JSX transform, eliminating per-file `import React` boilerplate.
- Upgrade styled-components to v6 for React 19 compatibility.
- Upgrade Vite (4 → 6), `@vitejs/plugin-react` (3 → 4), and TypeScript (4.9 → 5) in the same pass to avoid a second toolchain migration.

**Non-Goals:**
- Adopting new React 19 APIs (`useActionState`, `useOptimistic`, Server Components, etc.) — those are separate features.
- Changing any app logic, component structure, or user-facing behaviour.
- Adding tests.

## Decisions

### 1. Upgrade TypeScript and Vite in the same PR

**Decision**: Bump TypeScript 4.9 → 5 and Vite 4 → 6 alongside React 19.

**Rationale**: `@types/react@19` requires TypeScript ≥ 5.0. Vite 6 is already stable and pairs with `@vitejs/plugin-react@4`. Doing them separately would require an intermediate broken state where React 19 types don't resolve.

**Alternative**: Keep Vite 4 / TS 4.9 and pin intermediary type versions. Rejected — fragile and requires a follow-up upgrade immediately.

---

### 2. Switch `moduleResolution` to `"Bundler"`

**Decision**: Change `tsconfig.json` `moduleResolution` from `"Node"` to `"Bundler"`.

**Rationale**: Vite 6 uses a bundler module resolution model; `"Node"` produces spurious TS errors with the new types. `"Bundler"` matches actual runtime behaviour.

---

### 3. Remove explicit `import React` across all component files

**Decision**: Delete `import React from 'react'` from every `.tsx` file after switching `jsx` to `"react-jsx"`.

**Rationale**: The automatic transform injects the JSX runtime automatically. Keeping the import is harmless but adds noise; removing it is the idiomatic React 17+ style and avoids lint warnings.

---

### 4. Upgrade styled-components to v6

**Decision**: Bump `styled-components` to `^6.0.0` and `@types/styled-components` to `^5.1.26` (types are bundled in v6 itself, so the separate `@types` package can be removed).

**Rationale**: styled-components v5 relies on `React.FC` internals that changed in React 18/19 and produces runtime errors. v6 ships its own TypeScript types.

**Migration note**: styled-components v6 dropped the `css` prop without a babel plugin — not used in this codebase, so no impact.

## Risks / Trade-offs

- **styled-components v5 → v6 API surface** → v6 has minor breaking changes (e.g., `StyleSheetManager` API). Mitigation: audit usage in `GlobalStyles.tsx` and any `createGlobalStyle` calls.
- **TypeScript 5 strictness** → TS5 tightens some inference. Mitigation: fix any new type errors surfaced by `tsc --noEmit` before committing.
- **Vite 6 config changes** → `vite.config.ts` `root`/`publicDir` options behave the same; low risk. Mitigation: run `vite build` and verify output.
- **Rollback strategy** → The branch `migrate-to-react-19` is isolated. Rolling back is a branch delete or revert; `package-lock.json` must be regenerated on rollback.

## Migration Plan

1. Update `package.json` versions.
2. Run `npm install` to regenerate lockfile.
3. Update `tsconfig.json` (`jsx`, `moduleResolution`).
4. Update `index.tsx` to use `createRoot`.
5. Remove `import React from 'react'` from all component files.
6. Audit `GlobalStyles.tsx` for styled-components v6 compatibility.
7. Run `tsc --noEmit` — fix any type errors.
8. Run `npm run build` — verify clean build.
9. Run `npm run dev` — smoke-test in browser.
