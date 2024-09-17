## modal

This directory contains the components and utilities related to the modal functionality in the application. The modal is a key UI element that is used to display important information or actions to the user in a focused and attention-grabbing manner.

### Files

#### ./modal/ModalClose.tsx

The `ModalClose` component renders the close button that appears at the top-right of the modal. It uses the `ScalingPressable` component to create a pressable area that scales up slightly on press, providing a subtle visual feedback to the user. The close button is positioned absolutely at the top-left of the modal using styles. When the close button is pressed, it calls the `close()` function from the `DecorationsContext`, which closes the currently open modal.

The component uses the `faTimes` icon from the `@fortawesome/free-solid-svg-icons` library to render the close icon, and applies some styles to control the size and color of the icon.