"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSONCompletionStream = exports.getJSONCompletion = exports.getSingleChatCompletion = exports.getChatCompletionStream = void 0;
const rxjs_1 = require("rxjs");
const resolveEngine_1 = __importDefault(require("../util/resolveEngine"));
async function getChatCompletionStream(_messages, modelSettings, config) {
    const messages = Array.isArray(_messages)
        ? _messages
        : [{ role: 'user', content: _messages }];
    let tries = 0;
    while (tries < (config?.tries ?? 6)) {
        try {
            // const engine =
            //   typeof modelSettings?.model === 'string' || !modelSettings?.model
            //     ? resolveEngine(((modelSettings as any)?.model as string) ?? 'gpt-4')
            //     : modelSettings.model!
            const engine = (0, resolveEngine_1.default)('gpt-4'); // just use gpt engine for everything now
            return await engine.getChatCompletion(messages, modelSettings);
        }
        catch (e) {
            if (e.message.includes('context length')) {
                throw new Error('Context length too long');
            }
            console.error(e);
            tries++;
        }
    }
    throw new Error('Used up all tries');
}
exports.getChatCompletionStream = getChatCompletionStream;
async function getChatCompletion(_messages, modelSettings, config) {
    const resp = await getChatCompletionStream(_messages, modelSettings, config);
    const messages = await (0, rxjs_1.lastValueFrom)(resp.messages);
    const lastMsg = messages[messages.length - 1];
    return lastMsg.content;
}
exports.default = getChatCompletion;
function getSingleChatCompletion(message, settings) {
    return getChatCompletionStream([
        {
            role: 'user',
            content: message,
        },
    ], settings);
}
exports.getSingleChatCompletion = getSingleChatCompletion;
async function getJSONCompletion(input, settings) {
    const out = await getChatCompletion(input, {
        ...settings,
        response_format: { type: 'json_object' },
    });
    return JSON.parse(out);
}
exports.getJSONCompletion = getJSONCompletion;
function getJSONCompletionStream(input, settings) {
    return getChatCompletionStream(input, {
        ...settings,
        response_format: { type: 'json_object' },
    });
}
exports.getJSONCompletionStream = getJSONCompletionStream;
//# sourceMappingURL=getChatCompletion.js.map