## resources

The `resources` directory contains the components, controllers, and hooks related to the resources feature of the application. This feature allows users to access and interact with various types of resources, such as documents, videos, and audio files.

### Files

#### `./components/NHSIcon.tsx`

This file exports a shared SVG component that represents the NHS (National Health Service) icon. It is used throughout the application to display this specific icon.

#### `./components/ReadIcon.tsx`

This file exports a shared SVG component that represents the "read" icon. It is used to indicate that a resource is a document or some other type of file that can be read.

#### `./components/ResourceItemRow.tsx`

This component represents a single row in the resources list. It displays the resource's icon, name, and provides actions such as marking the resource as a favorite.

#### `./components/ResourcesContentList.tsx`

This component is responsible for rendering the list of resources, including the section headers and the individual resource items. It handles the display of different content based on the user's current view (e.g., all resources, favorites, search results).

#### `./components/ResourcesNoContent.tsx`

This component is used to display a message when there are no resources available, such as when the user has not yet been assigned any resources or when the search query returns no results.

#### `./components/ResourcesPage.tsx`

This is the main entry point for the resources feature. It renders the overall page layout, including the search functionality and the content list.

#### `./components/ResourcesRecent.tsx`

This component displays the user's recently viewed resources, showing the two most recent items.

#### `./controllers/ResourcesController.tsx`

This is the main controller for the resources feature. It manages the state and logic related to searching, filtering, and displaying the resources.

#### `./helpers/groupContentAZ.ts`

This helper function is used to group the resources by their first character, creating a section-based list for the resources content.

#### `./hooks/useAssignedContent.ts`

This hook fetches and provides the list of resources that have been assigned to the user.

#### `./hooks/useClientContent.ts`

This hook fetches and provides the information about a specific resource's client content, such as whether it has been marked as a favorite.

#### `./hooks/useDebouncedEffect.tsx`

This custom hook provides a debounced effect, which is useful for throttling search functionality.

#### `./hooks/useFavouritedContent.ts`

This hook fetches and provides the list of resources that the user has marked as favorites.

#### `./hooks/useRecentContent.ts`

This hook fetches and provides the list of resources that the user has recently viewed.