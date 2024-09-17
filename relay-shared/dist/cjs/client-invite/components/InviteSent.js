"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteSent = void 0;
const components_1 = require("@mtyk/frontend/core/components");
const deps_1 = require("@bbuild/deps");
const react_1 = __importDefault(require("react"));
const RC_1 = require("../../core/components/RC");
const Backable_1 = __importDefault(require("./Backable"));
const clientAppDeps_1 = require("../../core/helpers/clientAppDeps");
const RelayIcons_1 = __importDefault(require("../../frontend/icons/RelayIcons"));
function InviteSent() {
    return (react_1.default.createElement(Backable_1.default, null,
        react_1.default.createElement(components_1.Flex, { gap: 18, center: true },
            react_1.default.createElement(components_1.Icon, { icon: RelayIcons_1.default.envelope, size: "3em" }),
            react_1.default.createElement(components_1.Txt, { size: 18, center: true }, "We\u2019ve sent another invitation to your email."),
            react_1.default.createElement(components_1.Txt, { size: 16, center: true },
                "Please follow the instructions within to continue.",
                ' '),
            react_1.default.createElement(RC_1.RC, { name: "Button", action: async () => {
                    const { LinkingDep: Linking } = await deps_1.globalDepContext.provideDeps({
                        LinkingDep: clientAppDeps_1.LinkingDep,
                    });
                    Linking.openURL('message://');
                } }, "Check Email"))));
}
exports.InviteSent = InviteSent;
//# sourceMappingURL=InviteSent.js.map