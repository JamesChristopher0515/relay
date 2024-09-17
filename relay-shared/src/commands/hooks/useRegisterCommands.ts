import { createContext, useContext, useEffect, useId, useRef } from 'react';

export type ActionContext = {
  repl: (command: string) => Promise<string>
}
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

export const CommandMenuContext = createContext<CommandMenuContextType>({
  availableOptions: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerOptions: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unregisterOptions: () => { },
});


let nextId = 0;

export function useRegisterCommands(options: Option[]) {
  const id = useRef(++nextId);
  const { registerOptions, unregisterOptions } = useContext(CommandMenuContext);

  console.log(id)
  useEffect(() => {
    // Register the options when the component mounts
    registerOptions(options, id.current.toString());

    // Unregister the options when the component unmounts
    return () => {
      unregisterOptions(id.current.toString());
    };
  }, [id, options, registerOptions, unregisterOptions]);
}
