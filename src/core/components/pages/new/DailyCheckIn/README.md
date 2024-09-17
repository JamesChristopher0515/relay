## DailyCheckIn

The DailyCheckIn directory contains the React components responsible for the daily check-in flow in the application. This includes components for selecting a mood, feelings, and reasons, as well as the final summary screen.

### Files

#### ./DailyCheckIn/CheckInBackForward.tsx

This component renders the "Back" and "Next" buttons that allow the user to navigate through the check-in flow. It is used across multiple pages to provide a consistent navigation experience.

The component receives a `checkInViewController` prop, which is an instance of the `CheckInViewController` class. This allows it to interact with the view controller and perform actions like going back or progressing to the next step.

#### ./DailyCheckIn/CheckInFeelingPage.tsx

This component renders the page where the user selects their feelings. It uses the `CheckInItemPicker` component to display a list of feelings for the user to choose from.

#### ./DailyCheckIn/CheckInItemPicker.tsx

This is the main component responsible for rendering the list of feelings or reasons that the user can select from. It uses a `ViewPager` component to display the items in a paginated layout, and provides functionality for selecting and deselecting items.

The component receives a `select` prop that determines whether it should display feelings or reasons. It also receives various props from the `CheckInViewController` instance to interact with the view controller and update the selected feeling or reason.

#### ./DailyCheckIn/CheckInMood.tsx

This component renders the initial mood selection screen, where the user can choose a simple feeling to start their check-in.

The component uses the `getSimpleFeelings()` function to display a grid of basic feelings, and allows the user to select one. It then updates the `initialFeeling` and `feeling` properties of the `CheckInViewController` instance accordingly.

#### ./DailyCheckIn/CheckInReason.tsx

This component renders the page where the user can select a reason for their current feelings. It uses the `CheckInItemPicker` component to display the list of reasons.

#### ./DailyCheckIn/CompleteCheckIn.tsx

This component renders the final summary screen of the check-in flow. It displays a conversation-style interface using the `ConversationView` component, which is managed by the `PostCheckInConversationManager`.

The `CompleteCheckIn` component receives an `assignedQuestionnaireTodos` prop, which is an array of tasks that the user needs to complete after the check-in.

#### ./DailyCheckIn/Styles.ts

This file contains the styles used across the various components in the DailyCheckIn directory.

#### ./DailyCheckIn/renderCustomEdit.tsx

This file exports a function called `renderCustomEdit` that is used to render a custom edit input field and a list of items (either feelings or reasons) in the `CheckInItemPicker` component.

#### ./DailyCheckIn/renderFeeling.tsx

This file exports a function called `renderFeeling` that is used to render a single feeling item in the `CheckInItemPicker` component.

#### ./DailyCheckIn/renderReason.tsx

This file exports a function called `renderReason` that is used to render a single reason item in the `CheckInItemPicker` component.