## check-ins

This directory contains the core functionality for managing check-ins within the application. It includes hooks and utilities that handle the creation, retrieval, update, and deletion of check-in data.

### Files

#### `./hooks/useCheckIn.ts`

This file exports a custom hook called `useCheckInOrNew` that provides a unified interface for interacting with check-in data. It abstracts away the details of whether the check-in data is coming from the API or a new, unsaved check-in. The hook returns the current check-in data and a set of functions to create, update, and delete the check-in.

The hook uses several other hooks from the `../../api/hooks/useApi` module to perform the underlying CRUD operations on the check-in data. It also integrates with the `useNewCheckIn` hook from `../../../check-in/hooks/useNewCheckIn` to handle the case where the check-in is a new, unsaved one.

#### `./hooks/useRemainingCheckInsToday.ts`

This file exports a custom hook called `useRemainingCheckInsToday` that calculates the remaining check-in times for a given client based on the client's configured check-in schedule. The hook uses the `getCheckInTimesToday` utility function from `../../../clients/helpers/getCheckInTimes` to determine the check-in times for the current day, and then filters the list to only include times that have not yet passed.

The hook relies on the `useGetClientQuery` hook from `../../api/hooks/useApi` to retrieve the client's configuration data.