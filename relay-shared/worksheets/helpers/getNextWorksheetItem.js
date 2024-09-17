import getAllWorksheetItems from './getAllWorksheetItems';
export default function getNextWorksheetItem(worksheet, currentItem) {
    const items = getAllWorksheetItems(worksheet);
    const index = items.findIndex(i => i._id === currentItem._id);
    return items[index + 1];
}
//# sourceMappingURL=getNextWorksheetItem.js.map