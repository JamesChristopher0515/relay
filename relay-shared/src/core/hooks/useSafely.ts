export default function useSafely(hook) {
  return function (...args: any) {
    try {
      return hook(...args)
    } catch (e) {
      // console.error(e)
      return null
    }
  }
}
