## chat

This directory contains the components and logic for the chat functionality in the application. It includes the main ChatView component, the AvailabilityOverlay component, and the PractitionerInfo component, as well as the top-level ChatPage component that orchestrates the chat experience.

### Files

#### ./chat/AvailabilityOverlay.tsx

The AvailabilityOverlay component is responsible for displaying the availability schedule of the practitioner. It shows the days of the week and the start and end times for each day that the practitioner is available for chat. This component is displayed when the user taps the "View Schedule" button in the chat header.

#### ./chat/ChatView.tsx

The ChatView component is the main component that renders the chat interface. It displays the chat messages, allows the user to input and send new messages, and handles loading more messages when the user scrolls to the top of the chat. It also includes a gradient overlay at the top of the chat to create a smooth transition between the chat content and the header.

#### ./chat/PractitionerInfo.tsx

The PractitionerInfo component displays the name of the practitioner the user is chatting with and provides a button to view the practitioner's availability.

#### ./chat/index.tsx

The index.tsx file is the entry point for the chat functionality. It contains the ChatPage component, which is responsible for managing the state and rendering the appropriate components based on the user's availability and the practitioner's schedule. It also handles the logic for showing the AvailabilityOverlay when the user taps the "View Schedule" button.
