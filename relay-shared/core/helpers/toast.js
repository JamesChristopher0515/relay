import { isNative } from '@mtyk/frontend/core/helpers';
export function toast(type, ...args) {
    if (isNative) {
        const Toast = require('react-native-root-toast').default;
        Toast.show(args.join(' '));
    }
    else {
        // web toast
    }
}
export default {
    error: (...args) => toast('error', ...args),
    warn: (...args) => toast('warn', ...args),
    log: (...args) => toast('log', ...args),
};
//# sourceMappingURL=toast.js.map