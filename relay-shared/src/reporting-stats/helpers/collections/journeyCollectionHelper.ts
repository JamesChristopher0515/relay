import { Id } from '../../../RelayTypes'
import { StatCollectionHelper } from './StatCollectionHelper'

const journeyCollectionHelper: StatCollectionHelper<
  number,
  { clientMilestoneStop: Id }
> = {
  collectionType: 'journey',
  icon: 'journey',
}

export default journeyCollectionHelper
