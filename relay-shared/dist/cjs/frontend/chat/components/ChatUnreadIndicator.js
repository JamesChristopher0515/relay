"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const IndicatorBadge_1 = __importDefault(require("../../../core/components/IndicatorBadge"));
const useApi_1 = require("../../api/hooks/useApi");
function ChatUnreadIndicator({ userId, ...rest }) {
    const query = {
        sort: { createdAt: -1 },
        ...(userId ? { aboutUser: userId } : {}),
    };
    const { data, refetch } = (0, useApi_1.useGetNotificationsQuery)(query, {
        pollingInterval: 1000 * 5,
    });
    const notifications = data?.data ?? [];
    const latestChatNotif = notifications.find(n => n.type === 'chat');
    const unreadMessages = !latestChatNotif || latestChatNotif.read ? 0 : latestChatNotif.value.unread;
    return react_1.default.createElement(IndicatorBadge_1.default, { count: unreadMessages, ...rest });
}
exports.default = ChatUnreadIndicator;
//# sourceMappingURL=ChatUnreadIndicator.js.map