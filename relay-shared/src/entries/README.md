## entries

The `entries` directory contains the controller and related components for the entries feature of the application. This feature allows users to view and manage their daily check-ins, which can include journal entries and feelings.

### Files

#### `./entries/controllers/EntriesController.tsx`

The `EntriesController` is the main controller for the entries feature. It is responsible for fetching and managing the user's check-in data, including grouping the check-ins by month and providing utility functions to access information about specific days and months.

I use the `useTodayCheckIn` hook to determine if the user has checked in for the current day, and the `useGetCheckInsQuery` hook to fetch the user's check-in data. I then group the check-ins by month and provide utility functions to access information about specific days and months, such as the number of check-ins, whether there are journal entries or feelings associated with the check-ins, and the latest check-in for a given day.

I also provide a `loadMore` function that allows the user to load more check-in data by fetching check-ins from earlier months.

The `EntriesController` is wrapped with the `makeController` function, which is a custom utility that helps manage the state and lifecycle of the controller.