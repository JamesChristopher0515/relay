## layout

The `layout` directory contains the core components responsible for the overall layout and structure of the application's pages. It includes the `PageLayout` component, which serves as the main container for page content, and the `PageNavigation` component, which provides a navigation bar at the bottom of the screen.

### Files

#### ./layout/PageLayout.tsx

The `PageLayout` component is the main container for page content. It provides a consistent layout and structure for the application's pages, including a header, navigation, and other common elements. The component is highly configurable, allowing for the customization of various aspects such as the presence of the navigation bar, the inclusion of a header, and the handling of keyboard avoidance.

The `PageLayout` component uses several other components from the `@mtyk/frontend` library, such as `MTYKSafeAreaView`, `RelayAvoidingView`, and `ScalingPressable`, to ensure a consistent and responsive layout across different devices and platforms.

The component also integrates with the `DecorationsContext` to handle the opening and closing of the settings modal, and it includes a `PlayingResourceControls` component for managing playback-related controls.

#### ./layout/PageNavigation.tsx

The `PageNavigation` component provides a navigation bar at the bottom of the screen, allowing users to switch between different pages or sections of the application. The navigation bar is composed of a series of buttons, each representing a different page or section.

The `PageNavigation` component uses the `PageNavController` to manage the state and behavior of the navigation bar, including which page or section is currently active. It also utilizes the `ScalingPressable` component to provide a responsive and interactive user experience.

The navigation bar's appearance and behavior can be customized based on the screen width, with the option to display expanded labels for each navigation item.
