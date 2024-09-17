"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMachine = exports.useObservable = void 0;
const react_1 = require("react");
function useObservable(observable$, initialValue) {
    const [value, update] = (0, react_1.useState)(initialValue);
    (0, react_1.useLayoutEffect)(function () {
        const s = observable$.subscribe(update);
        return () => s.unsubscribe();
    }, [observable$]);
    return value;
}
exports.useObservable = useObservable;
function useMachine(machine) {
    const asObservable = useObservable(machine.state, machine._state);
    const transitioning = useObservable(machine.isTransitioning, false);
    // If there's an error, pretend the state is the state before the error occured
    // and return the error separately for UX purposes
    const error = asObservable.context.error?.error;
    return {
        ...asObservable,
        ...asObservable.context,
        transition: (newStateKey, data) => machine.transition(newStateKey, data),
        is: (stateQ) => asObservable.state === stateQ,
        error,
        isError: !!error,
        transitioning,
    };
}
exports.useMachine = useMachine;
exports.default = useMachine;
//# sourceMappingURL=useMachine.js.map