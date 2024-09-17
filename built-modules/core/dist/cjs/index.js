"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApps = exports.appPath = exports.resolveModulePath = exports.workspacePath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function findWorkspaceRoot(p) {
    if (!p) {
        p = process.cwd();
    }
    if (fs_1.default.existsSync(p + '/yarn.lock')) {
        return p;
    }
    if (p === '/') {
        return null;
    }
    return findWorkspaceRoot(p + '/..');
}
function workspacePath(...rest) {
    return path_1.default.join(findWorkspaceRoot(process.cwd()), ...rest);
}
exports.workspacePath = workspacePath;
function resolveModulePath(moduleName, startDir) {
    const possiblePath = path_1.default.join(startDir, 'node_modules', moduleName);
    if (fs_1.default.existsSync(possiblePath)) {
        return possiblePath;
    }
    else {
        const nextDir = path_1.default.join(startDir, '..');
        if (nextDir === startDir) {
            throw new Error(`Could not find module ${moduleName}`);
        }
        return resolveModulePath(moduleName, nextDir);
    }
}
exports.resolveModulePath = resolveModulePath;
function appPath(app) {
    return workspacePath('apps', app);
}
exports.appPath = appPath;
function getApps() {
    const dir = workspacePath('apps');
    return fs_1.default.readdirSync(dir);
}
exports.getApps = getApps;
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["core"]) {
    console.warn(`Duplicate module core imported. This can lead to bugs.`);
}
globalStore["core"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map