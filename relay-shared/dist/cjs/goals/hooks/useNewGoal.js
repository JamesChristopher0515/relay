"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useMemoryImmer_1 = __importDefault(require("@mtyk/frontend/react/hooks/useMemoryImmer"));
const useClientShared_1 = __importDefault(require("../../clients/hooks/useClientShared"));
const newGoal_1 = __importDefault(require("../helpers/newGoal"));
function useNewGoal() {
    const [client] = (0, useClientShared_1.default)();
    return (0, useMemoryImmer_1.default)('newGoal', (0, newGoal_1.default)({ client: client._id }));
}
exports.default = useNewGoal;
//# sourceMappingURL=useNewGoal.js.map