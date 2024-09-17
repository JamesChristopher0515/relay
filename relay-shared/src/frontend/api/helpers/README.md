## helpers

This directory contains various helper functions and utilities that are used throughout the application. These helpers provide a consistent and reusable way of interacting with the API, handling authentication, and managing data.

### Files

#### ./helpers/apiBaseQuery.ts

I define the `makeApiBaseQuery` function, which is a base query function for the Redux Toolkit Query (RTK Query) library. It handles making API requests, refreshing access tokens, and handling authentication-related errors. It also includes some logging functionality for debugging purposes.

The `makeApiBaseQuery` function returns an `axiosBaseQuery` function that can be used as the base query for RTK Query endpoints. This ensures that all API requests go through a consistent set of logic, such as token refreshing and error handling.

#### ./helpers/apiCrud.ts

This file contains a set of functions that I created to generate CRUD (Create, Read, Update, Delete) endpoints for the RTK Query library. These functions abstract away the boilerplate code required to define these endpoints, and also handle things like invalidating cache tags and locally updating the store when changes are made.

The `generateCRUD` function is the main export, which takes in the RTK Query builder, the resource type, and some optional configuration options. It then returns an object with the various CRUD-related endpoints, such as `createResource`, `updateResource`, `getResource`, `getResources`, and `deleteResource`.

#### ./helpers/apiTypes.ts

In this file, I define some basic types used throughout the API-related code, such as `Id` (a string type for IDs) and `PaginatedQueryOpts` (options for paginated API queries).

#### ./helpers/apiUrls.ts

This file contains utility functions that I wrote for working with API URLs. The `resourceToUrl` function maps resource names to their corresponding URL paths, and the `plural` function handles pluralizing resource names for URL paths.

#### ./helpers/tagHelpers.ts

In this file, I provide functions for generating cache invalidation tags for RTK Query. These tags are used to ensure that the store is properly invalidated when data changes, so that the UI can be efficiently updated.

The `tagsForMany` function generates tags for a list of resources, while the `tagsForSingle` function generates tags for a single resource.

#### ./helpers/tagTypes.ts

This file defines the set of valid API tags used throughout the application. I use these tags to manage the cache invalidation process in RTK Query.