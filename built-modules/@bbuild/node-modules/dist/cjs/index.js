"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCJSNodeModule = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const core_1 = require('@bbuild/core');
const dash_1 = require('@bbuild/dash');
const json_1 = require('@bbuild/json');
async function makeCJSNodeModule(config) {
    const { module } = config;
    const packageJsonWorking = (0, dash_1.cloneDeep)(config.module);
    const nodeModOutPath = config.saveTo === 'workspace'
        ? (0, core_1.workspacePath)('node_modules', module.name)
        : config.saveTo.path;
    for (const [exPath, info] of Object.entries(config.module.exports)) {
        await promises_1.default.mkdir(path_1.default.dirname(exPath), { recursive: true });
        await promises_1.default.writeFile(exPath, info.contents);
        packageJsonWorking.exports[exPath] = './' + exPath;
    }
    packageJsonWorking.exports['./package.json'] = './package.json';
    await (0, json_1.writeJson)(path_1.default.join(nodeModOutPath, 'package.json'), packageJsonWorking);
}
exports.makeCJSNodeModule = makeCJSNodeModule;
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["node-modules"]) {
    console.warn(`Duplicate module node-modules imported. This can lead to bugs.`);
}
globalStore["node-modules"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map