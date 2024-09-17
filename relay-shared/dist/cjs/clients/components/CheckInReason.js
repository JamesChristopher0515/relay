"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInReason = void 0;
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
const getReasonName_1 = __importDefault(require("../../reasons/helpers/getReasonName"));
function CheckInReason({ checkInObj }) {
    if (checkInObj?.reasons?.[0]) {
        const theReason = checkInObj.reasons[0];
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(components_1.Txt, null,
                "because ",
                checkInObj.reasons[0]?.name === 'custom' ? '' : 'of ',
                react_1.default.createElement(components_1.Txt, { bold: true, color: '#C0A789' }, (0, getReasonName_1.default)(theReason).replace(/\.$/, '')))));
    }
    return null;
}
exports.CheckInReason = CheckInReason;
//# sourceMappingURL=CheckInReason.js.map