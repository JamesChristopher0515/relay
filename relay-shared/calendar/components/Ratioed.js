import { Flex } from '@mtyk/frontend/core/components';
import { config } from '@mtyk/frontend/core/helpers';
import { unifyStyle } from '@mtyk/frontend/react';
import { percentage } from '@mtyk/frontend/strings';
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects';
import React, { forwardRef, useState } from 'react';
/**
 * @deprecated Temporarily copied in from mtyk/frontend until we have a better
 *   packaging workflow
 */
function Ratioed({ widthToHeight: _widthToHeight, component: Component, childStyle, ...rest }, ref) {
    const [layout, setLayout] = useState();
    const widthToHeight = _widthToHeight ?? 1;
    if (config.isNative) {
        return (React.createElement(Component, { onLayout: ({ nativeEvent }) => {
                setLayout(nativeEvent.layout);
            }, ...rest, style: unifyStyle(layout
                ? {
                    height: (1 / widthToHeight) * layout.width,
                }
                : {
                    paddingBottom: (widthToHeight - 1) * 100 + '%',
                }, rest.style ?? {}), ref: ref }));
    }
    else {
        const percentageToFrac = parseFloat(rest.style?.width ?? '100%') / 100;
        return (React.createElement(Flex, { className: "Ratioed", center: true, style: {
                paddingBottom: percentage(percentageToFrac / widthToHeight),
                width: percentage(percentageToFrac),
                position: 'relative',
                ...(rest.style ?? {}),
            }, ref: ref },
            React.createElement(Component, { ...rest, style: { ...(childStyle ?? {}), width: undefined, ...absoluteFill() } })));
    }
}
export default forwardRef(Ratioed);
//# sourceMappingURL=Ratioed.js.map