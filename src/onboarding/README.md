## onboarding

The `onboarding` directory contains the code responsible for managing the onboarding process for new users of the application. This includes handling the presentation of onboarding tasks, tracking the user's progress, and triggering the completion of the onboarding flow.

### Files

#### `./onboarding/controllers/OnboardingController.tsx`

The `OnboardingController` is the main entry point for the onboarding functionality. It is responsible for the following:

1. Fetching the user's upcoming onboarding tasks (todos) from the API using the `useGetTodosQuery` hook.
2. Creating an `OnboardingConversationManager` instance to manage the presentation and progression of the onboarding tasks.
3. Listening for the "is-finished" event from the `OnboardingConversationManager` to detect when the user has completed the onboarding process.
4. Updating the user's onboarding status in the application state when the onboarding is complete.
5. Redirecting the user to the main application view when onboarding is finished.

The `OnboardingController` uses various shared hooks and utilities, such as `useClientShared`, `useWrappedAxiosShared`, and `wrapArrayHook`, to interact with the application's state and API.

The `OnboardingConversationManager` is a custom class that manages the presentation and progression of the onboarding tasks. It is responsible for handling the user's interactions with the onboarding tasks and triggering the appropriate events and state updates.