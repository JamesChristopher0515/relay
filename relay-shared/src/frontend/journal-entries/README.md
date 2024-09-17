## journal-entries

This directory contains the code for managing journal entries in the application. It includes hooks, helpers, and other utility functions related to creating, updating, and deleting journal entries.

### Files

#### ./hooks/useJournalEntry.ts

The `useJournalEntry` hook is the primary interface for interacting with journal entries. It provides a unified way to retrieve, create, update, and delete journal entries. The hook abstracts away the details of the underlying API calls and state management, making it easy for other parts of the application to work with journal entries.

The hook supports both retrieving an existing journal entry by ID and creating a new "empty" journal entry. It returns the journal entry data, along with functions to update and delete the entry. The hook also handles date parsing and normalization to ensure a consistent format across the application.

#### ./hooks/useNewJournalEntry.ts

The `useNewJournalEntry` hook is a utility hook that manages the state of a new, unsaved journal entry. It uses the `useMemoryImmer` hook to provide an updatable, in-memory representation of a new journal entry. This hook is used by `useJournalEntry` to handle the creation of new journal entries.

#### ./helpers/newJournalEntry.ts

This file exports a function that returns a new, default journal entry object. This object is used as a starting point for creating new journal entries in the application.