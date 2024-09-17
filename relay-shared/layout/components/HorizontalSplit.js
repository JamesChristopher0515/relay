import { Flex } from '@mtyk/frontend/core/components';
import React from 'react';
export default function HorizontalSplit(props) {
    const { children, ...rest } = props;
    const asArray = React.Children.toArray(children);
    return (React.createElement(Flex, { ...rest, row: true }, asArray.map((child, index) => {
        const childIsElement = React.isValidElement(child);
        const props = childIsElement ? child.props : {};
        const key = props.key ?? index;
        return React.createElement(React.Fragment, { key: key }, child);
    })));
}
//# sourceMappingURL=HorizontalSplit.js.map