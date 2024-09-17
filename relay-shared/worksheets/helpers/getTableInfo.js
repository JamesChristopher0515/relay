import assert from '@mtyk/frontend/core/helpers/assertDefined';
export default function getTableInfo(worksheetItem, clientWorksheet) {
    assert(worksheetItem.type === 'worksheet', 'Expected worksheet item');
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
//# sourceMappingURL=getTableInfo.js.map