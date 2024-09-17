export default function assert(
  condition: boolean,
  message: string
): condition is true {
  if (!condition) {
    throw new Error(message)
  }
  return condition
}
