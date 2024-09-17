"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.parse = exports.editJson = exports.writeJson = exports.readJson = void 0;
const comment_json_1 = require("comment-json");
const file_parse_1 = require('@bbuild/file-parse');
_a = (0, file_parse_1.makeFilterParsers)({
    read: (fileContents) => {
        return (0, comment_json_1.parse)(fileContents);
    },
    write: (obj) => (0, comment_json_1.stringify)(obj, null, 2),
}), exports.readJson = _a.read, exports.writeJson = _a.write, exports.editJson = _a.edit;
var parse_1 = require("./parse");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parse_1.parse; } });
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return parse_1.stringify; } });
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