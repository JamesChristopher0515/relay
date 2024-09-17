"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const machine2_react_1 = require("@bbuild/machine2-react");
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importStar(require("react"));
const ClientInvite_machine_1 = __importDefault(require("../machines/ClientInvite.machine"));
const InviteSent_1 = require("./InviteSent");
const OnAppReady_1 = require("./OnAppReady");
const OnContinueWithUser_1 = require("./OnContinueWithUser");
const OnEnterPassword_1 = require("./OnEnterPassword");
const OnLoginScreen_1 = require("./OnLoginScreen");
const OnSubmitEmail_1 = require("./OnSubmitEmail");
function ClientLogin(props) {
    const { verify } = props;
    const machine = (0, machine2_react_1.useMachine2)(ClientInvite_machine_1.default);
    const { currentState, isTransitioning, currentContext } = machine;
    (0, react_1.useEffect)(() => {
        if (machine.currentState === 'Idle') {
            if (verify) {
                machine.transitionTo('onContinueWithVerifyToken', { token: verify });
            }
            else {
                machine.transitionTo('onAppReady', {});
            }
        }
    }, []);
    const map = {
        onContinueWithUser: OnContinueWithUser_1.OnContinueWithUser,
        onContinueWithVerifyToken: OnContinueWithUser_1.OnContinueWithUser,
        onSubmitEmail: OnSubmitEmail_1.OnSubmitEmail,
        onSetPassword: OnContinueWithUser_1.OnContinueWithEmail,
        onLoginScreen: OnLoginScreen_1.OnLoginScreen,
        inviteSent: InviteSent_1.InviteSent,
        onEnterPassword: OnEnterPassword_1.OnEnterPassword,
        onAppReady: OnAppReady_1.OnAppReady,
    };
    const Component = map[currentState];
    if (!Component) {
        return react_1.default.createElement(components_1.Txt, null,
            "No component for ",
            currentState);
    }
    return react_1.default.createElement(Component, null);
}
exports.default = ClientLogin;
//# sourceMappingURL=ClientLogin.js.map