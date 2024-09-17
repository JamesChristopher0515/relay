## helpers

This directory contains various utility functions and hooks that are used throughout the codebase. These helpers provide common functionality that can be reused across different components and modules, promoting code reuse and maintainability.

### Files

#### ./useEventToState.ts

The `useEventToState` hook is a custom React hook that provides a convenient way to subscribe to events and update the component's state accordingly. It takes an event name, an event-emitting object, a listener function, and a default state value as input.

The hook uses the `useState` and `useEffect` hooks to manage the state and set up the event listener, respectively. When the specified event is triggered, the listener function is called, and the component's state is updated with the returned value.

This hook is particularly useful when integrating with event-based systems, such as custom event emitters or third-party libraries, and automatically updating the component's state in response to those events.