import { Svg } from '@mtyk/frontend/core/components';
import React from 'react';
export default function makeSharedSVG(svg, { useStroke, useBoth, autoHeight, autoWidth, } = {
    useStroke: false,
    useBoth: false,
    autoHeight: false,
    autoWidth: false,
}) {
    return function SharedSVG({ color, size: _size, style, ...rest }) {
        const iconColor = color ?? style?.color ?? 'white';
        const size = _size ?? style?.fontSize ?? 16;
        const widthHeight = style?.width ?? size;
        const extraProps = {
            fill: iconColor,
        };
        extraProps.height = autoHeight ? null : widthHeight;
        extraProps.width = autoWidth ? null : widthHeight;
        if (useStroke || useBoth) {
            extraProps.fill = useBoth ? iconColor : 'none';
            extraProps.stroke = iconColor;
        }
        return (React.createElement(Svg, { ...rest, style: { ...style }, ...extraProps }, svg));
    };
}
//# sourceMappingURL=makeSharedSVG.js.map