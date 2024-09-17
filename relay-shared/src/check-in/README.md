## check-in

The `check-in` directory contains the core functionality for the check-in feature of the application. This includes the main controller logic, helpers, and hooks for managing the check-in process.

### Files

#### ./check-in/controllers/CheckInController.ts

This file exports a custom controller function that encapsulates the main logic for the check-in feature. It provides a set of properties and methods that are used to manage the state and behavior of the check-in process, including:

- Greeting messages based on the user's current feeling
- Fetching and managing the list of feelings and reasons
- Updating the new check-in and journal entry documents
- Handling the selection and deselection of feelings and reasons
- Providing access to the currently selected feeling and reason

I use several custom hooks, such as `useNewCheckIn`, `useTimeOfDay`, and `useCreateCheckInMutation`, to interact with other parts of the application.

#### ./check-in/helpers/newCheckIn.ts

This file exports a function that returns a new, default `CheckIn` object. This object represents the initial state of a new check-in and is used as the starting point for the check-in process.

#### ./check-in/hooks/useNewCheckIn.ts

This file exports a custom hook that manages the state of a new check-in and journal entry. It uses the `useMemoryImmer` hook to provide an updatable, in-memory representation of the check-in and journal entry documents.

#### ./check-in/hooks/useTodayCheckIn.ts

This file exports a custom hook that fetches the latest check-in for the current user and the current day. It uses the `useGetCheckInsQuery` hook from the API to retrieve the check-in data.

#### ./check-in/reducers/checkinReducer.tsx

This file exports a React reducer function that handles updates to the check-in state. It is used in conjunction with the `useNewCheckIn` hook to manage the state of the check-in process.
