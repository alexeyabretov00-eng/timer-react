### Requirement: User can delete a timer
Each Timer card SHALL provide a Delete action that permanently removes that timer from the active list.

When the Delete action is triggered, the system SHALL:
1. Stop any running timeout associated with the timer.
2. Remove the timer entry from the application's timer list.
3. Unmount the Timer component from the DOM.

The deletion SHALL be immediate with no confirmation step.

#### Scenario: Delete an idle timer
- **WHEN** a timer is in the `idle` state and the user activates the Delete control
- **THEN** the timer card is removed from the page

#### Scenario: Delete a running timer
- **WHEN** a timer is in the `started` state and the user activates the Delete control
- **THEN** the timer stops counting and the timer card is removed from the page

#### Scenario: Delete a paused timer
- **WHEN** a timer is in the `paused` state and the user activates the Delete control
- **THEN** the timer card is removed from the page

#### Scenario: Remaining timers are unaffected
- **WHEN** the user deletes one timer while other timers are present
- **THEN** all other timer cards remain on the page and continue their current state unchanged
