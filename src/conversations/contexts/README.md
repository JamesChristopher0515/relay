## contexts

This directory contains various React context providers that are used throughout the application to manage global state and provide data to components.

### Files

#### ./contexts/ConversationViewContext.tsx

The `ConversationViewContext` is a React context that provides information about the current conversation view, specifically the `height` of the view. This context is used by components that need to know the height of the conversation view, such as the chat message list or the input field.

The context is created using the `createContext` function from React, and it exports a context object that can be used by other components to access the conversation view data. The context value is an object with a `height` property, which is an optional number.

This context is used in conjunction with the `ConversationViewContext.Provider` component, which is responsible for setting the value of the context and making it available to its child components.