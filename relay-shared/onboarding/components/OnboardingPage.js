import { Flex, Txt } from '@mtyk/frontend/core/components';
import React from 'react';
import ConversationView from '../../conversations/ConversationView';
import OnboardingController from '../controllers/OnboardingController';
export default function OnboardingPage() {
    const controller = OnboardingController.use({});
    const { conversation } = controller;
    console.log(controller);
    return (React.createElement(Flex, { center: true, style: { height: '100%' }, grow: true },
        React.createElement(Txt, { medium: true }, "The onboarding page"),
        conversation ? React.createElement(ConversationView, { conversation: conversation }) : null));
}
//# sourceMappingURL=OnboardingPage.js.map