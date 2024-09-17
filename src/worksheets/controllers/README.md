## controllers

This directory contains the controller logic for the application's main features. The controllers are responsible for managing the state and behavior of various components, handling user interactions, and coordinating with other parts of the codebase.

### Files

#### ./controllers/CompleteWorksheetController.tsx

This file contains the `CompleteWorksheetController`, which manages the state and behavior of the "Complete Worksheet" feature. It sets up the necessary conversation managers, handles user interactions, and manages the communication with the backend API to save the worksheet responses.

I use the `BasicConversationManager` and `RelayConversationManager` from the `conversations` module to manage the conversation flow. I also utilize the `useGetClientWorksheetsQuery` hook from the `relay-shared/frontend/api/hooks/useApi` module to fetch the client's worksheets.

The `CompleteWorksheetController` exports the `CompleteWorksheetControllerProps` interface, which defines the required props for the controller. It also exports the default function component that implements the controller logic.

#### ./controllers/CompleteWorksheetStore.tsx

This file contains the `CompleteWorksheetStore`, which is a MobX-powered store that manages the state related to the "Complete Worksheet" feature. It keeps track of the currently editing worksheet item and its index.

I export the `CompleteWorksheetStore` as a singleton instance, `completeWorksheetStore`, which can be imported and used throughout the application.

#### ./controllers/WorksheetTableEditController.tsx

This file contains the `WorksheetTableEditController`, which manages the state and behavior of the worksheet table editing feature. It handles user interactions, such as switching between cells, adding or updating responses, and managing the editing state.

I utilize the `worksheetEditStore` from the `./controllers/WorksheetTableEditStore.tsx` file to manage the shared state of the worksheet table editing feature. I export various helper functions and properties to facilitate the editing experience.

#### ./controllers/WorksheetTableEditStore.tsx

This file contains the `WorksheetTableEditStore`, which is a MobX-powered store that manages the state related to the worksheet table editing feature. It keeps track of the currently editing worksheet item, the response data, and the current editing row and column.

I export the `WorksheetTableEditStore` as a singleton instance, `worksheetEditStore`, which can be imported and used throughout the application.