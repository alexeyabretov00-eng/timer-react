## MODIFIED Requirements

### Requirement: User can delete a timer
Each Timer card SHALL provide a Delete action that permanently removes that timer from the active list.

When the user activates the Delete control, the system SHALL enter a **confirm-delete** state for that timer. The timer card SHALL display an inline confirmation UI with a Confirm action and a Cancel action.

- If the user confirms, the system SHALL:
  1. Stop any running timeout associated with the timer.
  2. Remove the timer entry from the application's timer list.
  3. Unmount the Timer component from the DOM.
- If the user cancels, the system SHALL return the timer card to its state prior to the delete action with no other changes.

The deletion SHALL use an inline in-card UI. The system SHALL NOT use `window.confirm` or any browser-native dialog.
The timer's elapsed time MAY continue to advance while the confirmation UI is displayed.

#### Scenario: Delete an idle timer — confirmed
- **WHEN** a timer is in the `idle` state and the user activates the Delete control, then confirms
- **THEN** the timer card is removed from the page

#### Scenario: Delete an idle timer — cancelled
- **WHEN** a timer is in the `idle` state and the user activates the Delete control, then cancels
- **THEN** the timer card remains on the page in the `idle` state

#### Scenario: Delete a running timer — confirmed
- **WHEN** a timer is in the `started` state and the user activates the Delete control, then confirms
- **THEN** the timer stops counting and the timer card is removed from the page

#### Scenario: Delete a running timer — cancelled
- **WHEN** a timer is in the `started` state and the user activates the Delete control, then cancels
- **THEN** the timer card remains on the page and continues running

#### Scenario: Delete a paused timer — confirmed
- **WHEN** a timer is in the `paused` state and the user activates the Delete control, then confirms
- **THEN** the timer card is removed from the page

#### Scenario: Delete a paused timer — cancelled
- **WHEN** a timer is in the `paused` state and the user activates the Delete control, then cancels
- **THEN** the timer card remains on the page in the `paused` state

#### Scenario: Remaining timers are unaffected
- **WHEN** the user deletes one timer (confirmed) while other timers are present
- **THEN** all other timer cards remain on the page and continue their current state unchanged

#### Scenario: Confirmation UI does not use browser dialog
- **WHEN** the user activates the Delete control on any timer
- **THEN** no browser-native dialog (`window.confirm` or equivalent) is shown; a custom popup is displayed using a React portal rendered into `document.body`
