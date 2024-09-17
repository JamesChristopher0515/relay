import { createContext, useContext, useEffect, useRef } from 'react';
export const CommandMenuContext = createContext({
    availableOptions: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    registerOptions: () => { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    unregisterOptions: () => { },
});
let nextId = 0;
export function useRegisterCommands(options) {
    const id = useRef(++nextId);
    const { registerOptions, unregisterOptions } = useContext(CommandMenuContext);
    console.log(id);
    useEffect(() => {
        // Register the options when the component mounts
        registerOptions(options, id.current.toString());
        // Unregister the options when the component unmounts
        return () => {
            unregisterOptions(id.current.toString());
        };
    }, [id, options, registerOptions, unregisterOptions]);
}
//# sourceMappingURL=useRegisterCommands.js.map