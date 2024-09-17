## resources

This directory contains various utility functions and types that I use throughout the codebase. These resources provide common functionality and data structures that are shared across different parts of my application.

### Files

#### ./helpers/getAllResourceTypes.ts

This file exports a function `getAllResourceTypes()` that returns a readonly array of the available resource types in my application. The resource types include `'questionnaire'`, `'content'`, and `'thinking-points'`. The `'thinking-points'` resource type refers to a specific client milestone stop, which in turn refers to a specific stop in a journey.

I also export the `ResourceType` type, which is a union of the available resource types. I use this type throughout the codebase to ensure consistency and type safety when working with resource types.