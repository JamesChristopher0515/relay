"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllWorksheetItems_1 = __importDefault(require("./getAllWorksheetItems"));
function getNextWorksheetItem(worksheet, currentItem) {
    const items = (0, getAllWorksheetItems_1.default)(worksheet);
    const index = items.findIndex(i => i._id === currentItem._id);
    return items[index + 1];
}
exports.default = getNextWorksheetItem;
//# sourceMappingURL=getNextWorksheetItem.js.map