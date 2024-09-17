## Settings

The `Settings` directory contains the core functionality and user interface for the application's settings screen. It includes the main `Settings` component, which renders the various settings options and controls, as well as the `Styles` module that defines the styles used throughout the settings screen.

### Files

#### `./Settings/Styles.ts`

The `Styles` module defines the styles used throughout the `Settings` screen. It includes styles for the main container, checkbox options, reminder options, privacy settings, and various other UI elements. I use these styles to ensure a consistent and visually appealing user interface across the different settings components.

#### `./Settings/index.tsx`

The `Settings` component is the main entry point for the settings screen. I import and use various components and hooks to render the different settings options and controls, such as:

- `SettingsCheckInController`: Handles the check-in settings, including the check-in message and reminder options.
- `SettingsHealthController`: Manages the health-related settings, such as the toggles for different health tracking features.
- `TimePicker`: Allows the user to select a time for the check-in reminder.
- `CheckBox`: Renders a checkbox for the check-in option.
- `SwitchToggle`: Provides a toggle switch for the health-related settings.

I also include functionality for logging out the user and navigating back to the previous screen.

The `Settings` component is responsible for coordinating the different settings-related functionality and rendering the user interface. I use the styles defined in the `Styles` module to ensure a consistent and visually appealing layout.