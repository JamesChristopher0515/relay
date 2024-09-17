"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assertDefined_1 = __importDefault(require("@mtyk/frontend/core/helpers/assertDefined"));
function getTableInfo(worksheetItem, clientWorksheet) {
    (0, assertDefined_1.default)(worksheetItem.type === 'worksheet', 'Expected worksheet item');
    const { type, data } = worksheetItem;
    const responses = clientWorksheet.responses;
    const rawRows = (responses[worksheetItem._id] ?? []);
    const headerColumns = [
        ...data.columns.map(column => {
            return { text: column.question };
        }),
    ];
    function getResponse(row, column) {
        const response = responses[worksheetItem._id][row]?.[column];
        return response;
    }
    const rows = rawRows.map((rawColumnValue, rowIndex) => {
        return rawColumnValue.map((colVal, colIndex) => {
            const response = getResponse(rowIndex, colIndex);
            const columnInfo = data.columns[colIndex];
            return {
                ...columnInfo,
                text: colVal,
                response,
            };
        });
    });
    return {
        headerColumns,
        rawRows,
        rows,
        getResponse,
        isNew: !rawRows,
    };
}
exports.default = getTableInfo;
//# sourceMappingURL=getTableInfo.js.map