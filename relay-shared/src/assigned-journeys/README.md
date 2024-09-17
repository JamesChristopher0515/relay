## assigned-journeys

This directory contains the code related to assigned journeys, which are instances of a user's progress through a specific journey. The code in this directory handles the logic and state management for assigned journeys, including fetching and managing data related to the assigned journey, its milestones, and client stops.

### Files

#### ./helpers/getAssignedJourneyActiveMilestoneIndex.ts

I created this file to export a function `getAssignedJourneyActiveMilestoneIndex` that calculates the progress of a user's assigned journey based on the current client stop. It takes in the journey, the assigned journey, and the current client stop, and returns an object with the progress, milestone index, stop index, and the current milestone.

#### ./hooks/useAssignedJourney.ts

I wrote this file to export a custom React hook `useAssignedJourney` that fetches and returns an assigned journey based on the provided ID.

#### ./hooks/useAssignedJourneyClientStops.ts

I implemented this file to export a custom React hook `useAssignedJourneyClientStops` that fetches and returns the client stops associated with an assigned journey, based on the provided assigned journey ID.

#### ./hooks/useAssignedJourneyHistory.ts

I created this file to export a custom React hook `useAssignedJourneyHistory` that returns the history of an assigned journey, including the milestones and stops the user has completed. It groups the client stops by milestone changes and sorts them in reverse chronological order.

#### ./hooks/useAssignedJourneyWithInfo.ts

I wrote this file to export a custom React hook `useAssignedJourneyWithInfo` that fetches and returns an assigned journey along with additional information, such as the active milestone index, progress, active stop, and any associated questionnaire review information.