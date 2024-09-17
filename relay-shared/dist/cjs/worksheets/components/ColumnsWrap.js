"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderWorksheetItem = void 0;
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
const getTableInfo_1 = __importDefault(require("../helpers/getTableInfo"));
function ColumnsWrap({ children }) {
    return react_1.default.createElement(components_1.Flex, null, children);
}
const columnWidth = 150;
function RenderWorksheetItem({ item, clientWorksheet, }) {
    const info = (0, getTableInfo_1.default)(item, clientWorksheet);
    const { headerColumns, rows } = info;
    function renderColumnCell({ isHeader, question, key, rowIndex, columnIndex, }) {
        const cellResponse = info.getResponse(rowIndex, columnIndex);
        return (react_1.default.createElement(components_1.Flex, { style: { width: columnWidth }, key: key },
            react_1.default.createElement(components_1.Txt, { medium: isHeader }, isHeader ? question : cellResponse)));
    }
    return (react_1.default.createElement(components_1.Flex, { column: true },
        react_1.default.createElement(ColumnsWrap, null, headerColumns.map((column, rowIndex) => {
            return renderColumnCell({
                ...column,
                isHeader: true,
                key: column._id,
                rowIndex,
                columnIndex: rowIndex,
            });
        })),
        rows.map((columns, rowIndex) => {
            return columns.map((column, columnIndex) => {
                return (react_1.default.createElement(ColumnsWrap, { key: rowIndex }, renderColumnCell({
                    ...column,
                    isHeader: false,
                    key: column._id,
                    rowIndex,
                    columnIndex,
                })));
            });
        })));
}
exports.RenderWorksheetItem = RenderWorksheetItem;
//# sourceMappingURL=ColumnsWrap.js.map