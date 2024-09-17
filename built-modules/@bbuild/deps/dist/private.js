import { mapValues } from '@bbuild/dash';
export const serverOnly = (deps) => {
    return mapValues(deps, (dep) => {
        return {
            ...dep,
            private: true,
        };
    });
};
//# sourceMappingURL=private.js.map