## context

This directory contains the context and provider components for managing the application's Relay state. The primary purpose of this directory is to provide a centralized location for managing the global state of the application, specifically the currently logged-in user and the associated practitioner (if applicable).

### Files

#### ./RelayContext.tsx

This file defines the `RelayContext` React context, which is used to store and provide access to the currently logged-in user and the associated practitioner (if applicable) throughout the application. The context is initialized with an empty object, and the actual values are provided by the `RelayProvider` component.

The context exposes two properties:
- `user`: a `Client` object representing the currently logged-in user
- `practitioner`: an optional `Practitioner` object representing the practitioner associated with the currently logged-in user

I use this context throughout the application to access the current user and practitioner data, without the need to pass these values down through multiple levels of the component tree.