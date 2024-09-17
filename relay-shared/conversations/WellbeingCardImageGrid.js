import { Flex, Txt } from '@mtyk/frontend/core/components';
import React from 'react';
import Actionable from '../core/components/Actionable';
import mapQuestionAnswers from '../questionnaires/helpers/mapQuestionAnswers';
import WellbeingFeeling from './components/WellbeingFeeling';
export function WellbeingCardImageGrid({ question, questionnaire, onConfirmAnswer, }) {
    return (React.createElement(Flex, { center: true, fw: true, style: {} },
        React.createElement(Flex, { row: true, style: { flexWrap: 'wrap', paddingVertical: 25 }, grow: true }, mapQuestionAnswers(questionnaire, question)
            .slice(1)
            .map((answer, i) => {
            return (React.createElement(Actionable, { action: () => onConfirmAnswer(i + 1), key: i, style: {
                    width: '50%',
                    alignItems: 'center',
                    height: 130,
                    flexGrow: 1,
                    justifyContent: 'center',
                } },
                React.createElement(Flex, { center: true, gap: 7 },
                    React.createElement(WellbeingFeeling, { index: i + 1 }),
                    React.createElement(Txt, { semibold: true, center: true }, answer.text))));
        })),
        React.createElement(Actionable, { action: () => onConfirmAnswer(0) },
            React.createElement(Txt, { color: 'rgba(0, 0, 0, 0.7)' }, "This is not important to me"))));
}
//# sourceMappingURL=WellbeingCardImageGrid.js.map