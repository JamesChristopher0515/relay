## hooks

This directory contains various custom React hooks that encapsulate common functionality related to fetching, updating, creating, and deleting resources from the application's API.

### Files

#### ./hooks/useSingleResource.ts

The `useSingleResource` hook is a utility function that abstracts the logic for fetching, updating, creating, and deleting a single resource from the API. It takes a resource type (from the `ApiTags` type) and an optional ID, and returns the fetched data along with functions to update, create, and delete the resource.

The hook uses other API-related hooks (`useGetXQuery`, `useUpdateXMutation`, `useCreateXMutation`, `useDeleteXMutation`) to interact with the API. It also uses the `parseDates` utility function to parse any date-like fields in the fetched data.

This hook is useful for reducing boilerplate when working with individual resources in the application, as it encapsulates the common CRUD operations in a reusable way.