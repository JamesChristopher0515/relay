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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeCompletion = exports.getZodCompletion = exports.getJSONCompletionStream = exports.getJSONCompletion = exports.getChatCompletionStream = exports.getChatCompletion = void 0;
const getZodCompletion_1 = require("./getZodCompletion");
Object.defineProperty(exports, "getZodCompletion", { enumerable: true, get: function () { return getZodCompletion_1.getZodCompletion; } });
__exportStar(require("./engines"), exports);
var getChatCompletion_1 = require("./engines/getChatCompletion");
Object.defineProperty(exports, "getChatCompletion", { enumerable: true, get: function () { return __importDefault(getChatCompletion_1).default; } });
Object.defineProperty(exports, "getChatCompletionStream", { enumerable: true, get: function () { return getChatCompletion_1.getChatCompletionStream; } });
Object.defineProperty(exports, "getJSONCompletion", { enumerable: true, get: function () { return getChatCompletion_1.getJSONCompletion; } });
Object.defineProperty(exports, "getJSONCompletionStream", { enumerable: true, get: function () { return getChatCompletion_1.getJSONCompletionStream; } });
var getCodeCompletion_1 = require("./getCodeCompletion");
Object.defineProperty(exports, "getCodeCompletion", { enumerable: true, get: function () { return getCodeCompletion_1.getCodeCompletion; } });
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["llm"]) {
    console.warn(`Duplicate module llm imported. This can lead to bugs.`);
}
globalStore["llm"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map