## helpers

This directory contains utility functions and helper modules that are used throughout the codebase. These helpers provide common functionality and abstractions that are shared across multiple components and features.

### Files

#### ./helpers/isHelpfulAudioStatus.ts

I export a function `isHelpfulAudioStatus` that takes an optional `AVPlaybackStatus` object (from the `expo-av` library) and returns a type guard that checks if the object has the expected shape for a "helpful" audio status. This is useful for ensuring that an audio status object has all the necessary properties for rendering audio player UI and handling playback.

I use the `isObjectLike` helper from `@mtyk/frontend/types/helpers/isX` to perform the type guard check. This helps ensure that the status object has the expected shape before accessing its properties.

#### ./helpers/msToString.ts

I export a function `msToString` that takes a number of milliseconds and returns a string representation of the time in the format `"HH:MM:SS"`. This is useful for formatting audio playback position and duration values for display in the UI.

I handle cases where the input value is 0 or negative, returning `"0:00"` in those cases. I also handle formatting hours, minutes, and seconds appropriately based on the input value.