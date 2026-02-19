## 1. DeleteButton Component

- [x] 1.1 Create `src/components/DeleteButton/` directory with `DeleteButton.tsx` and `index.ts`
- [x] 1.2 Implement `DeleteButton` using `ActionButton` as the base, styled consistently with existing buttons
- [x] 1.3 Export `DeleteButton` from `src/components/index.ts`

## 2. Timer Component

- [x] 2.1 Add `onDelete: () => void` prop to the `Timer` component interface
- [x] 2.2 Call `clearTimeout(intervalId.current)` before invoking `onDelete` to prevent orphaned timeouts
- [x] 2.3 Render `DeleteButton` in the top-right corner of the timer card, outside `ButtonsWrapper`
- [x] 2.4 Wire the `DeleteButton` `onClick` to the cleanup + `onDelete` call

## 3. App Component

- [x] 3.1 Add an `onDelete` handler in `App` that filters the deleted timer's ID out of the `timers` state array
- [x] 3.2 Pass the `onDelete` handler (bound to the timer's ID) to each `<Timer>` instance
