"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeController_1 = __importDefault(require("@mtyk/frontend/controllers/helpers/makeController"));
const useEventToState_1 = __importDefault(require("../helpers/useEventToState"));
exports.default = (0, makeController_1.default)(function ConversationController(props) {
    const { conversationManager } = props;
    const [isFinished] = (0, useEventToState_1.default)(conversationManager, 'is-finished', undefined, false);
    const [isLoading] = (0, useEventToState_1.default)(conversationManager, 'is-loading', undefined, true);
    const [items] = (0, useEventToState_1.default)(conversationManager, 'conversation-changed', undefined, []);
    return {
        conversationManager,
        isLoading,
        items,
        isFinished,
    };
});
//# sourceMappingURL=ConversationController.js.map