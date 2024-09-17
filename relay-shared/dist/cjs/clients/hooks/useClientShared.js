"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const RContext_1 = __importDefault(require("../../core/contexts/RContext"));
function useClientShared() {
    const sharedRContext = (0, react_1.useContext)(RContext_1.default);
    const { platformHooks } = sharedRContext;
    return platformHooks.useClient();
}
exports.default = useClientShared;
//# sourceMappingURL=useClientShared.js.map