import fs from 'fs/promises';
import path from 'path';
import { workspacePath } from '@bbuild/core';
import { cloneDeep } from '@bbuild/dash';
import { writeJson } from '@bbuild/json';
export async function makeCJSNodeModule(config) {
    const { module } = config;
    const packageJsonWorking = cloneDeep(config.module);
    const nodeModOutPath = config.saveTo === 'workspace'
        ? workspacePath('node_modules', module.name)
        : config.saveTo.path;
    for (const [exPath, info] of Object.entries(config.module.exports)) {
        await fs.mkdir(path.dirname(exPath), { recursive: true });
        await fs.writeFile(exPath, info.contents);
        packageJsonWorking.exports[exPath] = './' + exPath;
    }
    packageJsonWorking.exports['./package.json'] = './package.json';
    await writeJson(path.join(nodeModOutPath, 'package.json'), packageJsonWorking);
}
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