## feelings

The `feelings` directory contains the components and utilities related to the representation and handling of user emotions or feelings within the application. This directory is a crucial part of the application's user experience, as it allows users to express and share their emotional states.

### Files

#### ./components/FeelingIcon.tsx

The `FeelingIcon` component is responsible for rendering an image-based icon representing a specific feeling or emotion. It takes a `feeling` prop, which is a string that corresponds to a predefined feeling in the `feelingsMap` array. The component then renders the appropriate image for the given feeling, with the ability to adjust the size of the icon through the `size` prop.

The `feelingsMap` array is a central data structure that defines the available feelings, their corresponding image assets, and their associated "valence" or emotional intensity value. This mapping ensures consistent representation of feelings throughout the application.

The `FeelingIcon` component is memoized to optimize performance by only re-rendering when the `feeling` prop changes, reducing unnecessary re-renders.