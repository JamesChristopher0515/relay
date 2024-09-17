## users

This directory contains the code related to user management and authentication in the application. It includes helper functions, hooks, and types related to user roles, permissions, and password reset functionality.

### Files

#### ./users/helpers/isCreator.ts

The `isCreator` function is a helper that checks if a given user is the creator of a specific document. It takes a `user` object and an optional `document` object (which must have a `creator` property) and returns a boolean indicating whether the user is the creator of the document.

#### ./users/helpers/permissions.ts

This file defines the permissions system for the application. It includes a `PermissionsMap` type, which represents the permissions granted to each role, and a `Permission` type, which lists the available permissions. The `permissions` object maps each permission to its associated `PermissionsMap`. The `roleHasPermission` function checks whether a given role has a specific permission.

#### ./users/helpers/roles.ts

This file defines the user roles in the application, including `client`, `practitioner`, `practitionerAdmin`, and `superAdmin`. It also defines the `Right` type, which represents the various permissions associated with each role. The `roleGte` function compares two roles and returns a boolean indicating whether the first role is greater than or equal to the second role. The `getLowerRole` function returns the role that is one level lower than the given role.

#### ./users/hooks/useSendPasswordReset.ts

The `useSendPasswordReset` hook provides a function to send a password reset email to a user. It uses the `useWrappedAxiosShared` hook to make a POST request to the `/users/forgot-password` endpoint with the user's email or username.