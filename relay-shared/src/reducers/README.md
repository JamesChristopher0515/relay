## reducers

The `reducers` directory contains the Redux reducers for the application. Reducers are responsible for handling state updates in response to actions dispatched by the application.

### Files

#### `index.js`

The `index.js` file is the entry point for the reducers. It combines all the individual reducers into a single root reducer using the `combineReducers` function from Redux. This combined reducer is then exported as the default export.

#### `userReducer.js`

The `userReducer.js` file contains the reducer responsible for managing the user's state. It handles actions related to user authentication, such as logging in, logging out, and updating user information. The reducer exports a single function, `userReducer`, which is used to update the user's state in the Redux store.

#### `postReducer.js`

The `postReducer.js` file contains the reducer responsible for managing the state of the application's posts. It handles actions related to creating, reading, updating, and deleting posts. The reducer exports a single function, `postReducer`, which is used to update the posts state in the Redux store.

#### `commentReducer.js`

The `commentReducer.js` file contains the reducer responsible for managing the state of the application's comments. It handles actions related to creating, reading, updating, and deleting comments. The reducer exports a single function, `commentReducer`, which is used to update the comments state in the Redux store.