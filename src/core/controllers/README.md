## controllers

This directory contains the main controller components for the application. These controllers are responsible for managing the state and behavior of the various pages and features in the application.

### Files

#### ./controllers/PageNavController.tsx

The `PageNavController` is responsible for managing the navigation menu that appears across the top of the application. It defines the list of menu items, including their labels, icons, and corresponding URLs. The controller also uses the `useNavigation` hook to handle the state and behavior of the navigation menu.

The controller checks the user's `chatEnabled` status and conditionally includes a "Chat" menu item if the user has chat enabled. This allows the application to dynamically adjust the navigation menu based on the user's permissions and settings.

The `PageNavController` is a key component in the application, as it provides a consistent and intuitive navigation experience for the user across all pages.