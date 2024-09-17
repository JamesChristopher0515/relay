import { assert, isNative } from '@mtyk/frontend/core/helpers';
import React, { cloneElement, forwardRef } from 'react';
import useRContext from '../hooks/useRContext';
function RelaySharedComponent(props, ref) {
    const { name: _name, disabled, native, web, ...rest } = props;
    const componentOrName = (isNative ? native : web) ?? _name;
    const context = useRContext();
    const Component = context.platformComponents[typeof componentOrName === 'string' ? componentOrName : ''] ?? componentOrName;
    if (disabled) {
        return null;
    }
    assert(typeof Component !== 'undefined', `Couldn't find shared component named "${componentOrName}"`);
    return React.createElement(Component, { ref, ...rest });
}
export function PassDown({ children, ...rest }) {
    return React.createElement(React.Fragment, null, cloneElement(children, rest));
}
export const RC = forwardRef(RelaySharedComponent);
//# sourceMappingURL=RC.js.map