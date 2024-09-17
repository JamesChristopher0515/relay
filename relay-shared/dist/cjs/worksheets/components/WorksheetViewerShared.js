"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const compose_1 = __importDefault(require("@mtyk/frontend/react/helpers/compose"));
const react_1 = __importDefault(require("react"));
const RC_1 = require("../../core/components/RC");
const useApi_1 = require("../../frontend/api/hooks/useApi");
const getAllWorksheetItems_1 = __importDefault(require("../helpers/getAllWorksheetItems"));
function WorksheetViewerInner({ worksheet, clientWorksheet, }) {
    const allItmes = (0, getAllWorksheetItems_1.default)(worksheet);
    return (react_1.default.createElement(components_1.Flex, null, allItmes.map((item, index) => {
        const { type } = item;
    })));
}
exports.default = (0, compose_1.default)()(function WorksheetViewerShared(props) {
    const { clientWorksheet } = props;
    const { data: worksheet } = (0, useApi_1.useGetWorksheetQuery)(clientWorksheet.worksheet);
    if (!worksheet) {
        return react_1.default.createElement(RC_1.RC, { name: "loading" });
    }
    return (react_1.default.createElement(components_1.Flex, null,
        react_1.default.createElement(WorksheetViewerInner, { worksheet: worksheet, clientWorksheet: clientWorksheet })));
});
//# sourceMappingURL=WorksheetViewerShared.js.map