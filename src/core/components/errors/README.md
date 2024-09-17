## errors

This directory contains the error handling components and utilities for the application. It includes a 404 page, as well as any other error-related functionality.

### Files

#### ./errors/Error404Page.tsx

The `Error404Page` component is responsible for rendering the 404 Not Found page. It displays a message indicating that the requested page could not be found, and provides a button to navigate back to the home page. This component is rendered when the user tries to access a route that does not exist in the application.

The component uses the `Flex` and `Txt` components from the `@mtyk/frontend/core/components` module to create the layout and display the message. It also imports the `RelayButton` component, which is a custom button component used throughout the application.

The `useHistory` hook from `@mtyk/frontend/core/hooks/routerHooks` is used to access the browser's history API, allowing the component to programmatically navigate back to the home page when the "Go back" button is clicked.