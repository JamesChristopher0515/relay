## time

The `time` directory contains utility functions and types related to working with time and date data in the application. I include functionality for calculating time ranges, formatting dates, and performing various date-related operations.

### Files

#### `./helpers/timeRangeMs.ts`

The `timeRangeMs` function calculates the duration in milliseconds between a given start and end date. It takes a `TimeRange` object as input, which defines the start and end dates, and returns the time difference in milliseconds. I use this function for calculating the duration of various time-based events or operations within the application.

The `TimeRange` interface defines the structure of the input object, with `start` and `end` properties of type `Date`.