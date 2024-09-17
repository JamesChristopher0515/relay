## settings

The `settings` directory contains the components and controllers related to the user's settings page in the application. This page allows the user to manage various settings, such as their account information, check-in preferences, and health data sharing.

### Files

#### `./settings/components/SettingsAccount.tsx`

This file contains the `SettingsAccount` component, which renders the account section of the settings page. It displays the user's account information and provides a logout button to allow the user to sign out of the application.

The component uses the `useLogout` hook to handle the logout functionality, and it also utilizes the `DecorationsContext` to manage the display of the settings modal.

#### `./settings/components/SettingsCheckInController.tsx`

This file contains the `SettingsCheckInController` component, which is responsible for managing the check-in settings for the user. It retrieves the user's current check-in options, such as the frequency and notification times, and provides a way for the user to update these settings.

The controller uses the `useClient` hook to access the user's information and the `usePractitioner` hook to retrieve the practitioner's name, which is used to display a custom check-in message.

#### `./settings/components/SettingsHealthController.tsx`

This file contains the `SettingsHealthController` component, which manages the user's health data sharing settings. It provides a set of toggles that allow the user to enable or disable the sharing of specific health data types, such as sleep, distance, and steps.

The controller uses the `useHealth` hook to handle the authorization and fetching of health data, and it prompts the user to grant permission to access their health data if they choose to enable sharing.

#### `./settings/components/SettingsModal.tsx`

This file contains the `SettingsModal` component, which is responsible for rendering the settings page in a modal overlay. It uses the `DecorationsContext` to manage the display and closing of the modal, and it wraps the `NewsSettings` component (which is not included in the provided code) in a `TransitionManager` to handle the modal's animation.

The modal is displayed when the user interacts with a settings-related action, and it can be closed by tapping the background.

#### `./settings/components/SettingsSection.tsx`

This file contains the `SettingsSection` component, which is a reusable component used to structure the individual sections of the settings page. It provides a consistent layout and styling for the sections, including a title and an optional icon.

The file also includes two additional components, `SettingsTitleSvg` and `SettingsTitleFA`, which are used to render the section titles with either an SVG or a FontAwesome icon.

These components are used throughout the settings page to create a cohesive and visually appealing user interface.