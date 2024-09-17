import React, { useState, useCallback } from 'react';
import { CommandMenuContext } from '../hooks/useRegisterCommands';
export function CommandMenuProvider(props) {
    const [components, setComponents] = useState({});
    const registerOptions = useCallback((options, componentId) => {
        setComponents((prevComponents) => ({
            ...prevComponents,
            [componentId]: [...(prevComponents[componentId] ?? []), ...options],
        }));
    }, []);
    const unregisterOptions = useCallback((componentId) => {
        setComponents((prevComponents) => {
            const { [componentId]: removed, ...newComponents } = prevComponents;
            return newComponents;
        });
    }, []);
    const availableOptions = Object.values(components).flat();
    return (React.createElement(CommandMenuContext.Provider, { value: { availableOptions, registerOptions, unregisterOptions } }, props.children));
}
export default CommandMenuProvider;
//# sourceMappingURL=CommandMenuProvider.js.map