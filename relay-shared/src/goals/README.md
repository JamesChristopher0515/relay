## goals

The `goals` directory contains the code responsible for managing and interacting with the goals feature of the application. It includes controllers, helpers, and hooks that encapsulate the logic for creating, reading, updating, and deleting goals.

### Files

#### ./goals/controllers/GoalsController.tsx

The `GoalsController` is a reusable controller component that provides a high-level interface for interacting with the goals-related functionality. It uses the `useGetGoalsQuery`, `useCreateGoalMutation`, and `useDeleteGoalMutation` hooks from the `useApi` module to fetch, create, and delete goals, respectively. The controller also includes helper functions like `mutationForwarder` and `wrapArrayHook` to simplify the usage of these hooks.

#### ./goals/helpers/newGoal.ts

The `newGoal` helper function is responsible for creating a new goal object with the necessary default properties, such as `_id`, `client`, `goal`, `createdAt`, and `updatedAt`. This function is used to initialize a new goal in the application.

#### ./goals/hooks/useNewGoal.ts

The `useNewGoal` hook is a custom hook that uses the `useMemoryImmer` hook and the `newGoal` helper function to provide a way to create and manage a new goal in the application's state. It is used in conjunction with the `GoalsController` to handle the creation of new goals.
