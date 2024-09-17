import { parse as commentJsonParse, stringify as commentJsonStringify, } from 'comment-json';
import { makeFilterParsers } from '@bbuild/file-parse';
export const { read: readJson, write: writeJson, edit: editJson, } = makeFilterParsers({
    read: (fileContents) => {
        return commentJsonParse(fileContents);
    },
    write: (obj) => commentJsonStringify(obj, null, 2),
});
export { parse, stringify } from './parse';
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["json"]) {
    console.warn(`Duplicate module json imported. This can lead to bugs.`);
}
globalStore["json"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map