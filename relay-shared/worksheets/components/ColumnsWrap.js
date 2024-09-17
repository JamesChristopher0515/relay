import { Flex, Txt } from '@mtyk/frontend/core/components';
import React from 'react';
import getTableInfo from '../helpers/getTableInfo';
function ColumnsWrap({ children }) {
    return React.createElement(Flex, null, children);
}
const columnWidth = 150;
export function RenderWorksheetItem({ item, clientWorksheet, }) {
    const info = getTableInfo(item, clientWorksheet);
    const { headerColumns, rows } = info;
    function renderColumnCell({ isHeader, question, key, rowIndex, columnIndex, }) {
        const cellResponse = info.getResponse(rowIndex, columnIndex);
        return (React.createElement(Flex, { style: { width: columnWidth }, key: key },
            React.createElement(Txt, { medium: isHeader }, isHeader ? question : cellResponse)));
    }
    return (React.createElement(Flex, { column: true },
        React.createElement(ColumnsWrap, null, headerColumns.map((column, rowIndex) => {
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
                return (React.createElement(ColumnsWrap, { key: rowIndex }, renderColumnCell({
                    ...column,
                    isHeader: false,
                    key: column._id,
                    rowIndex,
                    columnIndex,
                })));
            });
        })));
}
//# sourceMappingURL=ColumnsWrap.js.map