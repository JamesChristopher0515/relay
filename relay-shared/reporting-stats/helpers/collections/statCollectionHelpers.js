import journeyCollectionHelper from './journeyCollectionHelper';
import moodCollectionHelper from './moodCollectionHelper';
import questionnaireResultCollectionHelper from './questionnaireResultCollectionHelper';
import invariant from 'tiny-invariant';
import healthCollectionHelper from './healthCollectionHelper';
const statCollectionHelpers = {
    mood: moodCollectionHelper,
    'questionnaire-result': questionnaireResultCollectionHelper,
    journey: journeyCollectionHelper,
    health: healthCollectionHelper,
};
export function getStatCollectionHelper(collectionType) {
    const helper = statCollectionHelpers[collectionType];
    invariant(helper, `getStatCollectionHelper: no helper for collection type ${collectionType}`);
    return helper;
}
export default statCollectionHelpers;
//# sourceMappingURL=statCollectionHelpers.js.map