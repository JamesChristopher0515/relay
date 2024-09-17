## journal-entries

This directory contains the code for managing journal entries in the application. It includes a controller for handling the creation, update, and deletion of journal entries, as well as a helper function for creating a new journal entry.

### Files

#### ./journal-entries/controllers/JournalEntryController.ts

This file exports a `JournalEntryController` function that serves as a controller for managing journal entries. It uses several hooks, including `useCheckIn`, `useJournalEntryOrNew`, and `useClientShared`, to handle the logic for creating, updating, and deleting journal entries.

The controller supports two types of journal entries: those associated with a check-in, and standalone journal entries. It provides a `createOrUpdate` function that handles the appropriate logic based on the type of journal entry being created or updated.

The controller exports the following key functions and properties:
- `journalEntry`: The current journal entry document.
- `createOrUpdate`: A function that creates or updates a journal entry based on the provided props.
- `create`, `update`, and `remove`: Functions for creating, updating, and removing journal entries, respectively.

#### ./journal-entries/helpers/newJournalEntry.ts

This file exports a `newJournalEntry` function that returns a new, empty journal entry object with the necessary properties, excluding `client` and `createdAt` which are set elsewhere.