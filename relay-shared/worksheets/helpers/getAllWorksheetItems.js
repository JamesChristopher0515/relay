export default function getAllWorksheetItems(worksheet) {
    return worksheet.sections.flatMap(section => section.items.map((item, index) => ({
        ...item,
        sectionIndex: index,
    })));
}
//# sourceMappingURL=getAllWorksheetItems.js.map