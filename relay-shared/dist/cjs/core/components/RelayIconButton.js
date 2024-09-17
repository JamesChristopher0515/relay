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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const styleObjects_1 = require("@mtyk/frontend/styles/helpers/styleObjects");
const styles_1 = require("@mtyk/frontend/styles/helpers/styles");
const HoverableThing_1 = __importDefault(require("@mtyk/frontend/tooltips/components/HoverableThing"));
const react_1 = __importStar(require("react"));
exports.default = (0, react_1.forwardRef)(function IconButton(props, ref) {
    const { icon, iconProps, label, action, transparent, rightClickAction } = props;
    return (react_1.default.createElement(HoverableThing_1.default, { tooltip: label },
        react_1.default.createElement(components_1.Flex, { ref: ref, center: true, onClick: action, onContextMenu: (event) => {
                if (rightClickAction) {
                    event.preventDefault();
                    rightClickAction();
                }
            }, style: {
                ...(0, styleObjects_1.circle)('2em'),
                ...(transparent ? {} : (0, styles_1.shadow)()),
                opacity: props.disabled ? 0.5 : 1,
                userSelect: 'none',
                cursor: 'pointer',
                ...props.style,
            } },
            react_1.default.createElement(components_1.Icon, { icon: icon, color: props.accent ? 'white' : '#444', ...iconProps }))));
});
//# sourceMappingURL=RelayIconButton.js.map