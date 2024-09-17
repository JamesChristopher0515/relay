"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
function HeadedItems(props) {
    const { title, children } = props;
    return (react_1.default.createElement(components_1.Flex, { gap: "1em", style: { marginBottom: '2.5em' } },
        react_1.default.createElement(components_1.Txt, { style: { marginLeft: '2.7rem' }, medium: true, size: "1.05em", color: "#726868" }, title),
        react_1.default.createElement(components_1.Flex, null, children)));
}
exports.default = HeadedItems;
//# sourceMappingURL=HeadedItems.js.map