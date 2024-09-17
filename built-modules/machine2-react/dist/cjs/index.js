"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMachine2 = void 0;
const react_1 = require("react");
function useObservable(observable$, initialValue) {
    const [value, update] = (0, react_1.useState)(initialValue);
    (0, react_1.useLayoutEffect)(function () {
        const s = observable$.subscribe(update);
        return () => s.unsubscribe();
    }, [observable$]);
    return value;
}
function useMachine2(machine) {
    const _out = useObservable(machine.stateChanges$, machine);
    return machine;
}
exports.useMachine2 = useMachine2;
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["machine2-react"]) {
    console.warn(`Duplicate module machine2-react imported. This can lead to bugs.`);
}
globalStore["machine2-react"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map