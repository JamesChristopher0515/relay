import { parse as commentJsonParse, stringify as commentJsonStringify, } from 'comment-json';
import JSON5 from 'json5';
export function parse(json, _opts = {
    parseType: 'comment-json',
}) {
    if (_opts?.parseType === 'json5') {
        return JSON5.parse(json);
    }
    else {
        return commentJsonParse(json);
    }
}
export function stringify(obj, _opts = {
    parseType: 'comment-json',
}) {
    if (_opts?.parseType === 'json5') {
        return JSON5.stringify(obj, null, 2);
    }
    else {
        return commentJsonStringify(obj, null, 2);
    }
}
//# sourceMappingURL=parse.js.map