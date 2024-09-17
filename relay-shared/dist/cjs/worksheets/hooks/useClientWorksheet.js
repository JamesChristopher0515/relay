"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useApi_1 = require("../../frontend/api/hooks/useApi");
function useClientWorksheet(clientWorksheetId) {
    const { data: clientWorksheet } = (0, useApi_1.useGetClientWorksheetQuery)(clientWorksheetId, { skip: !clientWorksheetId });
    const { data: worksheet } = (0, useApi_1.useGetWorksheetQuery)(clientWorksheet.worksheet, {
        skip: !clientWorksheet?.worksheet,
    });
    return {
        worksheet,
        clientWorksheet,
        isReady: !clientWorksheet || !worksheet,
    };
}
exports.default = useClientWorksheet;
//# sourceMappingURL=useClientWorksheet.js.map