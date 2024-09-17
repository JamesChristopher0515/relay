"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnContinueWithVerifyToken = exports.OnContinueWithUser = exports.OnContinueWithEmail = void 0;
const components_1 = require("@mtyk/frontend/core/components");
const useInputAdapter_1 = __importDefault(require("@mtyk/frontend/forms/hooks/useInputAdapter"));
const react_1 = __importDefault(require("react"));
const ClientInvite_machine_1 = __importDefault(require("../machines/ClientInvite.machine"));
const RC_1 = require("../../core/components/RC");
function OnContinueWithEmail() {
    const password = (0, useInputAdapter_1.default)('');
    const confirmPassword = (0, useInputAdapter_1.default)('');
    return (react_1.default.createElement(components_1.Flex, null,
        react_1.default.createElement(components_1.Txt, null, "Setup a strong password"),
        react_1.default.createElement(components_1.Txt, null, "Make sure it\u2019s at least 8 characters long and contains a mixture of uppercase and lowercase letters."),
        react_1.default.createElement(RC_1.RC, { name: "Input", type: "password", placeholder: "Password", ...password }),
        react_1.default.createElement(RC_1.RC, { name: "Input", type: "password", placeholder: "Confirm Password", ...confirmPassword }),
        react_1.default.createElement(RC_1.RC, { name: "PasswordMeter", password: password }),
        react_1.default.createElement(RC_1.RC, { name: "Button", label: "Next", action: async () => {
                await ClientInvite_machine_1.default.transitionTo('onSetPassword', {
                    password: password.value,
                    confirmPassword: confirmPassword.value,
                    verifyToken: ClientInvite_machine_1.default.currentContext.token,
                });
            } })));
}
exports.OnContinueWithEmail = OnContinueWithEmail;
exports.OnContinueWithUser = OnContinueWithEmail;
exports.OnContinueWithVerifyToken = OnContinueWithEmail;
//# sourceMappingURL=OnContinueWithUser.js.map