## clients

This directory contains the client-specific components, hooks, and helpers for the application. It includes the core functionality for managing and displaying client check-ins, as well as utilities for handling client-related data.

### Files

#### ./clients/components/CheckInCard.tsx

I created this component to render a single check-in card, which displays the logged emotion and the reason behind it. It uses the `CheckInFeeling` and `CheckInReason` components to render the relevant information. The component supports different appearances (card or flat) and can open a fullscreen view of the check-in.

#### ./clients/components/CheckInFeeling.tsx

I developed this component to render the feeling associated with a check-in. It displays the feeling icon and the feeling name, with the feeling name displayed in the color associated with that feeling.

#### ./clients/components/CheckInReason.tsx

I implemented this component to render the reason associated with a check-in. It displays the reason name, with the name displayed in a specific color.

#### ./clients/helpers/getCheckInTimes.ts

I wrote this helper function to calculate the check-in times for a given client, based on the client's check-in options. It returns an array of times at which the client should be notified to check in.

#### ./clients/hooks/useClientShared.ts

I created this hook to provide access to the shared client-related functionality, including the ability to fetch the current client. It uses the `RContext` context to access the platform-specific hooks.