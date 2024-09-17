import { isObjectLike } from 'lodash';
export default function mongoSpreadSafe(obj) {
    if (isObjectLike(obj) && typeof obj.toJSON === 'function') {
        return obj.toJSON();
    }
    return obj;
}
//# sourceMappingURL=mongoSpreadSafe.js.map