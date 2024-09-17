## check-in

The `check-in` directory contains the core functionality for the check-in feature of the application. It includes actions, components, and controllers that handle the process of creating and managing check-ins for users.

### Files

#### ./check-in/actions/addJournalEntryToCheckIn.ts

This file exports a function that opens a modal to allow the user to add a journal entry to a check-in. It uses the `useDecorationsContext` hook to access the modal functionality.

#### ./check-in/actions/continueCheckIn.ts

This file exports a function to continue the check-in process. It is currently a placeholder with a TODO comment.

#### ./check-in/actions/finishFeelingsCheckIn.ts

This file exports a function that handles the final step of the check-in process. It creates a new check-in and journal entry, updates the check-in and journal entry data, and closes the check-in modal.

#### ./check-in/actions/startCheckIn.ts

This file exports a function to start the check-in process. It is currently a placeholder with a TODO comment.

#### ./check-in/components/CheckInCard.tsx

This file re-exports the `CheckInCard` component from the `relay-shared/clients/components/CheckInCard` module.

#### ./check-in/components/CheckInLayout.tsx

This file exports a `CheckInHeader` component that provides a consistent layout and header for check-in related pages. It includes features like a logo, title, back button, and context menu.

#### ./check-in/components/CheckInModal.tsx

This file exports a `CheckInModal` component that manages the overall check-in process, including rendering the `FeelingsModal`, `MixedQuestionnaire`, and `CheckInProgress` components.

#### ./check-in/components/CheckInProgress.tsx

This file exports a `CheckInProgress` component that displays a progress bar and status for the check-in process.

#### ./check-in/components/NewCheckIn/JournalEntryPreview.tsx

This file exports a `JournalEntryPreview` component that displays a preview of the user's journal entry for the current check-in.

#### ./check-in/components/NewCheckIn/NewCheckInSummary.tsx

This file exports a `NewCheckInSummary` component that displays the final summary of the check-in, including the check-in card, journal entry, and buttons to finish or add a journal entry.

#### ./check-in/components/NewCheckIn/PromptForJournalEntry.tsx

This file exports a `PromptForJournalEntry` component that displays a prompt for the user to add a journal entry if they haven't already.

#### ./check-in/controllers/CheckInViewController.tsx

This file exports a `CheckInViewController` that manages the overall check-in process, including the different steps and components to be rendered.

#### ./check-in/conversations/PostCheckInConversationManager.tsx

This file exports a `PostCheckInConversationManager` class that handles the post-check-in conversation flow, including any assigned questionnaire tasks.

#### ./check-in/hooks/useCheckInsForMonth.ts

This file exports a `useCheckInsForMonth` hook that retrieves the check-ins for the current month. It is currently a placeholder with a TODO comment.

#### ./check-in/pages/NewCheckInPage.tsx

This file exports a `NewCheckInPage` component that renders the appropriate check-in step component based on the current state of the `CheckInViewController`.