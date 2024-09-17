"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const _1 = require(".");
function MachineDebug(props) {
    const machine = (0, _1.useMachine2)(props.machine);
    return (0, jsx_runtime_1.jsxs)("div", { style: {
            whiteSpace: 'pre-wrap'
        }, children: ["currentstate: ", machine.currentState, (0, jsx_runtime_1.jsx)("br", {}), "currentcontext: ", JSON.stringify(machine.currentContext, null, 2), (0, jsx_runtime_1.jsx)("br", {}), "lasterror: ", JSON.stringify(machine.lastError, null, 2), (0, jsx_runtime_1.jsx)("br", {})] });
}
exports.default = MachineDebug;
//# sourceMappingURL=MachineDebug.js.map