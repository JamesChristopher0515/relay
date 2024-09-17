import { Flex, Txt } from '@mtyk/frontend/core/components';
import React from 'react';
export default function HeadedItems(props) {
    const { title, children } = props;
    return (React.createElement(Flex, { gap: "1em", style: { marginBottom: '2.5em' } },
        React.createElement(Txt, { style: { marginLeft: '2.7rem' }, medium: true, size: "1.05em", color: "#726868" }, title),
        React.createElement(Flex, null, children)));
}
//# sourceMappingURL=HeadedItems.js.map