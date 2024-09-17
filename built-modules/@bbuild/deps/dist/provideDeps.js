import { globalDepContext } from './createDepContext';
export const provideDeps = (deps, extra, context = globalDepContext) => {
    const provided = context.provide(deps, extra);
    return provided;
};
export const provideDepsSync = (deps, extra, context = globalDepContext) => {
    const provided = context.provideSync(deps, extra);
    return provided;
};
//# sourceMappingURL=provideDeps.js.map