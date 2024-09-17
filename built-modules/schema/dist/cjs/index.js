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
exports.deserialiseZodSchema = exports.serialiseZodSchema = exports.zodSchemaToTypeString = void 0;
__exportStar(require("./prettifyZodError"), exports);
var zodSchemaToTypeString_1 = require("./zodSchemaToTypeString");
Object.defineProperty(exports, "zodSchemaToTypeString", { enumerable: true, get: function () { return __importDefault(zodSchemaToTypeString_1).default; } });
var serialise_1 = require("./serialise");
Object.defineProperty(exports, "serialiseZodSchema", { enumerable: true, get: function () { return serialise_1.serialiseZodSchema; } });
Object.defineProperty(exports, "deserialiseZodSchema", { enumerable: true, get: function () { return serialise_1.deserialiseZodSchema; } });
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["schema"]) {
    console.warn(`Duplicate module schema imported. This can lead to bugs.`);
}
globalStore["schema"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map