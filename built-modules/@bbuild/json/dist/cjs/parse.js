"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.parse = void 0;
const comment_json_1 = require("comment-json");
const json5_1 = __importDefault(require("json5"));
function parse(json, _opts = {
    parseType: 'comment-json',
}) {
    if (_opts?.parseType === 'json5') {
        return json5_1.default.parse(json);
    }
    else {
        return (0, comment_json_1.parse)(json);
    }
}
exports.parse = parse;
function stringify(obj, _opts = {
    parseType: 'comment-json',
}) {
    if (_opts?.parseType === 'json5') {
        return json5_1.default.stringify(obj, null, 2);
    }
    else {
        return (0, comment_json_1.stringify)(obj, null, 2);
    }
}
exports.stringify = stringify;
//# sourceMappingURL=parse.js.map