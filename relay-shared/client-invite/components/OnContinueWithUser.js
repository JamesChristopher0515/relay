import { Flex, Txt } from '@mtyk/frontend/core/components';
import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter';
import React from 'react';
import ClientInviteMachine from '../machines/ClientInvite.machine';
import { RC } from '../../core/components/RC';
export function OnContinueWithEmail() {
    const password = useInputAdapter('');
    const confirmPassword = useInputAdapter('');
    return (React.createElement(Flex, null,
        React.createElement(Txt, null, "Setup a strong password"),
        React.createElement(Txt, null, "Make sure it\u2019s at least 8 characters long and contains a mixture of uppercase and lowercase letters."),
        React.createElement(RC, { name: "Input", type: "password", placeholder: "Password", ...password }),
        React.createElement(RC, { name: "Input", type: "password", placeholder: "Confirm Password", ...confirmPassword }),
        React.createElement(RC, { name: "PasswordMeter", password: password }),
        React.createElement(RC, { name: "Button", label: "Next", action: async () => {
                await ClientInviteMachine.transitionTo('onSetPassword', {
                    password: password.value,
                    confirmPassword: confirmPassword.value,
                    verifyToken: ClientInviteMachine.currentContext.token,
                });
            } })));
}
export const OnContinueWithUser = OnContinueWithEmail;
export const OnContinueWithVerifyToken = OnContinueWithEmail;
//# sourceMappingURL=OnContinueWithUser.js.map