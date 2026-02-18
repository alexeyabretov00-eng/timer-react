# Feature Specification: Delete Timer from List

**Feature Branch**: `001-delete-timer`  
**Created**: 2026-02-18  
**Status**: Draft  
**Input**: User description: "Add ability to delete a timer from the list"

## Clarifications

### Session 2026-02-18

- Q: What should the delete button look like to differentiate it from other action buttons? → A: Trash/delete icon in gray (#9E9E9E), same size as other SVG icons (20x20px)
- Q: When a timer is deleted mid-execution, what should happen to its internal state and any active intervals? → A: Cleanup internal state first (cancel intervals), then trigger parent removal via callback
- Q: Should users be able to delete timers using keyboard navigation and interaction? → A: No keyboard support - mouse/touch only for this MVP
- Q: Should new timers potentially receive the same ID as deleted timers? → A: No - new timers always get fresh unique IDs via uuidv4()
- Q: When the last timer is deleted, what should the UI display? → A: Only "Add Timer" button visible in current grid layout position

## User Scenarios & Testing

### User Story 1 - Remove Individual Timer (Priority: P1)

Users need the ability to remove a specific timer from their list of active timers. This is critical for managing multiple timers and cleaning up completed or unwanted timers.

**Why this priority**: Core feature enabling users to control their timer list. Without deletion, users accumulate timers they no longer need, reducing usability.

**Independent Test**: User can click a delete button on a timer card and the timer is removed from the list immediately while other timers remain unaffected.

**Acceptance Scenarios**:

1. **Given** user has multiple timers running, **When** user clicks delete button on one timer, **Then** that timer is removed from the list and other timers continue running
2. **Given** user has a timer in idle state, **When** user clicks delete button, **Then** timer is removed from the list
3. **Given** user has only one timer, **When** user clicks delete button, **Then** timer is removed and only the "Add Timer" button remains visible in the grid (no empty state message)

---

### User Story 2 - Delete Paused Timer (Priority: P1)

Users should be able to delete timers that are currently paused, to discard timers they no longer need without resuming them.

**Why this priority**: Users may pause a timer and decide they don't need it anymore. The feature should work seamlessly with all timer states.

**Independent Test**: A paused timer can be deleted and removed from the list without requiring any additional actions.

**Acceptance Scenarios**:

1. **Given** user has paused a timer (stopped mid-countdown), **When** user clicks delete button, **Then** timer is removed from the list
2. **Given** user has deleted a paused timer, **When** user looks at the remaining timers, **Then** no data about the deleted timer remains

---

### User Story 3 - Clear Running Timer (Priority: P2)

Users may want to delete a timer even while it's actively running, without stopping it first.

**Why this priority**: Reduces friction in timer management - users shouldn't have to stop before deleting. Nice-to-have for power users.

**Independent Test**: A running timer can be deleted by clicking the delete button, even while the timer is counting up.

**Acceptance Scenarios**:

1. **Given** user has a running timer, **When** user clicks delete button without stopping, **Then** timer is immediately removed from the list and stops running

---

### Edge Cases

- **Rapid delete-and-add**: When user deletes a timer and immediately adds a new one (synchronously), the new timer MUST receive a fresh unique ID - IDs are never recycled within a session
- **Delete while pending update**: If user deletes a timer while an update interval is pending, the delete cleanup MUST cancel the pending update to prevent stale state modifications
- **Accidentally deleted timer**: No undo/recovery available - deletion is permanent and this is acceptable for MVP scope

## Requirements

### Functional Requirements

- **FR-001**: Timer component MUST accept a delete callback function as a prop
- **FR-002**: Delete button MUST be visible on all timer cards regardless of timer state (idle, running, paused)
- **FR-003**: Clicking delete button MUST trigger removal of the timer from the parent list
- **FR-004**: Deleting a timer MUST cancel all internal interval timers and clear all component state (refs, useState) BEFORE triggering parent removal callback to prevent stale updates
- **FR-005**: Deleted timer MUST be completely removed from the UI with no visual trace remaining
- **FR-006**: Deletion MUST be immediate and synchronous (no loading states or delays)
- **FR-007**: Delete button MUST display a trash/delete icon in gray (#9E9E9E) at 20x20px size to clearly signal destructive action and differentiate from action buttons (start/pause/stop)
- **FR-008**: When all timers are deleted, the App MUST display only the "Add Timer" button with no empty state message or placeholder content

### Key Entities

- **Timer**: Core timer entity with id, status (idle/running/paused), and accumulated time value
- **Timer List**: Array of timer objects maintained at App level, contains all active timers
- **Delete Action**: Removal operation that filters timer from list by ID

## Success Criteria

### Measurable Outcomes

- **SC-001**: User can delete any timer from a list of 5+ timers in a single click action
- **SC-002**: Timer deletion is completed in under 100ms (no perceptible delay to user)
- **SC-003**: All stored state for deleted timer is cleared (no memory leaks from orphaned timer references)
- **SC-004**: Delete functionality works across all timer states with 100% consistency
- **SC-005**: UI refresh accurately reflects list state with no stale timer references (remaining timers unaffected)

## Assumptions

- Delete action is permanent (no undo/recovery) and this is acceptable for MVP
- Timer list state is managed at App component level, not in a global state management system
- Delete button should not require confirmation modal to maintain simplicity and speed
- Timer IDs are unique and immutable for the duration of app session
- Keyboard accessibility (Tab focus, keyboard activation) is NOT required for this MVP - mouse/touch interaction only
- Full keyboard support and WCAG compliance are deferred to future enhancement

## Implementation Notes

Based on project constitution requirements:
- Delete button component should follow barrel export pattern: `DeleteButton/DeleteButton.tsx` + `DeleteButton/index.ts`
- Component must be TypeScript with explicit prop types
- Styled with `styled-components`
- Timer component prop type must be updated to accept `onDelete: (id: string) => void`
- App component state update should use immutable array filtering: `timers.filter(timer => timer.id !== deletedId)`
