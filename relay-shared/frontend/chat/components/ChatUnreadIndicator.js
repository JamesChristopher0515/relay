import React from 'react';
import IndicatorBadge from '../../../core/components/IndicatorBadge';
import { useGetNotificationsQuery } from '../../api/hooks/useApi';
export default function ChatUnreadIndicator({ userId, ...rest }) {
    const query = {
        sort: { createdAt: -1 },
        ...(userId ? { aboutUser: userId } : {}),
    };
    const { data, refetch } = useGetNotificationsQuery(query, {
        pollingInterval: 1000 * 5,
    });
    const notifications = data?.data ?? [];
    const latestChatNotif = notifications.find(n => n.type === 'chat');
    const unreadMessages = !latestChatNotif || latestChatNotif.read ? 0 : latestChatNotif.value.unread;
    return React.createElement(IndicatorBadge, { count: unreadMessages, ...rest });
}
//# sourceMappingURL=ChatUnreadIndicator.js.map