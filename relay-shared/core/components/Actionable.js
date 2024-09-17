import { ReactNative } from '@mtyk/frontend/core/helpers/conditionalImports';
import { config } from '@mtyk/frontend/core/helpers/config';
import React, { Children, cloneElement } from 'react';
const Actionable = React.forwardRef(function Actionable({ children, action, style, ...rest }, ref) {
    const onlyChild = Children.only(children);
    if (config.isNative) {
        const { Pressable } = ReactNative;
        return (React.createElement(Pressable, { ref: ref, onPress: action, style: { ...style } }, cloneElement(children, { ...rest, ref })));
    }
    else {
        return (React.createElement(React.Fragment, null, cloneElement(onlyChild, {
            ...rest,
            ref,
            style,
            onClick: action,
        })));
    }
});
export default Actionable;
//# sourceMappingURL=Actionable.js.map