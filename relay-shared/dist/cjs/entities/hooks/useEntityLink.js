"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useEntityInfo_1 = __importDefault(require("../helpers/useEntityInfo"));
function useEntityLink({ type, id, name: _name, }) {
    const info = (0, useEntityInfo_1.default)(type, id);
    const { data } = info.hook?.(id) ?? { data: undefined };
    if (!info) {
        return { text: 'Unsupported entity' };
    }
    const name = _name ?? (data ? info.getShortName?.(data) ?? data.name : '');
    if (info.url) {
        const url = typeof info.url === 'string'
            ? `${info.url}/${id}`
            : data
                ? info.url(data)
                : '';
        return { url, text: name };
    }
    else {
        return { text: name };
    }
}
exports.default = useEntityLink;
useEntityLink.supportedEntities = [
    'questionnaire',
    'questionnaire-result',
    'todo',
    'content',
    'client',
    'journey',
];
//# sourceMappingURL=useEntityLink.js.map