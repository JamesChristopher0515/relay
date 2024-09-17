export function mergeConfigs(...configs) {
    return configs.reduce((acc, config) => {
        for (const key in config) {
            if (config[key] !== undefined || acc[key] === undefined) {
                acc[key] = config[key];
            }
        }
        return acc;
    }, {});
}
//# sourceMappingURL=mergeConfigs.js.map