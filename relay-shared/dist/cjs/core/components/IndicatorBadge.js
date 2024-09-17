"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const components_1 = require("@mtyk/frontend/core/components");
const unifyStyle_1 = require("@mtyk/frontend/react/helpers/unifyStyle");
const styleObjects_1 = require("@mtyk/frontend/styles/helpers/styleObjects");
const react_1 = __importDefault(require("react"));
function IndicatorBadge(props) {
    const { count, style } = props;
    if (count === 0) {
        return null;
    }
    return (react_1.default.createElement(components_1.Flex, { center: true, style: (0, unifyStyle_1.unifyStyles)({
            position: 'absolute',
            backgroundColor: '#E75A5A',
            borderRadius: 1000,
            ...(0, styleObjects_1.makeSize)(18),
        }, style ?? {}), ...lodash_1.rest },
        react_1.default.createElement(components_1.Txt, { center: true, semibold: true, adjustsFontSizeToFit: true, style: { color: 'white', fontSize: 12.5 } }, count)));
}
exports.default = IndicatorBadge;
//# sourceMappingURL=IndicatorBadge.js.map