/// <reference types="react" />
export type ActionContext = {
    repl: (command: string) => Promise<string>;
};
export type Option = {
    label: string;
    action: (actionContext: ActionContext) => Promise<Result>;
};
export type Result = {
    element: React.ReactNode;
};
export type CommandMenuContextType = {
    availableOptions: Option[];
    registerOptions: (options: Option[], componentId: string) => void;
    unregisterOptions: (componentId: string) => void;
};
export declare const CommandMenuContext: import("react").Context<CommandMenuContextType>;
export declare function useRegisterCommands(options: Option[]): void;
//# sourceMappingURL=useRegisterCommands.d.ts.map