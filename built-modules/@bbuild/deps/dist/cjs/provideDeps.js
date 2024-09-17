"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideDepsSync = exports.provideDeps = void 0;
const createDepContext_1 = require("./createDepContext");
const provideDeps = (deps, extra, context = createDepContext_1.globalDepContext) => {
    const provided = context.provide(deps, extra);
    return provided;
};
exports.provideDeps = provideDeps;
const provideDepsSync = (deps, extra, context = createDepContext_1.globalDepContext) => {
    const provided = context.provideSync(deps, extra);
    return provided;
};
exports.provideDepsSync = provideDepsSync;
//# sourceMappingURL=provideDeps.js.map