## calendar

This directory contains the components and utilities related to the calendar functionality in the application. The main component is the `RelayCalendar` which provides a customizable calendar view with various features like selecting a date range, disabling past or future dates, and styling individual days.

### Files

#### ./calendar/components/Ratioed.tsx

The `Ratioed` component is a utility component that ensures a child component maintains a specific aspect ratio, regardless of the parent container's size. It is used to maintain the square shape of the calendar days in the `RelayCalendar` component. The component adjusts the height of the child based on the provided `widthToHeight` ratio, ensuring a consistent layout.

#### ./calendar/components/RelayCalendar.tsx

The `RelayCalendar` component is the main calendar component in the application. It displays a monthly calendar view, allowing the user to navigate through different months, select a date, and interact with the calendar. The component uses the `Ratioed` component to maintain the square shape of the calendar days, and it provides various props to customize the calendar's appearance and behavior, such as disabling past or future dates, applying custom styles to individual days, and handling date selection.

The `RelayCalendar` component uses the `dayjs` library for date manipulation and formatting, and it integrates with the application's form handling through the `useInputAdapter` hook. The component also includes various utility functions to calculate the days to display for a given month, determine the selected day, and handle date selection.