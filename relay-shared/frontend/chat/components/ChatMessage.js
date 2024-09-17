import { Flex, Txt } from '@mtyk/frontend/core/components';
import isNative from '@mtyk/frontend/core/helpers/isNative';
import nativeProps, { webProps } from '@mtyk/frontend/react/nativeProps';
import React from 'react';
const dayjs = require('dayjs');
const calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);
export default function ChatMessage({ message, user, messageBoxStyles, ...rest }) {
    const own = message.from === user._id;
    const createdAt = dayjs(message.createdAt);
    const colors = {
        oursText: '#41565B',
        theirsText: '#6C5656',
    };
    const ownColor = '#DAEAEE';
    const theirsColor = '#F1ECEC';
    return (React.createElement(Flex, { ...rest, style: {
            ...webProps({
                margin: `.35em 0`,
            }),
            ...nativeProps({
                marginVertical: 4,
                marginTop: message.lastInGroup ? 36 : 4,
            }),
            ...rest.style,
        } },
        message.lastInDay ? (React.createElement(Txt, { style: {
                fontSize: 12.5,
                color: 'rgba(0, 0, 0, 0.6)',
                marginBottom: 17,
                marginTop: 30,
                textAlign: own ? 'right' : 'left',
            } }, createdAt.calendar())) : null,
        React.createElement(Flex, { padding: [7, 20], rowCenter: true, style: {
                maxWidth: '75%',
                alignItems: 'center',
                wordBreak: 'break-word',
                alignSelf: own ? 'flex-end' : 'flex-start',
                borderRadius: 5,
                backgroundColor: own ? ownColor : theirsColor,
                ...messageBoxStyles,
            } }, typeof message.content === 'string' ? (React.createElement(Txt, { medium: true, size: isNative ? 14 : '.95em', color: own ? colors.oursText : colors.theirsText }, message.content)) : (message.content))));
}
//# sourceMappingURL=ChatMessage.js.map