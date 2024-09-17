"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSharedActions = void 0;
const react_1 = require("react");
const RContext_1 = __importDefault(require("../contexts/RContext"));
function useRContext() {
    return (0, react_1.useContext)(RContext_1.default);
}
exports.default = useRContext;
function useSharedActions() {
    return useRContext().sharedActions;
}
exports.useSharedActions = useSharedActions;
//# sourceMappingURL=useRContext.js.map