import { FeelingSelection } from '../../../feelings/helpers/getAllFeelings';
import { Id } from '../../../RelayTypes';
import { StatCollectionHelper } from './StatCollectionHelper';
declare const moodCollectionHelper: StatCollectionHelper<number, {
    feelings: FeelingSelection[];
    checkIns: Id[];
    arousal: number;
}>;
export default moodCollectionHelper;
//# sourceMappingURL=moodCollectionHelper.d.ts.map