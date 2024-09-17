import { useState, useLayoutEffect } from 'react';
function useObservable(observable$, initialValue) {
    const [value, update] = useState(initialValue);
    useLayoutEffect(function () {
        const s = observable$.subscribe(update);
        return () => s.unsubscribe();
    }, [observable$]);
    return value;
}
export function useMachine2(machine) {
    const _out = useObservable(machine.stateChanges$, machine);
    return machine;
}
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