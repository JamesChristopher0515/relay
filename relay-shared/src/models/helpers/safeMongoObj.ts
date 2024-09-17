/**
 * Using mongo documents objects in certain cases on backend (e.g. spreading
 * values) can have unexpected results. This turns mongo objects into standard
 * ones if necessary on backend
 */
export default function safeMongoObj(obj: object) {
  if (obj && typeof obj === 'object' && typeof obj.toJSON === 'function') {
    return obj.toJSON()
  }
  return obj
}
