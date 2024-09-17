/**
 * Compare ids in a safe way on backend and frontend, regardless
 * of whether ObjectId type or string
 */
export default function idEq(a, b) {
    return String(a) === String(b);
}
export function findId(arr, id) {
    const index = arr.findIndex(d => idEq(d._id, id));
    return [arr[index], index];
}
//# sourceMappingURL=idEq.js.map