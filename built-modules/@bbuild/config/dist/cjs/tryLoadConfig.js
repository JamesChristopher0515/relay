"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeModulesWithConfigForApp = exports.tryAssignConfig = void 0;
const core_1 = require('@bbuild/core');
const json_1 = require('@bbuild/json');
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
function tryAssignConfig(config, appFolder, outObj = {}) {
    try {
        const output = (0, child_process_1.execSync)(`node -e "console.log(JSON.stringify(require('${config.configPath}').default))"`, {
            // Run from app folder, as if we were running the app
            cwd: appFolder,
            // Inherit env
            env: { ...process.env, ONE_CONFIG_SILENT: 'true' },
        }).toString();
        const parsed = JSON.parse(output);
        Object.assign(outObj, parsed);
    }
    catch (e) {
        console.log('error', e);
        console.error(`Failed to load config for ${config.path}, are required env variables set?`);
        throw e;
    }
    return outObj;
}
exports.tryAssignConfig = tryAssignConfig;
async function getNodeModulesWithConfigForApp(name) {
    const appFolder = (0, core_1.workspacePath)('apps', name);
    const packageJSON = await (0, json_1.readJson)(`${appFolder}/package.json`);
    const allDependencies = Object.keys({
        ...(packageJSON.dependencies ?? {}),
        ...(packageJSON.devDependencies ?? {}),
    });
    const oneModules = allDependencies.filter((dep) => dep.startsWith('@one/'));
    // console.log('oneModules', oneModules)
    const withConfig = await Promise.all(oneModules.map(async (dep) => {
        const path = await (0, core_1.resolveModulePath)(dep, appFolder);
        const configPath = `${path}/dist/cjs/config.js`;
        const configExists = fs_1.default.existsSync(configPath);
        // console.log({ path, configExists, configPath })
        return { path, configExists, configPath };
    })).then((results) => results.filter((r) => r.configExists));
    return { withConfig, appFolder };
}
exports.getNodeModulesWithConfigForApp = getNodeModulesWithConfigForApp;
//# sourceMappingURL=tryLoadConfig.js.map