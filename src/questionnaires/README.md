## questionnaires

The `questionnaires` directory contains the code related to the questionnaire functionality in the application. It includes components, actions, and utility functions that handle the rendering, logic, and data management of questionnaires.

### Files

#### ./questionnaires/actions/openQuestionnaire.action.ts

This file exports a function `openQuestionnaire` that is responsible for fetching the data for a specific questionnaire using the `useGetQuestionnaireQuery` hook from the `relay-shared/frontend/api/hooks/useApi` module. The function takes a `questionnaire` parameter, which is the ID of the questionnaire to be fetched, and returns a function that can be used to open the questionnaire.

#### ./questionnaires/components/MixedQuestionnaire.tsx

This component is responsible for rendering a questionnaire that includes both todo items and conversation-based questions. It uses the `TodoConversationController` to manage the todo items and the `ConversationView` component to render the conversation-based questions. The component receives `todoIds` and `onFinish` props, which are used to configure the todo items and the callback function to be executed when the questionnaire is completed.

#### ./questionnaires/components/OnboardingPage.tsx

This component is responsible for rendering the onboarding experience for the application. It uses the `OnboardingController` to manage the conversation-based onboarding process and the `ConversationView` component to render the conversations. The component also includes a header with options to start the onboarding process again or log out of the application.

#### ./questionnaires/components/QuestionnaireInformation.tsx

This component is responsible for rendering the information for a single questionnaire question. It receives a `question` prop, which is an object of type `SingleQuestionnaireQ`, and displays the question text.

#### ./questionnaires/components/QuestionnairePage.tsx

This component is responsible for rendering the `MixedQuestionnaire` component with the appropriate `todoIds` and `onFinish` props based on the URL parameters.

#### ./questionnaires/components/QuestionnaireQuestionClient.tsx

This component is responsible for rendering the questionnaire questions and handling user interactions. It uses the `QuestionnaireContext` to access the current questionnaire and question data, and it includes logic for rendering the question text, answer options, and navigation buttons. The component also includes a help modal that can be displayed when the user taps on the question mark icon.

#### ./questionnaires/contexts/QuestionnaireContext.tsx

This file exports a React context that is used to manage the state and behavior of the questionnaire. The context includes properties such as the current questionnaire, the current question, the user's selected answer, and functions for answering questions and navigating between questions.

#### ./questionnaires/helpers/QuestionnaireTypes.tsx

This file exports a type `SingleQuestionnaireQ` that represents a single questionnaire question, including the questionnaire and the question object.

#### ./questionnaires/helpers/getQuestionnaireColorScheme.ts

This file exports a function `getQuestionnaireColorScheme` that returns a color scheme object based on the current questionnaire. The color scheme is used to style the questionnaire components.
