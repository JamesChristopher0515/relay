## assigned-resource

This directory contains the code for the "Assigned Resource" feature in the application. It includes components and hooks that handle the display and interaction with assigned resources, such as content files, web pages, and thinking points.

### Files

#### ./components/ResourceBeforeAfter.tsx

This component is responsible for rendering the "before" and "after" content of an assigned resource. It uses the `useGetAssignedResourceQuery` hook from the `relay-shared/frontend/api/hooks/useApi` module to fetch the necessary data for the assigned resource.

#### ./hooks/useAssignedResourceOpener.ts

This hook, `useAssignedResourceOpener`, is responsible for handling the opening and viewing of assigned resources. It supports different types of resources, such as content files, web pages, and thinking points. The hook ensures that the user has viewed the resource for a minimum amount of time before triggering a "viewed" event, which is sent to the backend using the `viewAssignedResource` mutation from the `relay-shared/frontend/api/hooks/useApi` module.

The hook also utilizes other hooks and libraries, such as `useMediaPlayer` from the `content/hooks/useMediaPlayer` module, `useAppDispatch` from the `core/hooks/coreHooks` module, and `WebBrowser` from the `expo-web-browser` library, to handle the different types of resources.

For thinking points resources, the hook opens a modal using the `openModal` function from the `@mtyk/frontend/decorations/contexts/DecorationsContext` module, passing the necessary data from the `useGetStopForClientMilestoneStopQuery` hook.