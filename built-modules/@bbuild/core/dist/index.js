import fs from 'fs';
import path from 'path';
function findWorkspaceRoot(p) {
    if (!p) {
        p = process.cwd();
    }
    if (fs.existsSync(p + '/yarn.lock')) {
        return p;
    }
    if (p === '/') {
        return null;
    }
    return findWorkspaceRoot(p + '/..');
}
export function workspacePath(...rest) {
    return path.join(findWorkspaceRoot(process.cwd()), ...rest);
}
export function resolveModulePath(moduleName, startDir) {
    const possiblePath = path.join(startDir, 'node_modules', moduleName);
    if (fs.existsSync(possiblePath)) {
        return possiblePath;
    }
    else {
        const nextDir = path.join(startDir, '..');
        if (nextDir === startDir) {
            throw new Error(`Could not find module ${moduleName}`);
        }
        return resolveModulePath(moduleName, nextDir);
    }
}
export function appPath(app) {
    return workspacePath('apps', app);
}
export function getApps() {
    const dir = workspacePath('apps');
    return fs.readdirSync(dir);
}
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