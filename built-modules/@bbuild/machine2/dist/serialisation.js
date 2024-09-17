import { createStateMachine } from "./createStateMachine";
export function serializeStateMachine(stateMachine) {
    return {
        currentState: stateMachine.currentState,
        context: stateMachine.currentContext,
        globalState: stateMachine.globalState,
    };
}
export function deserializeStateMachine(transitions, serializedStateMachine, opts) {
    const { currentState, context, globalState } = serializedStateMachine;
    const stateMachine = createStateMachine(transitions, {
        initialState: currentState,
        initialContext: context,
        globalState,
        ...opts,
    });
    return stateMachine;
}
//# sourceMappingURL=serialisation.js.map