"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const RelayIcons_1 = __importDefault(require("../frontend/icons/RelayIcons"));
const BasicConversation_1 = __importDefault(require("./BasicConversation"));
const MotivationConversation_1 = __importDefault(require("./MotivationConversation"));
const QuestionnaireConversation_1 = __importDefault(require("./QuestionnaireConversation"));
const RelayConversationManager_1 = __importDefault(require("./RelayConversationManager"));
const WellbeingConversation_1 = __importDefault(require("./WellbeingConversation"));
const wrapResponderWithIds_1 = require("./wrapResponderWithIds");
class OnboardingConversationManager extends RelayConversationManager_1.default {
    assignedQuestionnaireTodos;
    constructor(assignedQuestionnaireTodos, axios) {
        super({ conversations: [] });
        this.assignedQuestionnaireTodos = assignedQuestionnaireTodos;
        const questionnaireConvos = assignedQuestionnaireTodos.reduce((prev, todo) => {
            const { questionnaire } = todo;
            // Place wellbeing/motivation at the start of the array
            if (questionnaire?.id === 'wellbeing') {
                return [
                    new WellbeingConversation_1.default({
                        axios,
                        wellbeingQuestionnaire: questionnaire,
                        todo: todo,
                    }),
                    ...prev,
                ];
            }
            else if (questionnaire?.id === 'motivation') {
                return [
                    new MotivationConversation_1.default({
                        axios,
                        motivationQuestionnaire: questionnaire,
                        todo: todo,
                    }),
                    ...prev,
                ];
            }
            // Put other questionnaires at the end
            return [...prev, new QuestionnaireConversation_1.default([todo], axios)];
        }, []);
        if (questionnaireConvos.length > 2) {
            questionnaireConvos.splice(2, 0, new BasicConversation_1.default({
                icon: free_solid_svg_icons_1.faInfoCircle,
                name: `Additional resources`,
                responders: {
                    intro: (response, opts) => opts.conversationManager.respondObj({
                        text: `Your practitioner has asked if you can complete a few more resources before you continue`,
                        finish: true,
                    }),
                },
            }));
        }
        for (const conversation of questionnaireConvos) {
            this.addConversation(conversation);
        }
        this.addResponders({
            ...wrapResponderWithIds_1.conversationUtils.createTextResponders('intro', [
                'Hello!',
                `We're about to take you through our onboarding process.`,
                `This usually takes around 20 minutes and the process has been designed to gain a meaningful understanding of your current welfare position.`,
            ], wrapResponderWithIds_1.conversationUtils.okButton('getStarted')),
            ...wrapResponderWithIds_1.conversationUtils.createTextResponders('getStarted', [
                `Okay, let's get started. The first step is to look at your Wellbeing.`,
            ], wrapResponderWithIds_1.conversationUtils.okButton(() => ({
                finish: true,
            }))),
        });
        this.addConversation(new BasicConversation_1.default({
            name: 'onboarding-finished',
            icon: RelayIcons_1.default.puzzlePiece,
            responders: {
                ...wrapResponderWithIds_1.conversationUtils.createTextResponders('onboarding-finished', [
                    `Okay, all done! We'll take you to the settings page where you can choose your daily check-in time and more.`,
                    `We hope you enjoy using Relay!`,
                ], () => ({ finish: true })),
            },
        }));
        // this.initialResponder = 'intro'
        this.initialResponder = 'motivationImportance';
    }
}
exports.default = OnboardingConversationManager;
//# sourceMappingURL=OnboardingConversation.js.map