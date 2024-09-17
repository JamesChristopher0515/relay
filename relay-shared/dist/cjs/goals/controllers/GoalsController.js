"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useClientShared_1 = __importDefault(require("../../clients/hooks/useClientShared"));
const makeController_1 = __importDefault(require("@mtyk/frontend/controllers/helpers/makeController"));
const mutationForwarder_1 = __importDefault(require("../../core/helpers/mutationForwarder"));
const wrapArrayHook_1 = __importDefault(require("../../core/helpers/wrapArrayHook"));
const useApi_1 = require("../../frontend/api/hooks/useApi");
exports.default = (0, makeController_1.default)(function GoalsController(props) {
    const {} = props;
    const [client] = (0, useClientShared_1.default)();
    const { data: goals, ...rest } = (0, wrapArrayHook_1.default)((0, useApi_1.useGetGoalsQuery)({ client: client._id }));
    const [createGoalMutation] = (0, useApi_1.useCreateGoalMutation)();
    const [deleteGoalMutation] = (0, useApi_1.useDeleteGoalMutation)();
    return {
        data: goals,
        ...rest,
        remove: (0, mutationForwarder_1.default)(deleteGoalMutation),
        create: (0, mutationForwarder_1.default)(createGoalMutation),
    };
});
//# sourceMappingURL=GoalsController.js.map