## worksheets

The `worksheets` directory contains the code for the worksheet viewer component and related utility functions. It provides the functionality to render and interact with worksheets, which are a type of content item in the application.

### Files

#### ./worksheets/components/ColumnsWrap.tsx

The `ColumnsWrap` and `RenderWorksheetItem` components are defined in this file. They are responsible for rendering the columns and cells of a worksheet. The `ColumnsWrap` component is a simple wrapper around a `Flex` component. The `RenderWorksheetItem` component handles the rendering of a single worksheet item, including the header columns and data rows.

The `RenderWorksheetItem` component uses the `getTableInfo` utility function to extract the necessary information from the worksheet item and client worksheet data. It then renders the cells using the `renderColumnCell` function.

#### ./worksheets/components/WorksheetViewerItemRenderer.tsx

The `WorksheetViewerItemRenderer` component is contained in this file. It is responsible for rendering a single worksheet item. It uses the `RenderWorksheetItem` component from `ColumnsWrap.tsx` to render worksheet items of type `'worksheet'`. For worksheet items of type `'message'`, it displays the message.

#### ./worksheets/components/WorksheetViewerShared.tsx

The `WorksheetViewerShared` component is defined in this file. It is a higher-order component that wraps the `WorksheetViewerInner` component. The `WorksheetViewerShared` component fetches the worksheet data using the `useGetWorksheetQuery` hook and passes the worksheet and client worksheet data to the `WorksheetViewerInner` component.

The `WorksheetViewerInner` component renders all the worksheet items using the `WorksheetViewerItemRenderer` component.

#### ./worksheets/helpers/getAllWorksheetItems.ts

The `getAllWorksheetItems` function is exported from this file. It takes a `Worksheet` object and returns an array of all the worksheet items in the worksheet, including those nested in sections.

#### ./worksheets/helpers/getClientWorksheetReentryPoint.ts

The `getClientWorksheetReentryPoint` function is exported from this file. It takes a `Worksheet` object and a `ClientWorksheet` object and returns the index of the first incomplete worksheet item. This function is used to determine the starting point for the worksheet viewer.

#### ./worksheets/helpers/getNextWorksheetItem.ts

The `getNextWorksheetItem` function is exported from this file. It takes a `Worksheet` object and a `WorksheetItem` object and returns the next worksheet item in the worksheet.

#### ./worksheets/helpers/getTableInfo.ts

The `getTableInfo` function is exported from this file. It takes a `WorksheetItem` object and a `ClientWorksheet` object and returns an object containing information about the table structure and data for the worksheet item.

#### ./worksheets/helpers/getWorksheetCompletableItems.ts

The `getWorksheetCompletableItems` function is exported from this file. It takes a `Worksheet` object and returns an array of all the worksheet items in the worksheet that are of type `'worksheet'`. This function is used to determine which worksheet items can be completed by the user.

#### ./worksheets/helpers/getWorksheetName.ts

The `getWorksheetName` function is exported from this file. It takes a `Worksheet` object and returns the name of the worksheet.

#### ./worksheets/hooks/useClientWorksheet.ts

The `useClientWorksheet` hook is exported from this file. It takes a `clientWorksheetId` and returns the corresponding `Worksheet` and `ClientWorksheet` objects, as well as a boolean indicating whether the data is ready.
