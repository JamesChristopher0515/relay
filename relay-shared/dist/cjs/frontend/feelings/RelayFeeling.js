"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
function SvgForFeeling({ feeling }) {
    return null;
}
function RelayFeeling(props) {
    const { feeling } = props;
    return (react_1.default.createElement(components_1.Flex, null,
        react_1.default.createElement(SvgForFeeling, { ...props }),
        react_1.default.createElement(components_1.Txt, null, feeling)));
}
exports.default = RelayFeeling;
//# sourceMappingURL=RelayFeeling.js.map