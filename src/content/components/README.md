## components

This directory contains the main components used throughout the application. These components handle the rendering and functionality of various UI elements, including content lists, media players, and page layouts.

### Files

#### ./ContentListItem.tsx

The `ContentListItem` component is responsible for rendering a single item in the content list. It displays information about the assigned resource, such as the file type, name, and the date it was shared. The component also handles the opening of the resource, either by opening a web link or downloading a file.

The component uses various helper functions and hooks to determine the appropriate file type icon and format the date. It also integrates with the `useAssignedResourceOpener` hook to handle the opening of the resource.

#### ./ContentPage.tsx

The `ContentPage` component is the main page that displays the content list. It uses the `useGetAssignedResourcesQuery` hook to fetch the assigned resources, which are then sorted and grouped based on the selected tab (recent or alphabetical). The component renders a `SectionList` to display the content items, with each section representing a month or letter.

The component also handles the case where there are no assigned resources, displaying a message to the user.

#### ./MediaPlayerContextProvider.tsx

The `MediaPlayerContextProvider` component is responsible for managing the state and functionality of the media player. It uses the `expo-av` library to load and play audio resources. The provider exposes a set of functions and values through the `MediaPlayerContext` that can be used by other components to control the media player.

The provider handles tasks such as loading a new resource, toggling play/pause, setting the playback position, and managing the playback status listeners.

#### ./MediaPlayerControls.tsx

The `MediaPlayerControls` component renders the UI for the media player controls, including the progress bar, knob, and time display. It uses the `useMediaPlayer` hook to access the media player context and update the controls based on the current playback status.

The component uses the `react-native-gesture-handler` library to handle the drag gesture on the progress bar, allowing the user to scrub through the audio.

#### ./PlayingResourceControls.tsx

The `PlayingResourceControls` component is responsible for rendering the controls for the currently playing resource. It displays the resource name, the current playback time, and controls for play/pause and closing the player.

The component uses the `useMediaPlayer` hook to access the media player context and update the time display based on the current playback status. It also handles the expansion and collapse of the controls, using `Animated` components to animate the height and background.