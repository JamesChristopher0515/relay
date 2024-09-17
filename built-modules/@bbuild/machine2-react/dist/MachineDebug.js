import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMachine2 } from '.';
export default function MachineDebug(props) {
    const machine = useMachine2(props.machine);
    return _jsxs("div", { style: {
            whiteSpace: 'pre-wrap'
        }, children: ["currentstate: ", machine.currentState, _jsx("br", {}), "currentcontext: ", JSON.stringify(machine.currentContext, null, 2), _jsx("br", {}), "lasterror: ", JSON.stringify(machine.lastError, null, 2), _jsx("br", {})] });
}
//# sourceMappingURL=MachineDebug.js.map