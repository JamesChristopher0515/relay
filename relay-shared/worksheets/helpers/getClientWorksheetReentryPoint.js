import getAllWorksheetItems from './getAllWorksheetItems';
export default function getClientWorksheetReentryPoint(worksheet, clientWorksheet) {
    const items = getAllWorksheetItems(worksheet);
    const firstIncomplete = items.findIndex(item => !clientWorksheet.responses[item._id].complete);
    return Math.max(firstIncomplete - 1, 0);
}
//# sourceMappingURL=getClientWorksheetReentryPoint.js.map