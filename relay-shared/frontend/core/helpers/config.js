const _config = {};
export default function Config(config) {
    if (config) {
        Object.assign(_config, config);
    }
    return _config;
}
export const config = _config;
//# sourceMappingURL=config.js.map