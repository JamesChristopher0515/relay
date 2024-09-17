export default function wrapWithHelpfulErrorAsync(fn, name = fn.name) {
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
//# sourceMappingURL=wrapWithHelpfulError.js.map