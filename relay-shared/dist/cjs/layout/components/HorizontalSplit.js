"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
function HorizontalSplit(props) {
    const { children, ...rest } = props;
    const asArray = react_1.default.Children.toArray(children);
    return (react_1.default.createElement(components_1.Flex, { ...rest, row: true }, asArray.map((child, index) => {
        const childIsElement = react_1.default.isValidElement(child);
        const props = childIsElement ? child.props : {};
        const key = props.key ?? index;
        return react_1.default.createElement(react_1.default.Fragment, { key: key }, child);
    })));
}
exports.default = HorizontalSplit;
//# sourceMappingURL=HorizontalSplit.js.map