export default function useSafely(hook) {
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
//# sourceMappingURL=useSafely.js.map