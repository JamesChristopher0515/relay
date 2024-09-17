"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
function makeSharedSVG(svg, { useStroke, useBoth, autoHeight, autoWidth, } = {
    useStroke: false,
    useBoth: false,
    autoHeight: false,
    autoWidth: false,
}) {
    return function SharedSVG({ color, size: _size, style, ...rest }) {
        const iconColor = color ?? style?.color ?? 'white';
        const size = _size ?? style?.fontSize ?? 16;
        const widthHeight = style?.width ?? size;
        const extraProps = {
            fill: iconColor,
        };
        extraProps.height = autoHeight ? null : widthHeight;
        extraProps.width = autoWidth ? null : widthHeight;
        if (useStroke || useBoth) {
            extraProps.fill = useBoth ? iconColor : 'none';
            extraProps.stroke = iconColor;
        }
        return (react_1.default.createElement(components_1.Svg, { ...rest, style: { ...style }, ...extraProps }, svg));
    };
}
exports.default = makeSharedSVG;
//# sourceMappingURL=makeSharedSVG.js.map