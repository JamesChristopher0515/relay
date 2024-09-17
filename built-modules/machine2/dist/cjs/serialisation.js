"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeStateMachine = exports.serializeStateMachine = void 0;
const createStateMachine_1 = require("./createStateMachine");
function serializeStateMachine(stateMachine) {
    return {
        currentState: stateMachine.currentState,
        context: stateMachine.currentContext,
        globalState: stateMachine.globalState,
    };
}
exports.serializeStateMachine = serializeStateMachine;
function deserializeStateMachine(transitions, serializedStateMachine, opts) {
    const { currentState, context, globalState } = serializedStateMachine;
    const stateMachine = (0, createStateMachine_1.createStateMachine)(transitions, {
        initialState: currentState,
        initialContext: context,
        globalState,
        ...opts,
    });
    return stateMachine;
}
exports.deserializeStateMachine = deserializeStateMachine;
//# sourceMappingURL=serialisation.js.map