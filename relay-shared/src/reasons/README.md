## reasons

This directory contains the core functionality for the "reasons" feature of the application. It provides a way to retrieve a list of predefined reasons, as well as a utility function to format the reason names.

### Files

#### ./reasons/helpers/getAllReasons.ts

This file exports a function `getAllReasons()` that returns an array of predefined reasons. Each reason is represented as an object with a `name` property. This list of reasons is used throughout the application to allow users to select from a set of common reasons.

#### ./reasons/helpers/getReasonName.ts

This file exports a function `getReasonName(reason)` that takes a reason object and returns a formatted name for that reason. If the `reason` object has a `custom` property, that value is used. Otherwise, the `name` property is capitalized using the `capitalize` function from the Lodash library.

This utility function is used to consistently format the display of reason names throughout the application.