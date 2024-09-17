## todos

This directory contains the core functionality for the Todo application, including the main `useTodo` hook that provides a unified interface for interacting with todos.

### Files

#### ./hooks/useTodo.ts

The `useTodo` hook is the primary interface for interacting with todos in the application. It provides a set of functions for creating, updating, and deleting todos, as well as fetching the details of a specific todo.

The hook uses the `useGetTodoQuery`, `useUpdateTodoMutation`, `useDeleteTodoMutation`, and `useCreateTodoMutation` hooks from the `useApi` module to communicate with the backend API. It also uses the `isObjectId` helper function from the `core/helpers` module to validate the provided todo ID.

The hook returns the current todo object (if it exists) and an object with the following methods:

- `create`: Creates a new todo
- `update`: Updates an existing todo
- `remove`: Deletes an existing todo

These methods are used to manage todos throughout the application.