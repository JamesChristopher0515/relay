import { sumBy } from 'lodash';
import idEq from '../../models/helpers/idEq';
import safeMongoObj from '../../models/helpers/safeMongoObj';
import calculateMotivationScore from './calculateMotivationScore';
import getAllQuestionnaireQuestions from './getAllQuestionnaireQuestions';
function nonEmptyStr(str) {
    return typeof str === 'string' && str.trim().length > 0;
}
export default function getQuestionnaireResultOutputs(answers, questionnaire, evall) {
    const outOutputs = [];
    for (const output of questionnaire.outputs) {
        outOutputs.push(getQuestionnaireOutput(answers, questionnaire, output, evall));
    }
    return outOutputs;
}
export function getQuestionnaireScaleMax(scale) {
    return scale.elements.reduce((max, el) => Math.max(max, el.value), 0);
}
export function getQuestionnaireOutput(answers, questionnaire, output, evall) {
    function getValue() {
        if (questionnaire.id === 'motivation') {
            return calculateMotivationScore(questionnaire, answers);
        }
        const { calculation } = output;
        const allAnswersWithScales = answers.map(answer => {
            const question = findAnswerQuestion(questionnaire, answer);
            const { sectionIndex } = question;
            const scale = questionnaire.scales[question.scale];
            return {
                ...safeMongoObj(answer),
                scale,
                scaleValue: scale[answer.value],
                sectionIndex,
                scaleElement: scale.elements.find(el => el.value === answer.value),
            };
        });
        const sectionScores = questionnaire.sections.map((section, i) => {
            return sumBy(allAnswersWithScales.filter(a => a.sectionIndex === i), 'scaleValue');
        });
        // Add individual question scores as s1 - sn
        const answerVars = allAnswersWithScales
            .flatMap((answer, i) => {
            const answerVariables = [`const q${i + 1} = ${answer.value}`];
            const question = findAnswerQuestion(questionnaire, answer);
            if (nonEmptyStr(question.id)) {
                answerVariables.push(`const ${question.id} = ${answer.value === 1}`);
            }
            return answerVariables;
        })
            .join('\n');
        // Add section scores as s1 - sn
        const sectionVars = sectionScores
            .flatMap((sectionScore, i) => {
            const section = questionnaire.sections[i];
            const sectionVariables = [
                `const s${i + 1} = ${sectionScore}`,
                `const s${section.name} = ${sectionScore}`,
            ];
            return sectionVariables;
        })
            .join('\n');
        const value = calculation === ''
            ? sumBy(allAnswersWithScales, 'value')
            : evall(`
          ${answerVars}
          ${sectionVars}

            ${calculation}
        `);
        return value;
    }
    const value = getValue();
    const range = output.ranges.findIndex(r => value >= r.min && value < r.max);
    return {
        range,
        value,
    };
}
export function findAnswerQuestion(questionnaire, answer) {
    const allQuestions = getAllQuestionnaireQuestions(questionnaire, true);
    return allQuestions.find(q => idEq(q._id, answer.question));
}
//# sourceMappingURL=getQuestionnaireOutputs.js.map