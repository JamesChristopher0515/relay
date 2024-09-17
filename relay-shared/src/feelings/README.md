## feelings

The `feelings` directory contains the core functionality for managing and working with user feelings in the application. It includes utilities for getting, filtering, and describing feelings, as well as types and constants related to feelings.

### Files

#### ./helpers/getAllFeelings.ts

This file exports a set of functions and types related to feelings data. The main export is the `getAllFeelings()` function, which returns an array of all available feelings. Each feeling is represented as an object with a `name` and `valence` property.

The file also exports several helper functions:

- `getSimpleFeelings()`: Returns an array of the 5 most "simple" feelings (e.g. "good", "bad", "ok").
- `getFeelingColor(feeling)`: Returns a hex color code based on the `valence` of the given feeling.
- `getFeelingsAverage(feelings)`: Calculates the average valence and maximum arousal of the given feelings.
- `getFeelingName(feeling)`: Returns the capitalized name of the given feeling.
- `getFeelingDescription(feelings, includeEmoji)`: Generates a human-readable description of the given feelings.
- `getFeelingByName(name)`: Retrieves a feeling object by its name.

These functions provide a high-level API for working with feelings data in the application.