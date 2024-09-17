## core

This directory contains the core components, helpers, and contexts that are used throughout the application. These are the fundamental building blocks that the rest of the codebase relies on.

### Files

#### ./core/components/Actionable.tsx

The `Actionable` component is a wrapper around a child component that adds a click/press action to it. It handles the differences between web and native platforms, using a `Pressable` component on native and attaching an `onClick` handler on web. This allows for a consistent API for adding actions to components across the application.

#### ./core/components/HeadedItems.tsx

The `HeadedItems` component provides a layout for displaying a list of items with a title above them. It uses the `Flex` and `Txt` components to create the structure.

#### ./core/components/IndicatorBadge.tsx

The `IndicatorBadge` component displays a badge with a count indicator. It is used to show the number of items associated with a particular element, such as unread messages or notifications. The component adjusts its appearance based on the count, using different background colors and text styles.

#### ./core/components/Pressable.tsx

The `Pressable` component is a custom button component that provides a consistent look and feel across the application. It supports various props for customizing its appearance and behavior, such as `color`, `size`, and `onPress`. The component handles the pressed state and applies the appropriate styles.

#### ./core/components/Txt.tsx

The `Txt` component is a wrapper around the `Text` component from React Native. It applies default styles and supports additional props for customization. This component ensures consistent text styling throughout the application.

#### ./core/helpers/index.ts

This file exports various helper functions and constants used in the core directory. These helpers provide common functionality and values that are reused across different components and modules.

#### ./core/contexts/index.ts

This file exports the contexts used in the core directory. Contexts allow for sharing data and functionality across components without the need for prop drilling. The specific contexts exported depend on the requirements of the application.
