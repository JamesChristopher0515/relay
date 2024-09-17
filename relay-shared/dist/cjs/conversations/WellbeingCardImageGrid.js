"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WellbeingCardImageGrid = void 0;
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
const Actionable_1 = __importDefault(require("../core/components/Actionable"));
const mapQuestionAnswers_1 = __importDefault(require("../questionnaires/helpers/mapQuestionAnswers"));
const WellbeingFeeling_1 = __importDefault(require("./components/WellbeingFeeling"));
function WellbeingCardImageGrid({ question, questionnaire, onConfirmAnswer, }) {
    return (react_1.default.createElement(components_1.Flex, { center: true, fw: true, style: {} },
        react_1.default.createElement(components_1.Flex, { row: true, style: { flexWrap: 'wrap', paddingVertical: 25 }, grow: true }, (0, mapQuestionAnswers_1.default)(questionnaire, question)
            .slice(1)
            .map((answer, i) => {
            return (react_1.default.createElement(Actionable_1.default, { action: () => onConfirmAnswer(i + 1), key: i, style: {
                    width: '50%',
                    alignItems: 'center',
                    height: 130,
                    flexGrow: 1,
                    justifyContent: 'center',
                } },
                react_1.default.createElement(components_1.Flex, { center: true, gap: 7 },
                    react_1.default.createElement(WellbeingFeeling_1.default, { index: i + 1 }),
                    react_1.default.createElement(components_1.Txt, { semibold: true, center: true }, answer.text))));
        })),
        react_1.default.createElement(Actionable_1.default, { action: () => onConfirmAnswer(0) },
            react_1.default.createElement(components_1.Txt, { color: 'rgba(0, 0, 0, 0.7)' }, "This is not important to me"))));
}
exports.WellbeingCardImageGrid = WellbeingCardImageGrid;
//# sourceMappingURL=WellbeingCardImageGrid.js.map