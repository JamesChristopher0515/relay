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
exports.CommandMenuProvider = void 0;
const react_1 = __importStar(require("react"));
const useRegisterCommands_1 = require("../hooks/useRegisterCommands");
function CommandMenuProvider(props) {
    const [components, setComponents] = (0, react_1.useState)({});
    const registerOptions = (0, react_1.useCallback)((options, componentId) => {
        setComponents((prevComponents) => ({
            ...prevComponents,
            [componentId]: [...(prevComponents[componentId] ?? []), ...options],
        }));
    }, []);
    const unregisterOptions = (0, react_1.useCallback)((componentId) => {
        setComponents((prevComponents) => {
            const { [componentId]: removed, ...newComponents } = prevComponents;
            return newComponents;
        });
    }, []);
    const availableOptions = Object.values(components).flat();
    return (react_1.default.createElement(useRegisterCommands_1.CommandMenuContext.Provider, { value: { availableOptions, registerOptions, unregisterOptions } }, props.children));
}
exports.CommandMenuProvider = CommandMenuProvider;
exports.default = CommandMenuProvider;
//# sourceMappingURL=CommandMenuProvider.js.map