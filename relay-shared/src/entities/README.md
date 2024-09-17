## entities

The `entities` directory contains the core components and utilities for working with various types of entities in the application. These entities represent the fundamental data objects that the application deals with, such as clients, journeys, questionnaires, and more.

### Files

#### `./entities/components/EntityLink.tsx`

The `EntityLink` component is responsible for rendering a link or text representation of an entity, based on the entity type and ID. It uses the `useEntityInfo` hook to retrieve the necessary information about the entity, such as its name, URL, and display properties. This component is used throughout the application to consistently display links to various entities.

#### `./entities/helpers/useEntityInfo.ts`

The `useEntityInfo` hook is the central utility for working with entity data in the application. It provides a unified interface for retrieving information about different entity types, such as their name, URL, icon, and associated data. The hook uses a set of Relay query hooks to fetch the necessary data for each entity type.

The `useEntityInfo` hook maintains a consistent set of entity metadata, ensuring that the application can work with various entity types in a standardized way. This helps to keep the codebase organized and maintainable, as changes to entity data can be easily propagated throughout the application.

#### `./entities/hooks/useEntityLink.ts`

The `useEntityLink` hook is a convenience wrapper around the `useEntityInfo` hook, specifically for generating the URL and display text for an entity link. This hook is used in various parts of the application to consistently render links to different entity types.