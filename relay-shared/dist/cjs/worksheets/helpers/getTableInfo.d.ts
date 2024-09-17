import { ClientWorksheet, WorksheetItem } from '../../RelayTypes';
export default function getTableInfo<ResponseType>(worksheetItem: WorksheetItem, clientWorksheet: ClientWorksheet): {
    headerColumns: any[];
    rawRows: ResponseType[][];
    rows: any[][];
    getResponse: (row: number, column: number) => ResponseType;
    isNew: boolean;
};
//# sourceMappingURL=getTableInfo.d.ts.map