import { useGetQuestionnaireQuery } from 'relay-shared/frontend/api/hooks/useApi'

export default function openQuestionnaire() {
  return ({ questionnaire }: { questionnaire: string }) => {
    const { data: questionnaireDoc } = useGetQuestionnaireQuery(questionnaire)
    // TODO
  }
}
