## layout

The `layout` directory contains components and controllers related to the overall layout and structure of the application. It provides reusable building blocks for constructing the user interface, ensuring a consistent and organized visual hierarchy.

### Files

#### `./layout/components/HorizontalSplit.tsx`

The `HorizontalSplit` component renders a horizontal layout with a flexible number of child elements. It uses the `Flex` component from the `@mtyk/frontend/core/components` library to achieve the desired layout. The component ensures that all child elements are rendered side-by-side, with the ability to customize the overall layout through the provided props.

#### `./layout/controllers/TabController.tsx`

The `TabController` is a custom controller that manages the state and behavior of a tab-based interface. It uses the `ArraySelectionController` from the `@mtyk/frontend/controllers/controllers/ArraySelectionController` library to handle the selection and activation of individual tabs. The controller provides a set of APIs, including the ability to retrieve the current active tab, as well as methods to set the selected tab programmatically.