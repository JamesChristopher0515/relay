"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
const ColumnsWrap_1 = require("./ColumnsWrap");
function WorksheetViewerItemRenderer({ worksheet, clientWorksheet, item, }) {
    const { type } = item;
    switch (type) {
        case 'message':
            return react_1.default.createElement(components_1.Txt, null, item.data.message);
        case 'worksheet':
            return (react_1.default.createElement(ColumnsWrap_1.RenderWorksheetItem, { item: item, clientWorksheet: clientWorksheet }));
        default:
            throw new Error(`Unknown worksheet item type: ${type}`);
    }
}
exports.default = WorksheetViewerItemRenderer;
//# sourceMappingURL=WorksheetViewerItemRenderer.js.map