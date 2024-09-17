import { Flex, Txt } from '@mtyk/frontend/core/components';
import React from 'react';
function SvgForFeeling({ feeling }) {
    return null;
}
export default function RelayFeeling(props) {
    const { feeling } = props;
    return (React.createElement(Flex, null,
        React.createElement(SvgForFeeling, { ...props }),
        React.createElement(Txt, null, feeling)));
}
//# sourceMappingURL=RelayFeeling.js.map