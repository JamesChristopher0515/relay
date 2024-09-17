## helpers

This directory contains various utility functions and modules that are used throughout the codebase. These helpers provide common functionality that is shared across different parts of the application, such as animation interpolation, theme management, and mathematical operations.

### Files

#### ./helpers/animation/interp.ts

This file exports two functions related to animation interpolation:

1. `interp`: This function takes a value and returns a function that can be used to linearly interpolate between a minimum and maximum value. It is commonly used in animations to smoothly transition between different states.

2. `rInterp`: This function takes a delta value, minimum value, maximum value, and an optional boolean flag to indicate if the output should be a percentage. It calculates the interpolated value based on the provided parameters and returns the result.

I use these interpolation functions to create smooth, dynamic animations in the application.

#### ./helpers/client-theme.ts

This file exports a `clientTheme` object that defines the default theme for the client-side application. The theme includes properties such as the background color. I use this theme throughout the codebase to ensure consistent styling and appearance.

#### ./helpers/fixes.ts

This file exports a `fixConfig` object and a `setAutoKeyboardDismiss` function. The `fixConfig` object contains a flag `autoKeyboardDismiss` that I use to control the automatic dismissal of the keyboard when the user interacts with the application. The `setAutoKeyboardDismiss` function allows me to update the value of this flag.

I find these utilities useful for addressing specific issues or quirks in the application, providing a centralized way to manage and apply these fixes.

#### ./helpers/math.ts

This file exports several mathematical utility functions:

1. `clamp`: This function takes a value and optional minimum and maximum values, and returns the value clamped within the specified range.
2. `toPercentage`: This function takes a number and converts it to a percentage string.
3. `fractionToPercentage`: This function takes a fraction (a number between 0 and 1) and converts it to a percentage string.
4. `Vector`: This is a class that represents a 2D vector, with properties for the x and y coordinates, and methods for calculating the length and normalizing the vector.

I use these mathematical utilities for various calculations and transformations throughout the application, such as in animations, layout, and data visualization.

#### ./helpers/newId.ts

This file exports a default function `newId` that generates a unique identifier. I import this function from a shared library or utility module and use it to generate unique IDs for various entities in the application, such as database records or UI elements.