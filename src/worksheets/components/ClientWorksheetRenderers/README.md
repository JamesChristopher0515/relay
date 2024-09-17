## ClientWorksheetRenderers

This directory contains the React components responsible for rendering different types of worksheet items in the client-side application. These components handle the display and interaction of various worksheet elements, such as messages, response buttons, images, and tables.

### Files

#### ./ClientWorksheetButtons.tsx

This component renders a set of response buttons for a worksheet item. It handles the display of the buttons, as well as the logic for responding to the user's button selections. The component ensures that the selected button is highlighted and that the user's response is properly recorded.

#### ./ClientWorksheetFullscreen.tsx

This component provides a fullscreen layout for worksheet items, allowing for a more immersive experience. It manages the rendering of the top and bottom sections of the fullscreen view, adjusting the layout based on the presence of a "collapse" prop.

#### ./ClientWorksheetImage.tsx

This component handles the rendering of image-based worksheet items. It displays the image in a contained view and provides a modal for zooming and viewing the image in full screen.

#### ./ClientWorksheetItemRenderer.tsx

This is the main entry point for rendering worksheet items. It acts as a dispatcher, selecting the appropriate component based on the type of the worksheet item (e.g., message, worksheet, response-buttons, response-text, image).

#### ./ClientWorksheetItemRendererProps.tsx

This file defines the common props interface used by the various worksheet item renderer components.

#### ./ClientWorksheetMessage.tsx

This component renders a message-type worksheet item, displaying the message content in a chat-style format.

#### ./ClientWorksheetTable/ClientWorksheetTableRenderer.tsx

This component is responsible for rendering the worksheet table item. It manages the overall layout and interaction of the table, including scrolling, editing, and navigation.

#### ./ClientWorksheetTable/ColumnCell.tsx

This component represents an individual cell within the worksheet table, handling the display of the cell content based on whether it is a header or a regular cell.

#### ./ClientWorksheetTable/ColumnsWrap.tsx

This component is a wrapper around the column cells, ensuring proper styling and layout of the table columns.

#### ./ClientWorksheetTable/CompleteTableItem.tsx

This is the main implementation of the worksheet table item renderer. It handles the overall layout, scrolling, and editing functionality of the table.

#### ./ClientWorksheetTable/columnWidth.tsx

This file exports a constant value for the width of each column in the worksheet table.

#### ./ClientWorksheetText.tsx

This component renders a text-based response item, allowing the user to input and submit their response.