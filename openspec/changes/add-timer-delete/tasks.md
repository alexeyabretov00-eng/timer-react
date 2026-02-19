## 1. DeleteButton Component

- [ ] 1.1 Create `src/components/DeleteButton/` directory with `DeleteButton.tsx` and `index.ts`
- [ ] 1.2 Implement `DeleteButton` using `ActionButton` as the base, styled consistently with existing buttons
- [ ] 1.3 Export `DeleteButton` from `src/components/index.ts`

## 2. Timer Component

- [ ] 2.1 Add `onDelete: () => void` prop to the `Timer` component interface
- [ ] 2.2 Call `clearTimeout(intervalId.current)` before invoking `onDelete` to prevent orphaned timeouts
- [ ] 2.3 Render `DeleteButton` in the top-right corner of the timer card, outside `ButtonsWrapper`
- [ ] 2.4 Wire the `DeleteButton` `onClick` to the cleanup + `onDelete` call

## 3. App Component

- [ ] 3.1 Add an `onDelete` handler in `App` that filters the deleted timer's ID out of the `timers` state array
- [ ] 3.2 Pass the `onDelete` handler (bound to the timer's ID) to each `<Timer>` instance
