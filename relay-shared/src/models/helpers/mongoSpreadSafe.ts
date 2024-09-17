import { isObjectLike } from 'lodash'
export default function mongoSpreadSafe(obj: object) {
  if (isObjectLike(obj) && typeof obj.toJSON === 'function') {
    return obj.toJSON()
  }
  return obj
}
