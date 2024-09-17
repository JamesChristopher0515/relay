export default function wrapWithHelpfulErrorAsync<
  F extends (...args: any[]) => any
>(fn: F, name = fn.name) {
  return async function (...args: any[]) {
    try {
      const result = await fn(...args)
      return result
    } catch (e) {
      console.log(`The above error occurred in ${name}()`)
      throw e
    }
  }
}
