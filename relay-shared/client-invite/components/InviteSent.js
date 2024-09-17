import { Flex, Icon, Txt } from '@mtyk/frontend/core/components';
import { globalDepContext } from '@bbuild/deps';
import React from 'react';
import { RC } from '../../core/components/RC';
import Backable from './Backable';
import { LinkingDep } from '../../core/helpers/clientAppDeps';
import RelayIcons from '../../frontend/icons/RelayIcons';
export function InviteSent() {
    return (React.createElement(Backable, null,
        React.createElement(Flex, { gap: 18, center: true },
            React.createElement(Icon, { icon: RelayIcons.envelope, size: "3em" }),
            React.createElement(Txt, { size: 18, center: true }, "We\u2019ve sent another invitation to your email."),
            React.createElement(Txt, { size: 16, center: true },
                "Please follow the instructions within to continue.",
                ' '),
            React.createElement(RC, { name: "Button", action: async () => {
                    const { LinkingDep: Linking } = await globalDepContext.provideDeps({
                        LinkingDep,
                    });
                    Linking.openURL('message://');
                } }, "Check Email"))));
}
//# sourceMappingURL=InviteSent.js.map