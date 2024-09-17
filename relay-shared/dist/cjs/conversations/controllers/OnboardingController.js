"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useUser_1 = require("core/hooks/useUser");
const useWrappedAxios_1 = require("core/hooks/useWrappedAxios");
const date_fns_1 = require("date-fns");
const react_1 = require("react");
const makeController_1 = __importDefault(require("@mtyk/frontend/controllers/helpers/makeController"));
const wrapArrayHook_1 = __importDefault(require("../../core/helpers/wrapArrayHook"));
const useApi_1 = require("../../frontend/api/hooks/useApi");
const OnboardingConversationManager_1 = __importDefault(require("../OnboardingConversationManager"));
exports.default = (0, makeController_1.default)(function OnboardingController(props) {
    const {} = props;
    const today = (0, date_fns_1.startOfDay)(new Date());
    const tomorrow = (0, date_fns_1.add)(today, { days: 1 });
    const [user] = (0, useUser_1.useClient)();
    const wrappedAxios = (0, useWrappedAxios_1.useWrappedAxios)();
    const { data: todos, isLoading } = (0, wrapArrayHook_1.default)((0, useApi_1.useGetTodosQuery)({
        client: user._id,
        assigned: {
            $gte: today.toISOString(),
            $lt: tomorrow.toISOString(),
        },
    }, {
        refetchOnMountOrArgChange: true,
    }));
    const [conversationManager, setConversationManager] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            const assignedResources = todos.map((todo) => todo.resource);
            const conversation = new OnboardingConversationManager_1.default(assignedResources, wrappedAxios);
            setConversationManager(conversation);
        }
    }, [isLoading]);
    return {
        conversationManager,
    };
});
//# sourceMappingURL=OnboardingController.js.map