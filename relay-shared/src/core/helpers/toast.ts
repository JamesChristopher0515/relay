import { isNative } from '@mtyk/frontend/core/helpers'

export function toast(type: string, ...args: any[]) {
  if (isNative) {
    const Toast = require('react-native-root-toast').default
    Toast.show(args.join(' '))
  } else {
    // web toast
  }
}

export default {
  error: (...args: any[]) => toast('error', ...args),
  warn: (...args: any[]) => toast('warn', ...args),
  log: (...args: any[]) => toast('log', ...args),
}
