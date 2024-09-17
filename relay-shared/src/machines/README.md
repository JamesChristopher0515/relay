## machines

This directory contains the core functionality for managing state machines in the application. It includes helper functions, adapters, and custom hooks that provide a consistent and powerful interface for working with state machines.

### Files

#### ./machines/helpers/machineReducer.ts

This file exports a `machineReducer` function that acts as a wrapper around a state machine transition function. It takes a transition function as input and returns a new function that automatically passes the current state's context to the transition function. This simplifies the implementation of state machine transitions by abstracting away the boilerplate of managing the current state's context.

The `machineReducer` function is particularly useful when working with state machines that have complex context objects, as it ensures that the transition function always has access to the relevant context data.

#### ./machines/helpers/mongoAdapter.ts

This file exports an `attachMongoAdapter` function that is used to integrate a state machine with a MongoDB-based data store. The adapter attaches middleware to the provided `entityManager` instance that intercepts various entity management operations (e.g., `findEntities`, `getEntity`, `createEntity`, `transitionEntity`) and applies custom filtering logic.

The filtering logic is defined by the `filter` function passed to the `attachMongoAdapter` function. This allows for customization of how state machine entities are queried and updated in the MongoDB database.

#### ./machines/hooks/useMachine.ts

This file exports two custom React hooks: `useObservable` and `useMachine`.

The `useObservable` hook is a utility that subscribes to an observable and keeps the component's state in sync with the observable's value. It is used internally by the `useMachine` hook.

The `useMachine` hook is the primary interface for working with state machines in the application. It takes a state machine instance as input and returns an object that provides access to the current state, context, and transition function, as well as information about whether the machine is currently transitioning between states. The hook also handles error handling, ensuring that the state is reverted to the last known good state if an error occurs during a transition.

The `useMachine` hook provides a seamless and intuitive way for components to interact with state machines, abstracting away the low-level details of state management and transition handling.