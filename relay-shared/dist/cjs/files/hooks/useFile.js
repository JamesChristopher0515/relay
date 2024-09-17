"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUrl = void 0;
const config_1 = require("@mtyk/frontend/core/helpers/config");
function fileUrl(fileId, imgsrc = false) {
    if (!fileId) {
        return '';
    }
    const url = `${config_1.config.apiUrl}/files/${fileId}`;
    return imgsrc ? `url('${url}')` : url;
}
exports.fileUrl = fileUrl;
function useFile(fileId) {
    return {
        url: fileUrl(fileId),
        empty: typeof fileId !== 'string',
    };
}
exports.default = useFile;
//# sourceMappingURL=useFile.js.map