export default function machineReducer(fn) {
    return (async (arg, handle) => {
        return fn(handle.currentState.context, arg, handle);
    });
}
//# sourceMappingURL=machineReducer.js.map