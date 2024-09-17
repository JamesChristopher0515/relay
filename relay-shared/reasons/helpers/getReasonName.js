import { capitalize } from 'lodash';
export default function getReasonName(reason) {
    if (reason.custom) {
        return reason.custom || 'Custom';
    }
    return capitalize(reason.name);
}
//# sourceMappingURL=getReasonName.js.map