import { Id } from '../../../RelayTypes'
import { StatCollectionHelper } from './StatCollectionHelper'

const questionnaireResultCollectionHelper: StatCollectionHelper<
  number,
  { questionnaireResult: Id }
> = {
  collectionType: 'questionnaire-result',
  icon: 'result',
}

export default questionnaireResultCollectionHelper
