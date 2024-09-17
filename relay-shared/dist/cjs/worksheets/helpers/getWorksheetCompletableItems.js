"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllWorksheetItems_1 = __importDefault(require("./getAllWorksheetItems"));
// TODO change name here, actually just gets subworksheets, not all response types
function getWorksheetCompletableItems(worksheet) {
    const items = (0, getAllWorksheetItems_1.default)(worksheet);
    const subworksheets = items.filter(item => item.type === 'worksheet');
    return subworksheets.map((subworksheet, index) => {
        const letter = 'abcdefghijklmnopqrstuvwxyz'[index % 26].toUpperCase();
        return {
            ...subworksheet,
            nameWithLetter: `${letter}. ${subworksheet.name}`,
            letter,
        };
    });
}
exports.default = getWorksheetCompletableItems;
//# sourceMappingURL=getWorksheetCompletableItems.js.map