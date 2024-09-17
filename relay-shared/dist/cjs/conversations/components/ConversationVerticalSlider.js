"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const VerticalSlider_1 = __importDefault(require("core/components/forms/VerticalSlider"));
const RelayButton_1 = __importDefault(require("core/components/RelayButton"));
const lodash_1 = require("lodash");
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importStar(require("react"));
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const mapQuestionAnswers_1 = __importDefault(require("../../questionnaires/helpers/mapQuestionAnswers"));
function ConversationVerticalSlider(props) {
    const { questionnaire, question, onNext } = props;
    const [selectedAnswerIndex, setSelectedAnswerIndex] = (0, react_1.useState)(-1);
    const sliderRef = (0, react_1.useRef)(null);
    const totalAnswers = (0, mapQuestionAnswers_1.default)(questionnaire, question).length;
    // We only support up to 10 answers for now, has to be a hard limit as the number of hook calls can't change dynamically
    const animatedTextStyles = (0, lodash_1.times)(10, i => {
        const iScaled = i / totalAnswers;
        return (0, react_native_reanimated_1.useAnimatedStyle)(() => {
            const { current: slider } = sliderRef;
            const knobValue = slider?.knobValue.value ?? 0;
            const proximity = Math.abs(knobValue - iScaled);
            return {
                transform: [{ scale: 1 + Math.max(proximity, 0) * 0.1 }],
                opacity: 0.6 * proximity,
            };
        }, [sliderRef.current, totalAnswers]);
    });
    return (react_1.default.createElement(components_1.Flex, { style: { paddingVertical: 15 } },
        react_1.default.createElement(components_1.Flex, { row: true },
            react_1.default.createElement(components_1.Flex, { gap: 15, columnCenter: true, style: { marginBottom: 25 } }, (0, mapQuestionAnswers_1.default)(questionnaire, question).map((info, index) => {
                return (react_1.default.createElement(react_native_reanimated_1.default.View, { key: index, style: animatedTextStyles[index] ?? {} },
                    react_1.default.createElement(components_1.Txt, { action: () => {
                            setSelectedAnswerIndex(index);
                        } })));
            })),
            react_1.default.createElement(VerticalSlider_1.default, { ref: sliderRef })),
        react_1.default.createElement(RelayButton_1.default, { action: onNext, icon: free_solid_svg_icons_1.faChevronRight, iconOnRight: true, style: { alignSelf: 'flex-end' } }, "Next")));
}
exports.default = ConversationVerticalSlider;
//# sourceMappingURL=ConversationVerticalSlider.js.map