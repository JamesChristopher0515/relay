"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverOnly = void 0;
const dash_1 = require('@bbuild/dash');
const serverOnly = (deps) => {
    return (0, dash_1.mapValues)(deps, (dep) => {
        return {
            ...dep,
            private: true,
        };
    });
};
exports.serverOnly = serverOnly;
//# sourceMappingURL=private.js.map