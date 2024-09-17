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
exports.RC = exports.PassDown = void 0;
const helpers_1 = require("@mtyk/frontend/core/helpers");
const react_1 = __importStar(require("react"));
const useRContext_1 = __importDefault(require("../hooks/useRContext"));
function RelaySharedComponent(props, ref) {
    const { name: _name, disabled, native, web, ...rest } = props;
    const componentOrName = (helpers_1.isNative ? native : web) ?? _name;
    const context = (0, useRContext_1.default)();
    const Component = context.platformComponents[typeof componentOrName === 'string' ? componentOrName : ''] ?? componentOrName;
    if (disabled) {
        return null;
    }
    (0, helpers_1.assert)(typeof Component !== 'undefined', `Couldn't find shared component named "${componentOrName}"`);
    return react_1.default.createElement(Component, { ref, ...rest });
}
function PassDown({ children, ...rest }) {
    return react_1.default.createElement(react_1.default.Fragment, null, (0, react_1.cloneElement)(children, rest));
}
exports.PassDown = PassDown;
exports.RC = (0, react_1.forwardRef)(RelaySharedComponent);
//# sourceMappingURL=RC.js.map