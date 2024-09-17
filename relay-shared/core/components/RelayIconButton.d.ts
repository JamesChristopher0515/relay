import { MTYKIcon } from '@mtyk/frontend/core/components/Icon';
import React from 'react';
export interface IconButtonProps {
    icon: MTYKIcon;
    action: (event: any) => void;
    label: string;
    iconProps?: any;
    transparent?: boolean;
    rightClickAction?: () => void;
    style?: any;
    accent?: boolean;
    disabled?: boolean;
}
declare const _default: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<unknown>>;
export default _default;
//# sourceMappingURL=RelayIconButton.d.ts.map