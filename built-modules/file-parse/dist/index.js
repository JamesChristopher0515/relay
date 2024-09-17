import fs from 'fs/promises';
import path from 'path';
import { assert } from '@bbuild/errors';
import _fs from 'fs';
import fse from 'fs-extra';
async function readWriteSfately(path, cb) {
    try {
        return await cb();
    }
    catch (e) {
        console.error(`Error reading/writing to file at ${path}`);
        throw e;
    }
}
export function makeFilterParsers(config) {
    const ret = {
        read: async (file) => {
            return readWriteSfately(file, async () => {
                const contents = await fs.readFile(file);
                return config.read(contents.toString());
            });
        },
        readSync: (file) => {
            const contents = _fs.readFileSync(file);
            return config.read(contents.toString());
        },
        write: async (file, obj) => {
            return readWriteSfately(file, async () => {
                const contents = config.write(obj);
                await fs.writeFile(file, contents);
            });
        },
        /**
         * @param create If true, will create the file if it doesn't exist
         */
        edit: async (file, edit, create = false) => {
            const exists = _fs.existsSync(file);
            assert(exists || create, 'File does not exist and create param is false');
            return readWriteSfately(file, async () => {
                let obj = {};
                if (exists) {
                    obj = await ret.read(file);
                }
                if (create) {
                    // Ensure dir exists
                    fse.ensureDirSync(path.dirname(file));
                }
                const newObj = edit(obj);
                assert(typeof newObj !== 'undefined', `Edit function must return a value, got ${newObj}`);
                await ret.write(file, newObj);
            });
        },
    };
    return ret;
}
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["file-parse"]) {
    console.warn(`Duplicate module file-parse imported. This can lead to bugs.`);
}
globalStore["file-parse"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map