import { Opts } from "./Opts";
import { StateMachine, StateMachineTransitions } from "./StateMachineTransitions";
export declare function createStateMachine<TArgs, TState extends string, TGlobalState>(transitions: StateMachineTransitions<TArgs, TState, TGlobalState>, opts: Opts<TGlobalState>): StateMachine<TArgs, TState, TGlobalState>;
//# sourceMappingURL=createStateMachine.d.ts.map