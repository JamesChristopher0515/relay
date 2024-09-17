"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFilterParsers = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const errors_1 = require('@bbuild/errors');
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
async function readWriteSfately(path, cb) {
    try {
        return await cb();
    }
    catch (e) {
        console.error(`Error reading/writing to file at ${path}`);
        throw e;
    }
}
function makeFilterParsers(config) {
    const ret = {
        read: async (file) => {
            return readWriteSfately(file, async () => {
                const contents = await promises_1.default.readFile(file);
                return config.read(contents.toString());
            });
        },
        readSync: (file) => {
            const contents = fs_1.default.readFileSync(file);
            return config.read(contents.toString());
        },
        write: async (file, obj) => {
            return readWriteSfately(file, async () => {
                const contents = config.write(obj);
                await promises_1.default.writeFile(file, contents);
            });
        },
        /**
         * @param create If true, will create the file if it doesn't exist
         */
        edit: async (file, edit, create = false) => {
            const exists = fs_1.default.existsSync(file);
            (0, errors_1.assert)(exists || create, 'File does not exist and create param is false');
            return readWriteSfately(file, async () => {
                let obj = {};
                if (exists) {
                    obj = await ret.read(file);
                }
                if (create) {
                    // Ensure dir exists
                    fs_extra_1.default.ensureDirSync(path_1.default.dirname(file));
                }
                const newObj = edit(obj);
                (0, errors_1.assert)(typeof newObj !== 'undefined', `Edit function must return a value, got ${newObj}`);
                await ret.write(file, newObj);
            });
        },
    };
    return ret;
}
exports.makeFilterParsers = makeFilterParsers;
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