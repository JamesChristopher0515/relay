import { ContextType } from 'react'
import { QuestionnaireContext } from 'questionnaires/contexts/QuestionnaireContext'

export const questionnaireColorSchemes = {
  green: {
    text: '#2D725D',
    background: '#CBECE2',
    textButton: '#26AB81',
    buttons: ['#58CCA8', '#72CBAF', '#8BB7A9', '#7BA094'],
  },
  blue: {
    text: '#166267',
    background: '#CBEAEC',
    textButton: '#386A71',
    buttons: ['#58BECC', '#6DBBC6', '#8BACB7', '#7B97A0'],
  },
  white: {
    text: '#166267',
    background: 'white',
    textButton: '#26AB81',
    buttons: ['#58CCA8', '#72CBAF', '#8BB7A9', '#7BA094'],
  },
}

export default function getQuestionnaireColorScheme(
  context: ContextType<typeof QuestionnaireContext>
) {
  return [questionnaireColorSchemes.blue, questionnaireColorSchemes.green][
    context.questionnaire.name.length % 2
  ]
}
