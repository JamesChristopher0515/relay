## conversations

The `conversations` directory contains the core functionality for managing and rendering conversations within the application. It includes various components, controllers, and utility functions that work together to provide a seamless conversation experience for users.

### Files

#### ./conversations/BasicConversation.tsx

The `BasicConversation` class extends the `RelayConversation` class and serves as a base class for other conversation types. It provides a default state and a constructor that takes in `RelayConversationOptions` to initialize the conversation.

#### ./conversations/ConversationFlatList.tsx

The `ConversationFlatList` component is a custom `FlatList` implementation that adds a sliding animation effect to the rendered items. It is used to display a list of conversation items in the application.

#### ./conversations/OnboardingConversation.tsx

The `OnboardingConversationManager` class is responsible for managing the onboarding conversation flow. It sets up a series of conversations, including `WellbeingConversation`, `MotivationConversation`, and `QuestionnaireConversation`, based on the assigned questionnaire todos. It also adds some additional basic conversations for introductory and finishing steps.

#### ./conversations/ProgressBar.tsx

This file contains the implementation of a progress bar component used within the conversations.

#### ./conversations/WellbeingCardImageGrid.tsx

The `WellbeingCardImageGrid` component renders a grid of image-based options for a wellbeing questionnaire question. Users can select an option by tapping on the corresponding card.

#### ./conversations/components/ConversationVerticalSlider.tsx

The `ConversationVerticalSlider` component is a custom vertical slider used within conversations. It allows users to select an answer from a list of options by sliding a knob up and down.

#### ./conversations/components/WellbeingFeeling.tsx

The `WellbeingFeeling` component is a reusable component that displays an icon and label representing a user's wellbeing feeling.

#### ./conversations/controllers/ConversationController.tsx

The `ConversationController` is a controller that manages the state of a conversation, including whether it is finished or loading, and the current conversation items.

#### ./conversations/controllers/OnboardingController.tsx

The `OnboardingController` is a controller that manages the state of the onboarding conversation, including the `OnboardingConversationManager` instance.
