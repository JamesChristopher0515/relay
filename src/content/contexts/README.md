## contexts

This directory contains the context providers and related utilities for managing the state and behavior of the media player component in the application.

### Files

#### ./contexts/MediaPlayerContext.tsx

The `MediaPlayerContext` is a React context that provides a centralized way to manage the state and behavior of the media player component. It exposes a set of functions and properties that allow other parts of the application to interact with the media player, such as loading a resource, toggling playback, setting the playback position, and listening for playback status updates.

I define the `MediaPlayerContextType` interface, which specifies the shape of the context value. This interface includes properties like `isPlaying`, `isFinished`, `position`, and `latestStatus`, as well as functions like `loadResource`, `togglePlay`, `setPosition`, and `addStatusListener`.

I create the context using `React.createContext()` and export it as the default export of the module. This allows other parts of the application to consume the context and access the media player's state and functionality.