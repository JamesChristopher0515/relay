## forms

This directory contains components related to form handling and user input in the application. It includes a variety of custom form elements, such as a labeled text input field, a slider, a time picker, and a vertical slider.

### Files

#### ./forms/LabelledField.tsx

This file defines a `LabelledField` component, which is a custom text input field with a label. It provides a consistent styling and behavior for text inputs across the application, including features like auto-capitalization, secure text entry for password fields, and unified styling.

#### ./forms/Slider.tsx

This file defines a `Slider` component, which is a horizontal slider control with a knob that can be dragged to select a value. It supports optional labels, default values, and callbacks for when the slider is dragged. The slider uses Animated API and gesture handling to provide a smooth and responsive user experience.

#### ./forms/TimePicker.tsx

This file defines a `TimePicker` component, which is a UI element that allows the user to select a time value. It uses the `react-native-simple-time-picker` library to provide the time picker functionality, and it is integrated with the application's modal system to display the time picker in a modal overlay.

#### ./forms/VerticalSlider.tsx

This file defines a `VerticalSlider` component, which is a vertical slider control with a knob that can be dragged to select a value. It shares a lot of the same functionality and implementation as the `Slider` component, but it is oriented vertically instead of horizontally.

These form-related components are used throughout the application to provide a consistent and user-friendly way for users to input data and make selections.