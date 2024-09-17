"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require('@bbuild/core/index');
const tryLoadConfig_1 = require("./tryLoadConfig");
const node_modules_1 = require('@bbuild/node-modules');
const path_1 = __importDefault(require("path"));
async function createHardConfigs(app) {
    const modules = await (0, tryLoadConfig_1.getNodeModulesWithConfigForApp)(app);
    for (const config of modules.withConfig) {
        const appFolder = (0, index_1.workspacePath)('apps', app);
        // TODO need to make sure private config values are not exposed to public-facing client codez
        const confValues = (0, tryLoadConfig_1.tryAssignConfig)(config, appFolder);
        const { path: thePath } = config;
        const name = path_1.default.dirname(thePath);
        await (0, node_modules_1.makeCJSNodeModule)({
            module: {
                name: `@one/hard-config/${name}`,
                exports: {
                    'index.js': {
                        contents: `module.exports = ${JSON.stringify(confValues, null, 2)}`,
                    },
                },
                version: '1.0.0',
            },
            saveTo: 'workspace',
        });
    }
}
exports.default = createHardConfigs;
//# sourceMappingURL=createHardConfigs.js.map