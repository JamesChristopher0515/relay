## today

The `today` directory contains the components and utilities related to the "Today" page of the application. This page serves as the main dashboard for users, displaying their assigned tasks, appointments, and other relevant information.

### Files

#### ./today/components/TodayPage.tsx

The `TodayPage` component is the main entry point for the "Today" page. It fetches the user's assigned journeys and tasks, and renders them in a scrollable layout. The component also handles the onboarding process, redirecting the user to the onboarding flow if they haven't completed it yet.

The `TodayPage` component uses several other components from the `today` directory, such as `TodayJourney` and `TodoGroup`, to display the user's tasks and assigned journeys.

#### ./today/components/TodoGroup.tsx

The `TodoGroup` component is responsible for rendering a group of tasks (or "todos") based on their type (e.g., questionnaire, content, generic, check-in). It uses the `TodoGroupBox` and `TodoRow` components to display the tasks in an organized manner.

The `TodoGroup` component also uses the `infoForGroup` and `nameForType` utility functions to determine the appropriate styling and labeling for each task group.

#### ./today/components/TodoGroupBox.tsx

The `TodoGroupBox` component is a reusable container component that provides a consistent layout and styling for the task groups displayed in the `TodayPage`. It uses the `Flex` component from the `@mtyk/frontend/core/components` library to create a row-based layout with a shadow effect.

#### ./today/components/TodoRow.tsx

The `TodoRow` component is responsible for rendering a single task (or "todo") within a `TodoGroup`. It displays the task name, status (completed or not), and any associated appointment information. The component also handles the user's interaction with the task, such as marking it as complete.

The `TodoRow` component uses several utility functions and components, such as `useTodoControllerNative`, `FormattedDate`, and `CheckInCard`, to handle the task-related functionality and styling.

#### ./today/components/infoForGroup.tsx

The `infoForGroup` function is a utility that provides information about the styling and icons to be used for each task group type (e.g., questionnaire, content, generic, check-in). This information is used by the `TodoGroup` component to render the task groups consistently.

#### ./today/components/nameForType.tsx

The `nameForType` function is a utility that provides the human-readable name for each task group type (e.g., "Answer", "Content", "Todo", "Call"). This information is used by the `TodoGroup` component to display the appropriate label for each task group.
