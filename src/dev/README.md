## dev

This directory contains the core components and functionality of our application. It includes the main user interface elements, state management, and other essential features.

### Files

#### ./components/RenderCount.tsx

The `RenderCount` component is a simple utility component that displays the current render count of the component. It uses the `React.useRef` hook to maintain a reference to the current render count, which is incremented and displayed on each render.

This component is useful for debugging and performance monitoring, as it allows developers to quickly see how many times a component has been rendered.

The `RenderCount` component uses the `WHText` component from the `../../core/wh-components/WHText` module to display the render count. This ensures a consistent look and feel with the rest of the application.