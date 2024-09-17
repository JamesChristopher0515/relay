"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnthropicChatEngine_1 = __importDefault(require("../engines/AnthropicChatEngine"));
const GPTChatEngine_1 = __importDefault(require("../engines/GPTChatEngine"));
function resolveEngine(engineName) {
    if (engineName.includes('claude')) {
        return AnthropicChatEngine_1.default;
    }
    else {
        return GPTChatEngine_1.default;
    }
}
exports.default = resolveEngine;
//# sourceMappingURL=resolveEngine.js.map