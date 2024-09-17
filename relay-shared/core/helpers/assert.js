export default function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
    return condition;
}
//# sourceMappingURL=assert.js.map