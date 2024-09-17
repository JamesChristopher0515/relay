## health

The `health` directory contains the implementation of a custom React hook `useHealth` that provides functionality for interacting with the Apple HealthKit API. This hook is responsible for fetching and managing health-related data, such as step count, sleep analysis, and distance walked/run, and storing it in a reporting statistics collection.

### Files

#### `./health/hooks/useHealth.ts`

The `useHealth` hook is the main entry point for interacting with the Apple HealthKit API. It provides the following functionality:

- Initializes the HealthKit API and requests the necessary permissions to access health data.
- Fetches health data (steps, sleep, distance) and stores it in the reporting statistics collection.
- Provides a `fetchStats` function that retrieves the latest health data from the reporting statistics collection.
- Includes a deprecated `isAuthorized` function, which is not recommended to use as it's not possible to reliably determine if the app has the necessary 'read' permissions.

The hook uses several utility functions and constants from the `react-native-health` library to interact with the HealthKit API. It also leverages the `useWrappedAxios` and `useClient` hooks from the `core` directory to make HTTP requests and access the client's settings, respectively.

The `createMissingStats` function is responsible for fetching the latest health data and storing it in the reporting statistics collection. It checks if the specific health type is enabled in the client's settings before fetching and storing the data.

The `fetchStats` function is the main entry point for retrieving health data. It first ensures that the HealthKit API is initialized, then calls the `createMissingStats` function for each supported health type (steps, sleep, distance) and returns the combined results.