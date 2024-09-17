"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePackageJSON = void 0;
const dash_1 = require('@bbuild/dash');
function mergeDeps(source, destination, key) {
    if (key in source) {
        if (!destination[key]) {
            destination[key] = {};
        }
        for (const depKey of Object.keys(source[key])) {
            destination[key][depKey] = source[key][depKey];
        }
    }
}
function mergePackageJSON(destination, source) {
    for (const key of Object.keys(source)) {
        if (/dependencies/i.test(key)) {
            mergeDeps(source, destination, key);
        }
        else if (key === 'workspaces') {
            // Ensure a unique array
            destination[key] = (0, dash_1.uniq)([
                ...(destination[key] ?? []),
                ...(source[key] ?? []),
            ]);
        }
        else {
            destination[key] = source[key];
        }
    }
    return destination;
}
exports.mergePackageJSON = mergePackageJSON;
//# sourceMappingURL=packageJSON.js.map