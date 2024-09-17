import {
  FeelingSelection,
  getFeelingDescription,
} from '../../../feelings/helpers/getAllFeelings'
import { Id } from '../../../RelayTypes'
import { StatCollectionHelper } from './StatCollectionHelper'

const moodCollectionHelper: StatCollectionHelper<
  number,
  { feelings: FeelingSelection[]; checkIns: Id[]; arousal: number }
> = {
  collectionType: 'mood',
  icon: 'feelings',
  valueDomain: { min: 0, max: 1 },
  formatStat(stat) {
    return getFeelingDescription(stat.data.feelings, false)
  },
}

export default moodCollectionHelper
