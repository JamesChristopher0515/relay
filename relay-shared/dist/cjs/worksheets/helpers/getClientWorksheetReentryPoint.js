"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllWorksheetItems_1 = __importDefault(require("./getAllWorksheetItems"));
function getClientWorksheetReentryPoint(worksheet, clientWorksheet) {
    const items = (0, getAllWorksheetItems_1.default)(worksheet);
    const firstIncomplete = items.findIndex(item => !clientWorksheet.responses[item._id].complete);
    return Math.max(firstIncomplete - 1, 0);
}
exports.default = getClientWorksheetReentryPoint;
//# sourceMappingURL=getClientWorksheetReentryPoint.js.map