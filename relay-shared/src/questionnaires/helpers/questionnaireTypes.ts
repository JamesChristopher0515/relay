import { Questionnaire } from '../../RelayTypes'

export type QuestionnaireForCalculation = Pick<
    Questionnaire,
    'id' | 'outputs' | 'sections' | 'scales'
>
