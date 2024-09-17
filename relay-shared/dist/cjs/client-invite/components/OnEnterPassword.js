"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnEnterPassword = void 0;
const machine2_react_1 = require("@bbuild/machine2-react");
const Backable_1 = __importDefault(require("./Backable"));
const components_1 = require("@mtyk/frontend/core/components");
const useInputAdapter_1 = __importDefault(require("@mtyk/frontend/forms/hooks/useInputAdapter"));
const react_1 = __importDefault(require("react"));
const ClientInvite_machine_1 = __importDefault(require("../machines/ClientInvite.machine"));
const RC_1 = require("../../core/components/RC");
function OnEnterPassword() {
    const { currentContext } = (0, machine2_react_1.useMachine2)(ClientInvite_machine_1.default);
    const password = (0, useInputAdapter_1.default)('');
    return (react_1.default.createElement(Backable_1.default, null,
        react_1.default.createElement(components_1.Flex, null,
            react_1.default.createElement(components_1.Txt, null, "Relay"),
            react_1.default.createElement(components_1.Txt, null, "Please enter the email or username provided to you by your practitioner"),
            react_1.default.createElement(components_1.Flex, { rc: true, gap: 5 },
                react_1.default.createElement(RC_1.RC, { name: "Input", type: "password", placeholder: "Password", ...password }),
                react_1.default.createElement(RC_1.RC, { name: "IconButton", label: "Next", action: async () => {
                        await ClientInvite_machine_1.default.transitionTo('onLogin', {
                            email: currentContext.email,
                            password,
                        });
                    } })))));
}
exports.OnEnterPassword = OnEnterPassword;
//# sourceMappingURL=OnEnterPassword.js.map