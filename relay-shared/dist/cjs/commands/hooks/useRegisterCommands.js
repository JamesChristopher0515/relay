"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRegisterCommands = exports.CommandMenuContext = void 0;
const react_1 = require("react");
exports.CommandMenuContext = (0, react_1.createContext)({
    availableOptions: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    registerOptions: () => { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    unregisterOptions: () => { },
});
let nextId = 0;
function useRegisterCommands(options) {
    const id = (0, react_1.useRef)(++nextId);
    const { registerOptions, unregisterOptions } = (0, react_1.useContext)(exports.CommandMenuContext);
    console.log(id);
    (0, react_1.useEffect)(() => {
        // Register the options when the component mounts
        registerOptions(options, id.current.toString());
        // Unregister the options when the component unmounts
        return () => {
            unregisterOptions(id.current.toString());
        };
    }, [id, options, registerOptions, unregisterOptions]);
}
exports.useRegisterCommands = useRegisterCommands;
//# sourceMappingURL=useRegisterCommands.js.map