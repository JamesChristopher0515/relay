## appointments

The `appointments` directory contains the components, hooks, and machines related to the appointment functionality in the application. This includes the video call functionality, appointment calendar, and appointment information retrieval.

### Files

#### `./appointments/components/VideoAppointmentController.tsx`

This component is responsible for managing the video call functionality for an appointment. It uses the `VideoCallMachine` to fetch the necessary token and room information to connect to the video call. It then renders the appropriate component (`Component`) with the necessary props (`roomName`, `token`, `appointmentId`).

#### `./appointments/components/VideoCallTimer.tsx`

This component displays the remaining time for a video call appointment. It uses the `useAppointmentInfo` hook to retrieve the appointment information and calculate the remaining time.

#### `./appointments/components/client/ClientVideoCall.tsx`

This component is responsible for rendering the video call interface for the client. It uses the `react-native-twilio-video-webrtc` library to connect to the video call and handle user interactions (end call, mute/unmute, flip camera).

#### `./appointments/components/helpers/makePractitionerTwilioObservable.tsx`

This helper function creates an observable that manages the state of the Twilio video call, including the connected participants and their active tracks. It is used to provide a consistent way of handling the video call state in the practitioner-side components.