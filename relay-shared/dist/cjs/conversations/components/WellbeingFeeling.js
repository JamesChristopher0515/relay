"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styleObjects_1 = require("@mtyk/frontend/styles/helpers/styleObjects");
const react_1 = __importDefault(require("react"));
const RC_1 = require("../../core/components/RC");
function WellbeingFeeling({ index, size, ...rest }) {
    if (index > 0) {
        const feeling = ['not great', 'ok', 'good', 'great'][index - 1];
        return (react_1.default.createElement(RC_1.RC, { name: "FeelingIcon", feeling: feeling, ...rest, style: { ...(0, styleObjects_1.makeSize)(size ?? 30) } }));
    }
    else {
        return null;
    }
}
exports.default = WellbeingFeeling;
//# sourceMappingURL=WellbeingFeeling.js.map