"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAnswerQuestion = exports.getQuestionnaireOutput = exports.getQuestionnaireScaleMax = void 0;
const lodash_1 = require("lodash");
const idEq_1 = __importDefault(require("../../models/helpers/idEq"));
const safeMongoObj_1 = __importDefault(require("../../models/helpers/safeMongoObj"));
const calculateMotivationScore_1 = __importDefault(require("./calculateMotivationScore"));
const getAllQuestionnaireQuestions_1 = __importDefault(require("./getAllQuestionnaireQuestions"));
function nonEmptyStr(str) {
    return typeof str === 'string' && str.trim().length > 0;
}
function getQuestionnaireResultOutputs(answers, questionnaire, evall) {
    const outOutputs = [];
    for (const output of questionnaire.outputs) {
        outOutputs.push(getQuestionnaireOutput(answers, questionnaire, output, evall));
    }
    return outOutputs;
}
exports.default = getQuestionnaireResultOutputs;
function getQuestionnaireScaleMax(scale) {
    return scale.elements.reduce((max, el) => Math.max(max, el.value), 0);
}
exports.getQuestionnaireScaleMax = getQuestionnaireScaleMax;
function getQuestionnaireOutput(answers, questionnaire, output, evall) {
    function getValue() {
        if (questionnaire.id === 'motivation') {
            return (0, calculateMotivationScore_1.default)(questionnaire, answers);
        }
        const { calculation } = output;
        const allAnswersWithScales = answers.map(answer => {
            const question = findAnswerQuestion(questionnaire, answer);
            const { sectionIndex } = question;
            const scale = questionnaire.scales[question.scale];
            return {
                ...(0, safeMongoObj_1.default)(answer),
                scale,
                scaleValue: scale[answer.value],
                sectionIndex,
                scaleElement: scale.elements.find(el => el.value === answer.value),
            };
        });
        const sectionScores = questionnaire.sections.map((section, i) => {
            return (0, lodash_1.sumBy)(allAnswersWithScales.filter(a => a.sectionIndex === i), 'scaleValue');
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
            ? (0, lodash_1.sumBy)(allAnswersWithScales, 'value')
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
exports.getQuestionnaireOutput = getQuestionnaireOutput;
function findAnswerQuestion(questionnaire, answer) {
    const allQuestions = (0, getAllQuestionnaireQuestions_1.default)(questionnaire, true);
    return allQuestions.find(q => (0, idEq_1.default)(q._id, answer.question));
}
exports.findAnswerQuestion = findAnswerQuestion;
//# sourceMappingURL=getQuestionnaireOutputs.js.map