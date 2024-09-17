## Entries

The `Entries` directory contains the main components and styles for the Entries feature of the application. This feature allows users to view their daily check-ins, journal entries, and goals.

### Files

#### `EntriesMonth.tsx`

`EntriesMonth.tsx` contains the `EntriesMonth` component, which is responsible for rendering the calendar view of the Entries feature. It displays a month-by-month view of the user's check-ins and journal entries, with each day represented by a circle or an emoji icon indicating the user's feeling for that day.

The component uses the `getCalendarDays` helper function from `relay-shared/core/helpers/getCalendarDays` to generate the calendar days for the current month. It then renders a `FlatList` component to display the week rows, with each day's information being rendered by the `entriesDay` function.

The `entriesDay` function checks the status of the day (whether it's today, within the current month, etc.) and renders the appropriate UI element (circle or emoji icon) based on the user's check-in and journal entry data.

#### `Styles.ts`

`Styles.ts` contains the styles used by the Entries feature components. It defines styles for various UI elements, such as the month book container, week points, circle icons, and emoji logos.

The styles are organized using the StyleSheet API provided by React Native and are exported as a default object.

#### `index.tsx`

`index.tsx` is the main entry point for the Entries feature. It contains the `EntriesPage` component, which is responsible for rendering the overall Entries feature UI.

The `EntriesPage` component uses the `TabProvider` and `TabSwitcher` components from `@mtyk/frontend/core/components` to provide a tab-based navigation between the calendar and journal entry views.

The calendar view is rendered using the `EntriesMonth` component, while the journal entry view is rendered using the `JournalEntryPage` component.

The `EntriesPage` component also includes functionality for opening and closing the "My Goals" and "Add Goal" modals, which are implemented using the `Goals` and `AddGoal` components, respectively.

The `EntriesController` class from `relay-shared/entries/controllers/EntriesController` is used to manage the state and data related to the user's check-ins, journal entries, and goals.