## components

This directory contains the core React components used throughout the application. These components are responsible for rendering the user interface and handling user interactions.

### Files

#### ./components/ConversationButtons.tsx

The `ConversationButtons` component renders the buttons that allow the user to select an answer to a questionnaire question. It maps the available answers to `RelayButton` components and provides a `CircularButton` component to submit the selected answer. The component uses the `mapQuestionAnswers` utility function from the `relay-shared/questionnaires/helpers` module to retrieve the answer information.

#### ./components/ConversationCard.tsx

The `ConversationCard` component is a reusable card-like component that displays a questionnaire question and its associated help text. It presents the question to the user in a visually appealing way.

#### ./components/ConversationVerticalSlider.tsx

The `ConversationVerticalSlider` component is a custom vertical slider component that displays the available answers for a questionnaire question. It uses the `VerticalSlider` component from the `core/components/forms` module and the `mapQuestionAnswers` utility function to render the answer options. The component also includes a `RelayButton` component to allow the user to move to the next question.

#### ./components/WellbeingFeeling.tsx

The `WellbeingFeeling` component renders an icon representing a user's well-being feeling. It uses the `RC` component from the `relay-shared/core/components` module to render the appropriate icon based on the provided index.