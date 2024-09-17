export default function getQuestionInfo(questionnaire: any, questionId: string): {
    scale: any;
    question: (import("../../RelayTypes").QuestionnaireQuestion & {
        sectionIndex: number;
    }) | undefined;
};
//# sourceMappingURL=getQuestionInfo.d.ts.map