import { makeFilterParsers } from '@bbuild/file-parse';
import yaml from 'yaml';
export const { read: readYaml, write: writeYaml, edit: editYaml, readSync: readYamlSync, } = makeFilterParsers({
    read: (fileContents) => yaml.parse(fileContents),
    write: (obj) => yaml.stringify(obj),
});
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["yml"]) {
    console.warn(`Duplicate module yml imported. This can lead to bugs.`);
}
globalStore["yml"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map