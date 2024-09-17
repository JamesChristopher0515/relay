"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.readYamlSync = exports.editYaml = exports.writeYaml = exports.readYaml = void 0;
const file_parse_1 = require('@bbuild/file-parse');
const yaml_1 = __importDefault(require("yaml"));
_a = (0, file_parse_1.makeFilterParsers)({
    read: (fileContents) => yaml_1.default.parse(fileContents),
    write: (obj) => yaml_1.default.stringify(obj),
}), exports.readYaml = _a.read, exports.writeYaml = _a.write, exports.editYaml = _a.edit, exports.readYamlSync = _a.readSync;
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