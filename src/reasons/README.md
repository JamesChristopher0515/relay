## reasons

The `reasons` directory contains the components and utilities related to the "reasons" feature of the application. This feature allows users to select and express the reasons behind their feelings or actions.

### Files

#### ./components/ReasonIcon.tsx

The `ReasonIcon` component is responsible for rendering an image icon representing a specific reason. It takes a `reason` prop, which is a string that corresponds to a predefined set of reasons, and displays the appropriate icon.

The component uses a `reasonsMap` object to map the reason string to the corresponding image asset. If the provided `reason` is not found in the `reasonsMap`, the component will display a "Not found" message.

The `ReasonIcon` component is memoized to optimize performance by only re-rendering when the `reason` prop changes.