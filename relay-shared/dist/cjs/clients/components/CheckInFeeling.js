"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInFeeling = void 0;
const components_1 = require("@mtyk/frontend/core/components");
const helpers_1 = require("@mtyk/frontend/core/helpers");
const nativeProps_1 = __importDefault(require("@mtyk/frontend/react/nativeProps"));
const styleObjects_1 = require("@mtyk/frontend/styles/helpers/styleObjects");
const react_1 = __importDefault(require("react"));
const RC_1 = require("../../core/components/RC");
const getAllFeelings_1 = require("../../feelings/helpers/getAllFeelings");
function WrapForPlatform({ children }) {
    if (helpers_1.isNative) {
        return (react_1.default.createElement(components_1.Flex, { rowCenter: true, padding: [0, 6] }, children));
    }
    else {
        return (react_1.default.createElement("div", { style: {
                display: 'inline-flex',
                alignItems: 'center',
                margin: '0 .3em',
                position: 'relative',
                top: '2px',
            } }, children));
    }
}
function CheckInFeeling({ checkInObj }) {
    if (checkInObj?.feelings[0]) {
        const theFeeling = checkInObj.feelings[0];
        return (react_1.default.createElement(components_1.Txt, null,
            "Feeling",
            react_1.default.createElement(WrapForPlatform, null,
                react_1.default.createElement(RC_1.RC, { name: "FeelingIcon", feeling: theFeeling.name, style: { ...(0, nativeProps_1.default)({ ...(0, styleObjects_1.makeSize)(18) }), marginRight: 5 } }),
                react_1.default.createElement(components_1.Txt, { ...(0, nativeProps_1.default)({ size: 18 }), bold: true, color: (0, getAllFeelings_1.getFeelingColor)(theFeeling) }, (0, getAllFeelings_1.getFeelingName)(theFeeling)))));
    }
    return null;
}
exports.CheckInFeeling = CheckInFeeling;
//# sourceMappingURL=CheckInFeeling.js.map