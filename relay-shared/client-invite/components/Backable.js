import { Flex } from '@mtyk/frontend/core/components';
import React from 'react';
import ClientInviteMachine from '../machines/ClientInvite.machine';
import { RC } from '../../core/components/RC';
import RelayIcons from '../../frontend/icons/RelayIcons';
function Backable({ children }) {
    return (React.createElement(Flex, null,
        React.createElement(RC, { name: "TextButton", icon: RelayIcons.back, action: async () => {
                await ClientInviteMachine.transitionTo('onLoginScreen');
            } }, "Back"),
        children));
}
export default Backable;
//# sourceMappingURL=Backable.js.map