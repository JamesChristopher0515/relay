"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useRContext_1 = __importDefault(require("./useRContext"));
function useWrappedAxiosShared() {
    const context = (0, useRContext_1.default)();
    return context.platformHooks.useWrappedAxios();
}
exports.default = useWrappedAxiosShared;
//# sourceMappingURL=useWrappedAxiosShared.js.map