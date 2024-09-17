"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllWorksheetItems(worksheet) {
    return worksheet.sections.flatMap(section => section.items.map((item, index) => ({
        ...item,
        sectionIndex: index,
    })));
}
exports.default = getAllWorksheetItems;
//# sourceMappingURL=getAllWorksheetItems.js.map