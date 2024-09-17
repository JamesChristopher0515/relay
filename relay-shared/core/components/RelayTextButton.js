import { Txt } from '@mtyk/frontend/core/components';
import React from 'react';
export default function RelayTextButton(props) {
    const { children, action } = props;
    return React.createElement(Txt, { onClick: action }, children);
}
//# sourceMappingURL=RelayTextButton.js.map