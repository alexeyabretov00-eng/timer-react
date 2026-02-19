# Implementation Plan: Add Remove Timer

Branch: none
Created: 2026-02-19

## Settings
- Testing: no
- Docs: yes

## Tasks

### Phase 1: DeleteButton component

- [x] Task 1: Create `DeleteButton` component
- [x] Task 2: Export `DeleteButton` from barrel (`src/components/index.ts`)

### Phase 2: Wire delete through Timer and App

- [x] Task 3: Update `Timer` — add `TimerProps`, import + render `DeleteButton` (depends on 1, 2)
- [x] Task 4: Update `App` — add `onDeleteTimer`, pass `id` + `onDelete` to `Timer`, fix `uuidv4` TypeScript errors (depends on 3)

### Phase 3: Docs

- [x] Task 5: Update docs and context files to reflect feature complete (depends on 4)

---

## Task Details

### Task 1 — Create `DeleteButton` component

Create `src/components/DeleteButton/DeleteButton.tsx` and `src/components/DeleteButton/index.ts`.

- Extend `ActionButton` from `../ActionButton`
- Render an ✕ (cross/close) SVG icon in `#9E9E9E` (idle grey, consistent with other buttons)
- Props: `onClick: () => void`
- Follow project pattern: `React.FC<Props>` + named export + `<ComponentName>Styled` if extra styling needed

Files:
- `src/components/DeleteButton/DeleteButton.tsx` (create)
- `src/components/DeleteButton/index.ts` (create)

---

### Task 2 — Export `DeleteButton` from barrel

Add `DeleteButton` to `src/components/index.ts` so it can be imported like all other components.

Files:
- `src/components/index.ts` (modify)

---

### Task 3 — Update `Timer` component

Add `TimerProps` interface and render `DeleteButton`:

```ts
interface TimerProps {
    id: string;
    onDelete: (id: string) => void;
}
export const Timer: React.FC<TimerProps> = ({ id, onDelete }) => { ... }
```

- Import `DeleteButton` from `../DeleteButton`
- Render `<DeleteButton onClick={() => onDelete(id)} />` inside `ButtonsWrapper` (after `StopButton`)

Files:
- `src/components/Timer/Timer.tsx` (modify)

---

### Task 4 — Update `App`

Wire delete into the timer list:

- Add `onDeleteTimer` handler: `setTimers(timers.filter(t => t.id !== id))`
- Pass `id={x.id}` and `onDelete={onDeleteTimer}` to each `<Timer>`
- Fix pre-existing TypeScript errors in `uuidv4` (use `crypto.randomUUID()`)

Files:
- `src/App.tsx` (modify)

---

### Task 5 — Update docs

- `AGENTS.md` — add `DeleteButton/` to component list, add it to hierarchy, remove "In-Progress Features" section
- `.ai-factory/DESCRIPTION.md` — update core features, remove pending feature note
- `docs/components.md` — add `DeleteButton` to overview table and add its API section, fix `Timer` note
- `docs/contributing.md` — remove "Pending Feature: Delete Timer" section

Files:
- `AGENTS.md`
- `.ai-factory/DESCRIPTION.md`
- `docs/components.md`
- `docs/contributing.md`
