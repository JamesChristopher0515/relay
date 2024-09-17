## client-invite

The `client-invite` directory contains the components and state machine for the client invitation flow in the Relay application. This flow is responsible for handling the process of a client accepting an invitation, setting up their account, and logging in.

### Files

#### ./client-invite/components/Backable.tsx

The `Backable` component provides a consistent way to render a "Back" button and its associated functionality. It is used throughout the client invitation flow to allow the user to navigate back to previous steps.

#### ./client-invite/components/ClientLogin.tsx

The `ClientLogin` component is the main entry point for the client invitation flow. It manages the state of the flow and renders the appropriate sub-component based on the current state of the `ClientInviteMachine`.

#### ./client-invite/components/InviteSent.tsx

The `InviteSent` component is rendered when the client has been sent a new invitation email. It provides instructions for the client to check their email and continue the setup process.

#### ./client-invite/components/OnAppReady.tsx

The `OnAppReady` component is rendered when the application is first launched. It checks for any existing valid tokens and, if found, logs the user in automatically.

#### ./client-invite/components/OnContinueWithUser.tsx

The `OnContinueWithUser` component is rendered when the client is continuing the setup process with an existing user account. It prompts the user to set a new password.
