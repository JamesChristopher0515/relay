## CompleteWorksheet

The `CompleteWorksheet` directory contains the code for the "Complete Worksheet" feature in the application. This feature allows users to view and interact with a worksheet that has been assigned to them, and to mark the worksheet as complete.

### Files

#### ./CompleteWorksheetPage.tsx

The `CompleteWorksheetPage` component is the main entry point for the "Complete Worksheet" feature. It fetches the necessary data (the worksheet, the client's worksheet, and the todo item) and renders the `CompleteWorksheetPageInner` component with the fetched data.

The `CompleteWorksheetPageInner` component is responsible for rendering the UI for the "Complete Worksheet" feature. It uses the `CompleteWorksheetController` to manage the state and behavior of the feature, and renders a `ConversationView` component to display the worksheet items.

The `CompleteWorksheetPageInner` component also includes some additional functionality, such as:
- Scrolling the `ConversationView` to the first incomplete item
- Displaying a header with the worksheet name and a "Back" button
- Displaying the section names and progress indicators for the worksheet items

The `CompleteWorksheetPageInner` component uses several helper functions and hooks, such as `useAssignedJourney`, `getAllWorksheetItems`, and `useKeyboard`, to implement its functionality.