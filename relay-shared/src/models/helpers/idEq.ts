/**
 * Compare ids in a safe way on backend and frontend, regardless
 * of whether ObjectId type or string
 */
export default function idEq(a: any, b: any) {
  return String(a) === String(b)
}

export function findId<D extends { _id: any }>(arr: D[], id: any) {
  const index = arr.findIndex(d => idEq(d._id, id))
  return [arr[index], index] as [D, number]
}
