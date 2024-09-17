import { Flex, Txt, Icon } from '@mtyk/frontend/core/components';
import React from 'react';
import { RC } from '../../core/components/RC';
import ClientInviteMachine from '../machines/ClientInvite.machine';
import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter';
import RelayIcons from '../../frontend/icons/RelayIcons';
export function OnLoginScreen() {
    const email = useInputAdapter('');
    return (React.createElement(Flex, { center: true },
        React.createElement(Flex, { center: true, gap: 25 },
            React.createElement(Flex, { gap: 5 },
                React.createElement(Icon, { icon: RelayIcons.puzzlePiece, size: "2em", color: "rgba(0, 0, 0, .2)" }),
                React.createElement(Txt, { center: true, medium: true }, "Relay")),
            React.createElement(Flex, { center: true, gap: 12 },
                React.createElement(Txt, { center: true, style: { maxWidth: 300 } }, "Please enter the email or username provided to you by your practitioner"),
                React.createElement(Flex, { rc: true, gap: 5 },
                    React.createElement(RC, { name: "Input", placeholder: "Email of username", ...email }),
                    React.createElement(RC, { name: "IconButton", label: "Next", icon: RelayIcons.next, action: async () => {
                            await ClientInviteMachine.transitionTo('onSubmitEmail', {
                                email: email.value,
                            });
                        } }))))));
}
//# sourceMappingURL=OnLoginScreen.js.map