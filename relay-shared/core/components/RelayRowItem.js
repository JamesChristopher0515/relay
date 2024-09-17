import { Flex } from '@mtyk/frontend/core/components';
import React from 'react';
export default function RelayRowItem(props) {
    const { selected, children, empty, ...rest } = props;
    return (React.createElement(Flex, { justifyContent: "center", ...rest, style: {
            height: '5.3em',
            border: `1px solid ${selected ? '#00A1FF' : '#F5F1F1'}`,
            backgroundColor: `${selected ? '#F2F6F9' : '#FFFFFF'}`,
            color: `${selected ? '#419FFD' : '#000000'}`,
            cursor: 'pointer',
            padding: '0.3em 1.4em',
            fontSize: '.9em',
            ...rest.style,
        } }, children));
}
//# sourceMappingURL=RelayRowItem.js.map