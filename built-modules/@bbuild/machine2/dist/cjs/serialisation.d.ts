import { Opts } from "./Opts";
import { StateContext, StateMachine, StateMachineTransitions } from './StateMachineTransitions';
export type SerializedStateMachine<TArgs, TState extends string, TGlobalState> = {
    currentState: string;
    context: StateContext;
    globalState: TGlobalState;
};
export declare function serializeStateMachine<TArgs, TState extends string, TGlobalState>(stateMachine: StateMachine<TArgs, TState, TGlobalState>): SerializedStateMachine<TArgs, TState, TGlobalState>;
export declare function deserializeStateMachine<TArgs, TState extends string, TGlobalState>(transitions: StateMachineTransitions<TArgs, TState, TGlobalState>, serializedStateMachine: SerializedStateMachine<TArgs, TState, TGlobalState>, opts: Opts<TGlobalState>): StateMachine<TArgs, TState, TGlobalState>;
//# sourceMappingURL=serialisation.d.ts.map