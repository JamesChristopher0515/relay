## core

This directory contains the core functionality and components of the Relay frontend application. It includes essential types, utilities, and hooks that are used throughout the codebase.

### Files

#### ./core/RelayFrontendTypes.tsx

This file defines the `RelayActionCreator` type, which is a function that returns another function. I use this pattern to create action creators that can access hook-based state and other contextual information.

#### ./core/components/FormattedDate.tsx

This file contains the `FormattedDate` component, which is responsible for rendering dates in a user-friendly format. It supports relative time formatting (e.g., "2 days ago"), as well as various date formatting options. The component uses the `date-fns` library for date manipulation and formatting.

The `FormattedDate` component also exports several utility functions, such as `safeFormat`, `getTimeTo`, `omitYearForLast12Months`, and `formatDate`, which I use to format dates in a consistent manner across the application.

#### ./core/helpers/config.ts

This file exports a `Config` function and a `config` object, which I use to manage the configuration of the Relay frontend application. The `Config` function allows me to set and retrieve configuration values, such as the `localStorage` implementation.

#### ./core/helpers/getTimeOfDay.ts

This file exports a `getTimeOfDay` function, which returns the current time of day (morning, afternoon, or evening) based on the user's local time.

#### ./core/hooks/useRelayActions.ts

This file exports a `useRelayActionDispatch` hook, which I use to create memoized action dispatchers. These dispatchers can access hook-based state and other contextual information, making it easier for me to manage complex state and side effects in the application.