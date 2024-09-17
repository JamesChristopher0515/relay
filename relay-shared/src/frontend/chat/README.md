## chat

The `chat` directory contains the core components and functionality for the chat feature in the application. It includes the main `ChatController` component, the `ChatMessage` component for rendering individual chat messages, and the `ChatUnreadIndicator` component for displaying the number of unread chat messages.

### Files

#### ./chat/components/ChatController.tsx

The `ChatController` component is the main entry point for the chat functionality. It manages the state and data fetching for the chat messages, including pagination and real-time updates. It also handles the creation of new messages and marking the chat as read. The component takes in various props, such as the client, practitioner, and user, and renders a custom `Component` with the necessary data and callbacks.

#### ./chat/components/ChatMessage.tsx

The `ChatMessage` component is responsible for rendering a single chat message. It takes in the message data, the user information, and optional styles, and renders the message with appropriate formatting and styling based on whether the message is sent by the current user or not. It also handles the display of the message timestamp and message grouping.

#### ./chat/components/ChatUnreadIndicator.tsx

The `ChatUnreadIndicator` component is used to display the number of unread chat messages. It fetches the latest chat notification from the server and extracts the unread message count, which is then displayed using the `IndicatorBadge` component. The component can be configured to only show the indicator for a specific user.