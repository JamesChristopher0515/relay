## todos

This directory contains the code for the todo management functionality of the application. It includes components, hooks, and utility functions related to creating, updating, and managing todo items.

### Files

#### ./todos/components/TodoDetailsModal.tsx

This file defines the `TodoDetailsModal` component, which renders a modal that displays the details of a specific todo item. The modal includes the todo's name, description, and a button to mark the todo as complete. The component uses various hooks and utilities from the `@mtyk/frontend` library to handle the UI and state management.

#### ./todos/hooks/useTodoControllerNative.ts

This file defines the `useTodoControllerNative` hook, which is a custom hook that provides a set of functions and properties for managing a todo item. The hook uses the `makeController` utility from `@mtyk/frontend/controllers/helpers/makeController` to create a controller object that encapsulates the todo's state and actions. The hook also integrates with other parts of the application, such as the router and the `DecorationsContext`.

The `useTodoControllerNative` hook handles various todo-related actions, such as completing a todo, opening a todo's details, and navigating to related views (e.g., questionnaires, worksheets, appointments). It also manages the state of the todo, including whether it is a questionnaire, worksheet, or appointment.

The hook uses the `useTodo` hook from `relay-shared/frontend/todos/hooks/useTodo` to fetch and update the todo data from the server. It also utilizes other hooks and utilities from the `@mtyk/frontend` library to handle UI-related concerns, such as opening modals and managing dimensions.