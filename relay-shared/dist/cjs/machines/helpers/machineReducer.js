"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function machineReducer(fn) {
    return (async (arg, handle) => {
        return fn(handle.currentState.context, arg, handle);
    });
}
exports.default = machineReducer;
//# sourceMappingURL=machineReducer.js.map