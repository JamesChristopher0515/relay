## case-notes

The `case-notes` directory contains the code responsible for managing case notes within the application. Case notes are a key feature that allow users to record and track important information related to a specific case or client.

### Files

#### ./hooks/useCaseNote.ts

The `useCaseNote` hook is a custom React hook that provides an abstraction over the API calls needed to fetch a single case note by its unique identifier. It utilizes the `useSingleResource` hook from the `../../api/hooks/useSingleResource` module to handle the underlying API request and response logic. This hook is used throughout the application wherever a single case note needs to be retrieved and displayed.