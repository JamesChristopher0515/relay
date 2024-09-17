## reporting-stats

This directory contains the code for handling and managing reporting statistics in the application. It includes various helper functions and utilities for working with different types of reporting statistics, such as mood, journey, questionnaire results, and health data.

### Files

#### ./helpers/collections/StatCollectionHelper.ts

I define the `StatCollectionHelper` interface, which is used to provide information about different types of reporting stat collections. It includes properties like `collectionType`, `formatStat`, `valueDomain`, and `icon`, which are used to customize the display and behavior of each stat collection.

#### ./helpers/collections/healthCollectionHelper.ts

I define the `healthCollectionHelper`, which is a concrete implementation of the `StatCollectionHelper` interface for health-related reporting statistics. It includes functions to format the health data (steps, distance, and sleep) and provides the appropriate icons for each type of health data.

#### ./helpers/collections/journeyCollectionHelper.ts

I define the `journeyCollectionHelper`, which is a concrete implementation of the `StatCollectionHelper` interface for journey-related reporting statistics. It includes the `collectionType` and `icon` properties, but does not have any custom formatting logic.

#### ./helpers/collections/moodCollectionHelper.ts

I define the `moodCollectionHelper`, which is a concrete implementation of the `StatCollectionHelper` interface for mood-related reporting statistics. It includes a `valueDomain` property to specify the valid range of mood values, and a `formatStat` function to provide a textual description of the mood based on the feeling selections.

#### ./helpers/collections/questionnaireResultCollectionHelper.ts

I define the `questionnaireResultCollectionHelper`, which is a concrete implementation of the `StatCollectionHelper` interface for questionnaire result reporting statistics. It includes the `collectionType` and `icon` properties, but does not have any custom formatting logic.

#### ./helpers/collections/statCollectionHelpers.ts

I export an object `statCollectionHelpers` that maps collection types to their corresponding `StatCollectionHelper` instances. I also export a `getStatCollectionHelper` function that can be used to retrieve the appropriate `StatCollectionHelper` for a given collection type.

#### ./helpers/reportingStatCollectionId.ts

This file contains functions for creating and parsing reporting stat collection IDs. These IDs are used to uniquely identify different types of reporting statistics, such as mood, journey, questionnaire results, and health data. The file also includes helper functions for creating stat collection IDs for specific use cases, like questionnaire results, how I'm feeling, check-ins, word clouds, journeys, todos, and health data.