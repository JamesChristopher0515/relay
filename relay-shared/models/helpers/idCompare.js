/**
 * Compare ids in a safe way on backend and frontend, regardless
 * of whether ObjectId type or string
 */
export default function idCompare(a, b) {
    return a.toString() === b.toString();
}
//# sourceMappingURL=idCompare.js.map