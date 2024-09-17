## buttons

This directory contains React components related to buttons and button-like UI elements. I use these components throughout the application to provide consistent and reusable button functionality.

### Files

#### ./buttons/ButtonRow.tsx

The `ButtonRow` component is a container component that renders a row of buttons or button-like elements. It uses the `Flex` component from the `@mtyk/frontend/core/components` library to layout the buttons horizontally. The `ButtonRow` component accepts any additional props that are passed down to the `Flex` component, allowing for customization of the layout and styling.

#### ./buttons/HeaderButton.tsx

The `HeaderButton` component is a button-like element that I typically use in the header or navigation bar of the application. It wraps a `TouchableOpacity` component from React Native, which provides the necessary touch event handling. The `HeaderButton` component accepts an `action` prop, which is a function that is called when the button is pressed. It also accepts `style` and `children` props to customize the appearance and content of the button.