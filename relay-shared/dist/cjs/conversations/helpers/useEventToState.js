"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useEventToState(obj, event, listener, defaultValue) {
    const [state, setState] = (0, react_1.useState)(defaultValue);
    (0, react_1.useEffect)(() => {
        return obj.listen(event, (event, data) => {
            setState(listener?.(data) ?? data);
        });
    }, []);
    return [state];
}
exports.default = useEventToState;
//# sourceMappingURL=useEventToState.js.map