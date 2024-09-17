export default function isObjectId(value: any): value is string {
  return typeof value === 'string' && value.length === 24
}
