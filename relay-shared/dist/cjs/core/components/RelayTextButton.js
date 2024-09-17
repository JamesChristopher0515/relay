"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
function RelayTextButton(props) {
    const { children, action } = props;
    return react_1.default.createElement(components_1.Txt, { onClick: action }, children);
}
exports.default = RelayTextButton;
//# sourceMappingURL=RelayTextButton.js.map