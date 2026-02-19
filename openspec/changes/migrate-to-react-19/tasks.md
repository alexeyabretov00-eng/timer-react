## 1. Dependencies

- [ ] 1.1 Update `package.json`: bump `react` and `react-dom` to `^19.0.0`
- [ ] 1.2 Update `package.json`: bump `@types/react` and `@types/react-dom` to `^19.0.0`
- [ ] 1.3 Update `package.json`: bump `styled-components` to `^6.0.0` and remove `@types/styled-components` (types are bundled in v6)
- [ ] 1.4 Update `package.json`: bump `@vitejs/plugin-react` to `^4.0.0` and `vite` to `^6.0.0`
- [ ] 1.5 Update `package.json`: bump `typescript` to `^5.0.0`
- [ ] 1.6 Run `npm install` to regenerate the lockfile

## 2. TypeScript & Build Config

- [ ] 2.1 Update `tsconfig.json`: change `"jsx": "react"` to `"jsx": "react-jsx"`
- [ ] 2.2 Update `tsconfig.json`: change `"moduleResolution": "Node"` to `"moduleResolution": "Bundler"`

## 3. Entry Point

- [ ] 3.1 Update `index.tsx`: replace `import ReactDOM from 'react-dom'` with `import { createRoot } from 'react-dom/client'`
- [ ] 3.2 Update `index.tsx`: replace `ReactDOM.render(<App />, document.getElementById('root'))` with `createRoot(document.getElementById('root')!).render(<App />)`

## 4. Remove Redundant React Imports

- [ ] 4.1 `src/App.tsx` — change `import React, { useState }` to `import { useState }`
- [ ] 4.2 `src/components/Timer/Timer.tsx` — change `import React, { useEffect, useRef, useState }` to `import { useEffect, useRef, useState }`
- [ ] 4.3 `src/components/AddButton/AddButton.tsx` — remove `import React from "react"`
- [ ] 4.4 `src/components/DeleteButton/DeleteButton.tsx` — remove `import React from "react"`
- [ ] 4.5 `src/components/StartButton/StartButton.tsx` — remove `import React from "react"`
- [ ] 4.6 `src/components/PauseButton/PauseButton.tsx` — remove `import React from "react"`
- [ ] 4.7 `src/components/StopButton/StopButton.tsx` — remove `import React from "react"`
- [ ] 4.8 `src/components/Text/Text.tsx` — remove `import React from "react"`

## 5. Verify

- [ ] 5.1 Run `npx tsc --noEmit` and fix any type errors
- [ ] 5.2 Run `npm run build` and confirm clean output
