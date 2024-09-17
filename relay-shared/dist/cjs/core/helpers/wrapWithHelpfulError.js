"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wrapWithHelpfulErrorAsync(fn, name = fn.name) {
    return async function (...args) {
        try {
            const result = await fn(...args);
            return result;
        }
        catch (e) {
            console.log(`The above error occurred in ${name}()`);
            throw e;
        }
    };
}
exports.default = wrapWithHelpfulErrorAsync;
//# sourceMappingURL=wrapWithHelpfulError.js.map