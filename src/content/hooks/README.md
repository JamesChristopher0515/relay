## hooks

This directory contains custom React hooks that encapsulate shared logic and state related to the media player functionality in our application.

### Files

#### ./hooks/useMediaPlayer.ts

The `useMediaPlayer` hook provides a convenient way to access the `MediaPlayerContext` and its associated state and methods. It allows components to subscribe to changes in the media player's playback status by passing a callback function to the `statusListener` parameter. This hook ensures that the necessary context is available and handles the setup and teardown of the status listener, simplifying the implementation of media player-related features across the application.

The hook returns the `MediaPlayerContext` object, which contains the following key properties and methods:

- `isPlaying`: A boolean indicating whether the media player is currently playing.
- `playbackStatus`: The current [AVPlaybackStatus](https://docs.expo.dev/versions/latest/sdk/av/#avplaybackstatus) of the media player.
- `play()`: A function to start playing the media.
- `pause()`: A function to pause the media player.
- `addStatusListener(callback)`: A function to add a callback that will be invoked whenever the media player's playback status changes.
- `removeStatusListener(callback)`: A function to remove a previously added status listener callback.

By using this hook, components can easily integrate with the media player functionality without having to manage the context directly, promoting code reuse and maintainability.