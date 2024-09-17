"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
const ClientInvite_machine_1 = __importDefault(require("../machines/ClientInvite.machine"));
const RC_1 = require("../../core/components/RC");
const RelayIcons_1 = __importDefault(require("../../frontend/icons/RelayIcons"));
function Backable({ children }) {
    return (react_1.default.createElement(components_1.Flex, null,
        react_1.default.createElement(RC_1.RC, { name: "TextButton", icon: RelayIcons_1.default.back, action: async () => {
                await ClientInvite_machine_1.default.transitionTo('onLoginScreen');
            } }, "Back"),
        children));
}
exports.default = Backable;
//# sourceMappingURL=Backable.js.map