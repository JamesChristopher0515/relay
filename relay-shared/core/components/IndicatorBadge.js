import { rest } from 'lodash';
import { Flex, Txt } from '@mtyk/frontend/core/components';
import { unifyStyles } from '@mtyk/frontend/react/helpers/unifyStyle';
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects';
import React from 'react';
export default function IndicatorBadge(props) {
    const { count, style } = props;
    if (count === 0) {
        return null;
    }
    return (React.createElement(Flex, { center: true, style: unifyStyles({
            position: 'absolute',
            backgroundColor: '#E75A5A',
            borderRadius: 1000,
            ...makeSize(18),
        }, style ?? {}), ...rest },
        React.createElement(Txt, { center: true, semibold: true, adjustsFontSizeToFit: true, style: { color: 'white', fontSize: 12.5 } }, count)));
}
//# sourceMappingURL=IndicatorBadge.js.map