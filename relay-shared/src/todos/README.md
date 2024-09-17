## todos

This directory contains the code for managing and displaying the user's todo items. It includes controllers, helpers, and hooks that handle the logic for fetching, updating, and categorizing todos.

### Files

#### ./todos/controllers/TodayViewController.tsx

The `TodayViewController` component is responsible for fetching and managing the user's todos for the current day. It groups the todos by type (check-in, assigned journey, etc.) and calculates various metrics like the completion percentage and whether all tasks are complete. The component returns an object containing the todos, their categorization, and other relevant data.

#### ./todos/controllers/TodoController.tsx

The `TodoController` component handles the actions and state of a single todo item. It determines the type of the todo (questionnaire, worksheet, appointment, etc.) and provides methods to complete the todo or open any associated content or resources.

#### ./todos/helpers/getTodoInfo.ts

The `getTodoInfo` helper function takes a todo object and returns an object with the todo's type added to it. The todo type is determined by the `getTodoType` helper function.

#### ./todos/helpers/getTodoType.ts

The `getTodoType` helper function determines the type of a todo based on its properties (e.g., whether it has a questionnaire, content, or appointment associated with it).

#### ./todos/hooks/usePendingInteractiveTodos.ts

The `usePendingInteractiveTodos` hook uses the `TodayViewController` to filter the user's todos and return only the ones that are not complete and have an assigned resource (i.e., interactive todos).