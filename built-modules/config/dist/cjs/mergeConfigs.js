"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeConfigs = void 0;
function mergeConfigs(...configs) {
    return configs.reduce((acc, config) => {
        for (const key in config) {
            if (config[key] !== undefined || acc[key] === undefined) {
                acc[key] = config[key];
            }
        }
        return acc;
    }, {});
}
exports.mergeConfigs = mergeConfigs;
//# sourceMappingURL=mergeConfigs.js.map