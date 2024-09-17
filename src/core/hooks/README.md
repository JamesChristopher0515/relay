## hooks

This directory contains custom React hooks that are used throughout the application. These hooks provide a way to encapsulate and reuse common functionality, making the codebase more modular and maintainable.

### Files

#### ./hooks/coreHooks.ts

This file exports two custom hooks: `useAppDispatch` and `useAppSelector`. These hooks are wrappers around the standard `useDispatch` and `useSelector` hooks from the `react-redux` library, and they provide type safety by using the `RootState` and `AppDispatch` types from the application's Redux store.

#### ./hooks/useCardStepper.ts

This hook provides functionality for creating a card-like stepper UI component. It manages the state of the current step index, provides methods for incrementing and decrementing the step, and exposes an animated value that can be used to drive the visual appearance of the stepper. The hook also supports different types of step configurations, including evenly spaced steps and custom step fractions.

#### ./hooks/usePractitioner.ts

This hook provides access to the current practitioner data from the application's context. It returns the practitioner object and a boolean indicating whether the data is currently being loaded.

#### ./hooks/usePushNotifications.ts

This hook is responsible for registering the device with the Expo push notification service and updating the user's push notification token in the application's state. It uses the `expo-notifications` library to handle the registration process.

#### ./hooks/useSimpleAnimation.ts

This hook provides a simple way to create animated styles based on a shared animated value. It takes a function that generates the styles based on the current value of the animated value, as well as optional parameters to control the initial and final values of the animation.

#### ./hooks/useTransitionContext.ts

This file exports a React context and a custom hook for accessing that context. The context is used to share transition-related values, such as the `deltaIn` and `deltaOut` values, across components in the application.

#### ./hooks/useUser.ts

This hook provides access to the current user data from the application's context. It also exposes methods for updating the user's data and refetching the user data from the server.

#### ./hooks/useWrappedAxios.tsx

This hook provides a wrapper around the `axios` library, adding authentication headers and other common configuration to all requests. It is deprecated in favor of the `useWrappedAxiosShared` hook, which is shared between the frontend and backend codebases.