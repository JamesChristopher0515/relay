## controllers

This directory contains the main controller components for the application. These controllers handle the logic and state management for various features and screens in the application.

### Files

#### ./controllers/ConversationController.tsx

The `ConversationController` is responsible for managing the state and lifecycle of a conversation. It uses the `RelayConversationManager` to handle the conversation data and events. The controller exposes the conversation manager, as well as derived state like `isLoading`, `items`, and `isFinished` to be used by other components.

#### ./controllers/OnboardingController.tsx

The `OnboardingController` is responsible for managing the state and logic related to the onboarding process. It fetches the user's upcoming todos, and uses that data to create an `OnboardingConversationManager` instance. This conversation manager is then exposed to other components that need to interact with the onboarding flow.

#### ./controllers/TodoConversationController.tsx

The `TodoConversationController` is responsible for managing the state and logic related to a conversation around a set of todos. It fetches the specified todos, and uses a `QuestionnaireConversationManager` to create and manage a conversation flow around those todos. The conversation manager is then exposed to other components that need to interact with the todo-related conversation.