## journeys

The `journeys` directory contains the logic and data structures related to the management and representation of journeys within the application. Journeys are a core concept in the application, representing a sequence of milestones and stops that a client progresses through.

### Files

#### `./journeys/JourneyTypes.ts`

This file defines the TypeScript interface `JourneyStopId`, which represents the unique identifier for a specific stop within a journey. It contains the `milestoneId` and `stopId` properties.

#### `./journeys/helpers/findJourneyStop.ts`

This file exports a function `findJourneyStop` that takes a `journey` object, a `milestone` ID, and a `stop` ID, and returns the corresponding `milestone`, `milestoneIndex`, `stop`, and `stopIndex` objects. This is a utility function used to locate a specific stop within a journey.

#### `./journeys/helpers/getAllJourneyStops.ts`

This file exports a function `getAllJourneyStops` that takes a `journey` object and returns a flattened array of all the stops across all the milestones in the journey. This is a utility function used to retrieve all the stops in a journey.

#### `./journeys/helpers/getAssignedJourneyProgress.ts`

This file exports two functions: `getAssignedJourneyProgressFromSingleStop` and `getAssignedJourneyProgress`. These functions calculate the progress of a client through an assigned journey, taking into account the completed stops and milestones. The functions use the `findJourneyStop` utility to locate the relevant stops and milestones.

#### `./journeys/helpers/getClientStopName.ts`

This file exports a function `getClientFacingStopName` that takes a `JourneyStop` object and returns a human-readable name for the stop, based on its type (e.g., "Review", "Questionnaire").

#### `./journeys/helpers/getMilestoneLabel.ts`

This file exports a function `getMilestoneLabel` that takes a `journey` object and a `milestoneIndex` and returns a formatted label for the milestone, including the milestone number and name.

#### `./journeys/helpers/getStopTypeInfo.ts`

This file defines an interface `JourneyMilestoneStopType` and exports an array of objects that describe the different types of stops that can be part of a journey (e.g., "Content", "Questionnaire", "Worksheet"). It also exports a `getStopTypeInfo` function that retrieves the information for a given stop type.

#### `./journeys/helpers/groupClientStopsByMilestoneChange.ts`

This file exports a function `groupClientStopsByMilestoneChange` that takes a `journey` object and an array of `ClientMilestoneStop` objects, and returns an object with two properties: `groupedByMilestoneChanges` (an array of arrays, where each inner array represents the stops associated with a specific milestone) and `sortedNewestFirst` (the original array of stops sorted by creation date in descending order).