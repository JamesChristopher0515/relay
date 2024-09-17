import { Flex, Icon } from '@mtyk/frontend/core/components';
import { circle } from '@mtyk/frontend/styles/helpers/styleObjects';
import { shadow } from '@mtyk/frontend/styles/helpers/styles';
import HoverableThing from '@mtyk/frontend/tooltips/components/HoverableThing';
import React, { forwardRef } from 'react';
export default forwardRef(function IconButton(props, ref) {
    const { icon, iconProps, label, action, transparent, rightClickAction } = props;
    return (React.createElement(HoverableThing, { tooltip: label },
        React.createElement(Flex, { ref: ref, center: true, onClick: action, onContextMenu: (event) => {
                if (rightClickAction) {
                    event.preventDefault();
                    rightClickAction();
                }
            }, style: {
                ...circle('2em'),
                ...(transparent ? {} : shadow()),
                opacity: props.disabled ? 0.5 : 1,
                userSelect: 'none',
                cursor: 'pointer',
                ...props.style,
            } },
            React.createElement(Icon, { icon: icon, color: props.accent ? 'white' : '#444', ...iconProps }))));
});
//# sourceMappingURL=RelayIconButton.js.map