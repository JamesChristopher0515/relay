## controllers

This directory contains the controller components for the application. Controllers are responsible for managing the state and behavior of specific areas of the user interface, encapsulating the logic and interactions that occur within those areas.

### Files

#### `./controllers/ContentController.tsx`

The `ContentController` manages the state and behavior of a content item within the application. It uses the `useGetContentQuery` and `useUpdateClientContentMutation` hooks from the `relay-shared/frontend/api/hooks/useApi` module to fetch and update the content data.

The controller also utilizes the `useAssignedResourceOpener` hook from the `assigned-resource/hooks/useAssignedResourceOpener` module to handle the opening of the content resource. When the `open` function is called, it will open the content resource and update the `lastViewed` field of the client content.

The controller exports a factory function `makeController` that creates the `ContentController` component, which can be used throughout the application to manage the state and behavior of content items.