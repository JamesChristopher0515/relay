## login

This directory contains the code for the login functionality of the application. It includes components for the login page, password reset, and account setup.

### Files

#### ./login/LoginField.tsx

This component is a reusable login field that includes a label, input field, and a circular button. It handles the state and validation of the input field using the `react-final-form` library. The component also includes optional features like an error message display and a custom icon.

#### ./login/LoginSetupAccount.tsx

This component is responsible for the account setup process. It allows the user to create a new password and confirm it. The component uses the `zod` library for form validation and the `useLogin` hook for logging in the user after the setup is complete.

#### ./login/RelayLogo.tsx

This component simply renders the Relay logo image.

#### ./login/index.tsx

This is the main entry point for the login functionality. It contains the `LoginPage` component, which renders the login form, password reset functionality, and the `LoginSetupAccount` component when the user has a verification token.

The login form uses the `useLogin` hook to handle the login process, and the `useSendPasswordReset` hook to send a password reset email. The component also displays error messages and handles the different steps of the login process (email, password).
