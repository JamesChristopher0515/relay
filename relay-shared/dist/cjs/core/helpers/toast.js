"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toast = void 0;
const helpers_1 = require("@mtyk/frontend/core/helpers");
function toast(type, ...args) {
    if (helpers_1.isNative) {
        const Toast = require('react-native-root-toast').default;
        Toast.show(args.join(' '));
    }
    else {
        // web toast
    }
}
exports.toast = toast;
exports.default = {
    error: (...args) => toast('error', ...args),
    warn: (...args) => toast('warn', ...args),
    log: (...args) => toast('log', ...args),
};
//# sourceMappingURL=toast.js.map