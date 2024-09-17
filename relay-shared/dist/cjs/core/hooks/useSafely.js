"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useSafely(hook) {
    return function (...args) {
        try {
            return hook(...args);
        }
        catch (e) {
            // console.error(e)
            return null;
        }
    };
}
exports.default = useSafely;
//# sourceMappingURL=useSafely.js.map