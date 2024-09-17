"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnLoginScreen = void 0;
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
const RC_1 = require("../../core/components/RC");
const ClientInvite_machine_1 = __importDefault(require("../machines/ClientInvite.machine"));
const useInputAdapter_1 = __importDefault(require("@mtyk/frontend/forms/hooks/useInputAdapter"));
const RelayIcons_1 = __importDefault(require("../../frontend/icons/RelayIcons"));
function OnLoginScreen() {
    const email = (0, useInputAdapter_1.default)('');
    return (react_1.default.createElement(components_1.Flex, { center: true },
        react_1.default.createElement(components_1.Flex, { center: true, gap: 25 },
            react_1.default.createElement(components_1.Flex, { gap: 5 },
                react_1.default.createElement(components_1.Icon, { icon: RelayIcons_1.default.puzzlePiece, size: "2em", color: "rgba(0, 0, 0, .2)" }),
                react_1.default.createElement(components_1.Txt, { center: true, medium: true }, "Relay")),
            react_1.default.createElement(components_1.Flex, { center: true, gap: 12 },
                react_1.default.createElement(components_1.Txt, { center: true, style: { maxWidth: 300 } }, "Please enter the email or username provided to you by your practitioner"),
                react_1.default.createElement(components_1.Flex, { rc: true, gap: 5 },
                    react_1.default.createElement(RC_1.RC, { name: "Input", placeholder: "Email of username", ...email }),
                    react_1.default.createElement(RC_1.RC, { name: "IconButton", label: "Next", icon: RelayIcons_1.default.next, action: async () => {
                            await ClientInvite_machine_1.default.transitionTo('onSubmitEmail', {
                                email: email.value,
                            });
                        } }))))));
}
exports.OnLoginScreen = OnLoginScreen;
//# sourceMappingURL=OnLoginScreen.js.map