"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const helpers_1 = require("@mtyk/frontend/core/helpers");
const react_1 = require("@mtyk/frontend/react");
const strings_1 = require("@mtyk/frontend/strings");
const styleObjects_1 = require("@mtyk/frontend/styles/helpers/styleObjects");
const react_2 = __importStar(require("react"));
/**
 * @deprecated Temporarily copied in from mtyk/frontend until we have a better
 *   packaging workflow
 */
function Ratioed({ widthToHeight: _widthToHeight, component: Component, childStyle, ...rest }, ref) {
    const [layout, setLayout] = (0, react_2.useState)();
    const widthToHeight = _widthToHeight ?? 1;
    if (helpers_1.config.isNative) {
        return (react_2.default.createElement(Component, { onLayout: ({ nativeEvent }) => {
                setLayout(nativeEvent.layout);
            }, ...rest, style: (0, react_1.unifyStyle)(layout
                ? {
                    height: (1 / widthToHeight) * layout.width,
                }
                : {
                    paddingBottom: (widthToHeight - 1) * 100 + '%',
                }, rest.style ?? {}), ref: ref }));
    }
    else {
        const percentageToFrac = parseFloat(rest.style?.width ?? '100%') / 100;
        return (react_2.default.createElement(components_1.Flex, { className: "Ratioed", center: true, style: {
                paddingBottom: (0, strings_1.percentage)(percentageToFrac / widthToHeight),
                width: (0, strings_1.percentage)(percentageToFrac),
                position: 'relative',
                ...(rest.style ?? {}),
            }, ref: ref },
            react_2.default.createElement(Component, { ...rest, style: { ...(childStyle ?? {}), width: undefined, ...(0, styleObjects_1.absoluteFill)() } })));
    }
}
exports.default = (0, react_2.forwardRef)(Ratioed);
//# sourceMappingURL=Ratioed.js.map