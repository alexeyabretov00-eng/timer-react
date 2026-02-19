## Why

The app currently runs on React 17 (released October 2020), which is beyond end-of-active-support. React 19 (stable, December 2024) is the current major version and brings a modernised rendering architecture, the automatic JSX transform, removal of legacy APIs, and improved TypeScript types. Upgrading now eliminates deprecated API usage (`ReactDOM.render`) and aligns the project with the current React ecosystem.

## What Changes

- **BREAKING** Upgrade `react` and `react-dom` from `17.0.2` → `^19.0.0`.
- **BREAKING** Replace `ReactDOM.render()` in `index.tsx` with `createRoot()` from `react-dom/client`.
- Switch `tsconfig.json` `jsx` option from `"react"` (classic transform) to `"react-jsx"` (automatic transform).
- Remove explicit `import React from 'react'` from all component files (no longer needed with automatic transform).
- Upgrade `@types/react` and `@types/react-dom` to `^19.0.0`.
- Upgrade `styled-components` from `5.x` → `^6.0.0` (v5 is not compatible with React 19).
- Upgrade `@vitejs/plugin-react` from `^3.1.0` → `^4.0.0` (React 19 support).
- Upgrade `vite` from `^4.2.0` → `^6.0.0` and `typescript` from `^4.9.3` → `^5.0.0`.
- Update `moduleResolution` in `tsconfig.json` from `"Node"` to `"Bundler"` (Vite 6 recommendation).

## Capabilities

### New Capabilities

<!-- None — this is a dependency upgrade with no new user-facing capabilities. -->

### Modified Capabilities

<!-- No spec-level behavior changes. All existing requirements remain identical.
     The timer-delete and any other capabilities are unaffected. -->

## Impact

- **`package.json`** — dependency version bumps across react, react-dom, styled-components, vite, typescript, and their types.
- **`index.tsx`** — replace legacy `ReactDOM.render` with `createRoot` / `root.render`.
- **`tsconfig.json`** — `jsx: "react-jsx"`, `moduleResolution: "Bundler"`.
- **`src/components/**/*.tsx`** and **`src/App.tsx`** — remove `import React from 'react'` (no longer required).
- **`src/styles/GlobalStyles.tsx`** — may require `createGlobalStyle` import update for styled-components v6.
- No changes to application logic, component behaviour, or OpenSpec specs.
