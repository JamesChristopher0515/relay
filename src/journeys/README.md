## journeys

The `journeys` directory contains the components and logic related to the user's assigned journeys. It provides the functionality to display and interact with the user's current journey, including the ability to view the journey's progress, history, and associated tasks.

### Files

#### `./journeys/components/AssignedJourneyPage.tsx`

This file defines the `AssignedJourneyPage` component, which is responsible for rendering the user's assigned journey. It displays the journey's name, the current milestone, and a conversation view that guides the user through the journey's tasks. The component also includes a history section that shows the user's progress through the journey.

The `AssignedJourneyPage` component uses several hooks and utility functions from the `relay-shared` module to fetch and manage the assigned journey data, including `useAssignedJourneyWithInfo` and `useAssignedJourneyHistory`.

#### `./journeys/components/JourneyHistory.tsx`

The `JourneyHistory` component is responsible for rendering the history of the user's progress through the assigned journey. It displays a list of completed tasks and their associated milestones, using the `MilestoneHistoryItem` component to render each individual item.

The component uses the `useAssignedJourneyWithInfo` and `useAssignedJourneyHistory` hooks to fetch the necessary data for the journey history.

#### `./journeys/components/MilestoneHistoryItem.tsx`

The `MilestoneHistoryItem` component is responsible for rendering a single item in the journey history. It displays the name of the completed task and the associated milestone, as well as an icon indicating whether the task has been completed or is still in progress.

The component uses the `useTodoControllerNative` hook to manage the state and behavior of the task, and the `findJourneyStop` utility function to retrieve the relevant journey stop information.

#### `./journeys/components/StopTxtClient.tsx`

The `StopTxtClient` component is a utility component that renders the appropriate text for a given journey stop, based on the stop's type (e.g., todo, questionnaire, content, etc.). It uses the `useEntityLink` hook to generate links for certain stop types.

#### `./journeys/components/TodayJourney.tsx`

The `TodayJourney` component is responsible for rendering a summary of the user's current assigned journey on the Today page. It displays the journey's name, the current milestone, and the number of incomplete tasks. The component also includes a progress bar to show the user's overall progress through the journey.

The component uses the `useAssignedJourneyWithInfo` hook to fetch the necessary data for the assigned journey, and the `TodayViewController` to retrieve the user's incomplete tasks.

#### `./journeys/conversations/JourneyConversation.tsx`

The `JourneyConversation` class is a custom conversation manager that handles the conversation flow for the user's assigned journey. It displays the user's current tasks and provides prompts to guide the user through completing them.

The conversation manager uses the `RelayConversation` base class and defines custom responders to handle the different types of tasks (e.g., worksheets, questionnaires, content).