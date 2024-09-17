## hooks

This directory contains various custom hooks used throughout the application. These hooks provide a centralized way to manage state, handle API calls, and other common functionality.

### Files

#### ./hooks/useApi.tsx

This file contains the main API hook, `relayApi`, which is a Redux Toolkit Query (RTK Query) instance. It provides a set of pre-defined API endpoints for interacting with the backend, covering a wide range of functionality such as managing clients, todos, messages, journeys, and more.

The hook also includes utility functions like `useGetTodayTodos` and `useClientJourneys` that wrap the underlying RTK Query hooks to provide a more convenient interface.

#### ./hooks/useAuthHeaders.tsx

This hook provides the necessary authorization headers for making authenticated API requests. It retrieves the access token from the application's Redux store and returns an object with the `Authorization` header.

#### ./hooks/useLogin.ts

This hook handles the login functionality for the application. It provides a `loginFunc` function that takes an email and password, makes a request to the backend to authenticate the user, and then updates the Redux store with the user's information and access tokens.

The hook also includes a `loginWithTokensUser` function that can be used to log in a user directly with their tokens and user data, without going through the authentication process.

#### ./hooks/useLogout.ts

This hook provides a `logoutFunc` function that removes the user's access tokens and user data from the application's state and local storage. It also updates the user's expo push token in the backend if the user is a client.