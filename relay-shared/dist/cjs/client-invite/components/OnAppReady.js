"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnAppReady = void 0;
const machine2_react_1 = require("@bbuild/machine2-react");
const components_1 = require("@mtyk/frontend/core/components");
const useInputAdapter_1 = __importDefault(require("@mtyk/frontend/forms/hooks/useInputAdapter"));
const react_1 = __importDefault(require("react"));
const ClientInvite_machine_1 = __importDefault(require("../machines/ClientInvite.machine"));
const RC_1 = require("../../core/components/RC");
function OnAppReady() {
    const machine = (0, machine2_react_1.useMachine2)(ClientInvite_machine_1.default);
    const { currentState, isTransitioning, currentContext } = machine;
    const { tokens, user } = currentContext;
    const email = (0, useInputAdapter_1.default)('');
    if (user) {
        return (react_1.default.createElement(components_1.Flex, { center: true, gap: 10 },
            react_1.default.createElement(components_1.Txt, { center: true }, "Welcome to Relay"),
            react_1.default.createElement(RC_1.RC, { name: "Button", label: `Continue as ${user.name}`, action: async () => {
                    await machine.transitionTo('onContinueWithUser', {
                        tokens,
                        user,
                    });
                } }),
            react_1.default.createElement(RC_1.RC, { name: "Button", label: "Login with another account", action: async () => {
                    await machine.transitionTo('onAppReady', {});
                } })));
    }
    else {
        return null;
    }
}
exports.OnAppReady = OnAppReady;
//# sourceMappingURL=OnAppReady.js.map