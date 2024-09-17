## appointments

This directory contains the code for the appointments feature of the application. It includes components, helpers, and other related files that handle the functionality and user interface for managing appointments.

### Files

#### ./appointments/components/AppointmentPage.tsx

This file defines the `AppointmentPage` component, which is responsible for rendering the main appointment page. It uses the `VideoCallMachine` state machine to manage the video call functionality, and it renders the `ClientVideoCall` component when the video call is ready. The component also fetches the relevant todo item from the API using the `useGetTodoQuery` hook.

#### ./appointments/components/ClientVideoCall.tsx

The `ClientVideoCall` component is responsible for rendering the video call interface for the client. It uses the `react-native-twilio-video-webrtc` library to connect to the video call and manage the various video and audio controls. The component also includes a `VideoCallTimer` component to display the duration of the call.

#### ./appointments/helpers/loginInBrowser.ts

This helper function is used to open the application in a web browser and handle the login process. It constructs a URL with the user's tokens and user data, and then opens the URL in the web browser using the `expo-web-browser` library.