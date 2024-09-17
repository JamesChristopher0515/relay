"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFontAwesomeIconFromMIME = void 0;
const FA = __importStar(require("@fortawesome/free-solid-svg-icons"));
const iconsMap = {
    // Media
    image: FA.faFileImage,
    audio: FA.faFileAudio,
    video: FA.faFileVideo,
    // Documents
    'application/pdf': FA.faFilePdf,
    'application/msword': FA.faFileWord,
    'application/vnd.ms-word': FA.faFileWord,
    'application/vnd.oasis.opendocument.text': FA.faFileWord,
    'application/vnd.openxmlformats-officedocument.wordprocessingml': FA.faFileWord,
    'application/vnd.ms-excel': FA.faFileExcel,
    'application/vnd.openxmlformats-officedocument.spreadsheetml': FA.faFileExcel,
    'application/vnd.oasis.opendocument.spreadsheet': FA.faFileExcel,
    'application/vnd.ms-powerpoint': FA.faFilePowerpoint,
    'application/vnd.openxmlformats-officedocument.presentationml': FA.faFilePowerpoint,
    'application/vnd.oasis.opendocument.presentation': FA.faFilePowerpoint,
    'text/plain': FA.faFileAlt,
    'text/html': FA.faFileCode,
    'application/json': FA.faFileCode,
    // Archives
    'application/gzip': FA.faFileArchive,
    'application/zip': FA.faFileArchive,
};
function getFontAwesomeIconFromMIME(mimeType) {
    // List of official MIME Types: http://www.iana.org/assignments/media-types/media-types.xhtml
    const candidate = Object.entries(iconsMap).find(([k]) => mimeType.startsWith(k));
    if (candidate === undefined) {
        return FA.faFile;
    }
    else {
        return candidate[1];
    }
}
exports.getFontAwesomeIconFromMIME = getFontAwesomeIconFromMIME;
function fontAwesomeIconForFile(file) {
    return getFontAwesomeIconFromMIME(file.mimetype ?? '');
}
exports.default = fontAwesomeIconForFile;
//# sourceMappingURL=fontAwesomeIconForFile.js.map