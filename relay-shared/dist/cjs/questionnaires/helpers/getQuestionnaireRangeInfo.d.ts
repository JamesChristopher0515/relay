import { Questionnaire } from '../../RelayTypes';
export default function getQuestionnaireRangeInfo({ questionnaire, output, }: {
    questionnaire: Questionnaire;
    output: number;
}): {
    totalRange: number;
    minRange: {
        name: string;
        min: number;
        max: number;
        relay: number;
        notify: boolean;
    };
    maxRange: {
        name: string;
        min: number;
        max: number;
        relay: number;
        notify: boolean;
    };
};
//# sourceMappingURL=getQuestionnaireRangeInfo.d.ts.map