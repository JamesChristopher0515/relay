## reducers

The `reducers` directory contains the Redux reducers for the application. These reducers are responsible for managing the state of the application and updating it in response to actions dispatched by the application.

### Files

#### ./reducers/authReducer.tsx

The `authReducer.tsx` file contains the reducer responsible for managing the authentication state of the application. This includes the user's access and refresh tokens, as well as the user's profile information.

The `AuthState` interface defines the shape of the authentication state, which includes the following properties:

- `ready`: a boolean indicating whether the authentication state has been initialized
- `tokens`: an object containing the user's access and refresh tokens, each with a `token` and `expires` property
- `user`: an optional `User` object containing the user's profile information

The `slice` object created using `createSlice` from the `@reduxjs/toolkit` package defines two reducer functions:

- `setTokens`: updates the `tokens` property of the state with the provided tokens
- `setUser`: updates the `user` property of the state with the provided user information

These reducer functions are used to update the authentication state in response to actions dispatched by the application.