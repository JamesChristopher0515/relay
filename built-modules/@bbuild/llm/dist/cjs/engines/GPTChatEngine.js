"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPTChatEngine = void 0;
const gpt_tokenizer_1 = __importDefault(require("gpt-tokenizer"));
const open_ai_1 = require('@bbuild/open-ai');
const open_ai_2 = require('@bbuild/open-ai');
const rxjs_1 = require("rxjs");
class GPTChatEngine {
    countTokens(text) {
        return gpt_tokenizer_1.default.encode(text).length;
    }
    countChatTokens(chat, model = 'gpt-4') {
        // Remove the version/16k suffix
        let modelForTokenizer = model.includes('gpt-4')
            ? 'gpt-4'
            : model.includes('gpt-3.5-turbo')
                ? 'gpt-3.5-turbo'
                : model;
        return gpt_tokenizer_1.default.encodeChat(chat, modelForTokenizer).length;
    }
    getMaxContentLength(model) {
        return (0, open_ai_1.getModelTokens)(model);
    }
    async getCompletionCost(messages, settings) {
        return {
            likelyCost: 0,
            maxPossibleCost: 0, // TODO
        };
    }
    async getChatCompletion(_messages, settings) {
        const messages = Array.isArray(_messages)
            ? _messages
            : [{ role: 'user', content: _messages }];
        const { stream, cancel } = await (0, open_ai_2.OpenAIStream)(messages, settings);
        let content = '';
        const messagesObservable = new rxjs_1.Observable((subscriber) => {
            const reader = stream.getReader();
            const decoder = new TextDecoder();
            reader
                .read()
                .then(function process({ done, value }) {
                if (done) {
                    subscriber.complete();
                    return;
                }
                content += decoder.decode(value);
                subscriber.next([{ role: 'assistant', content }]);
                reader
                    .read()
                    .then(process)
                    .catch((error) => {
                    subscriber.error(error);
                });
            })
                .catch((error) => {
                subscriber.error(error);
            });
            return () => {
                // cancel();
            };
        });
        return {
            messages: messagesObservable,
            cancel,
        };
    }
}
exports.GPTChatEngine = GPTChatEngine;
const gptChatEngine = new GPTChatEngine();
exports.default = gptChatEngine;
//# sourceMappingURL=GPTChatEngine.js.map