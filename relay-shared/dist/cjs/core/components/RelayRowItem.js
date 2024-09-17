"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
function RelayRowItem(props) {
    const { selected, children, empty, ...rest } = props;
    return (react_1.default.createElement(components_1.Flex, { justifyContent: "center", ...rest, style: {
            height: '5.3em',
            border: `1px solid ${selected ? '#00A1FF' : '#F5F1F1'}`,
            backgroundColor: `${selected ? '#F2F6F9' : '#FFFFFF'}`,
            color: `${selected ? '#419FFD' : '#000000'}`,
            cursor: 'pointer',
            padding: '0.3em 1.4em',
            fontSize: '.9em',
            ...rest.style,
        } }, children));
}
exports.default = RelayRowItem;
//# sourceMappingURL=RelayRowItem.js.map