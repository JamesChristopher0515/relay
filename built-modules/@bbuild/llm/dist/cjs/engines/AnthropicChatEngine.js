"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicChatEngine = void 0;
const gpt_tokenizer_1 = __importDefault(require("gpt-tokenizer"));
const errors_1 = require('@bbuild/errors');
const rxjs_1 = require("rxjs");
const anthropic_completion_1 = __importDefault(require("./anthropic-completion"));
class AnthropicChatEngine {
    countTokens(text) {
        return gpt_tokenizer_1.default.encode(text).length;
    }
    countChatTokens(chat, model = 'gpt-4') {
        // Remove the version/16k suffix
        // let modelForTokenizer: any = model.includes('gpt-4') ? 'gpt-4' : model.includes('gpt-3.5-turbo') ? 'gpt-3.5-turbo' : model;
        return gpt_tokenizer_1.default.encodeChat(chat, 'gpt-4').length;
    }
    getMaxContentLength(model) {
        return 100000;
        // return model.includes("100k") ? 100000 : 9000;
    }
    async getCompletionCost(messages, settings) {
        // Get total tokens for prompt
        const totalTokens = messages.reduce((acc, message) => {
            return acc + this.countTokens(JSON.stringify(message));
        }, 0);
        const { model, max_tokens } = settings;
        (0, errors_1.invariant)(!!model && max_tokens, "No model or max_tokens provided");
        const completionCost = {
            "claude-instant-v1": 5.51,
            "claude-v1": 32.68,
            "claude-instant-v1-100k": 5.51,
            "claude-v1-100k": 32.68,
        }[model];
        const promptCost = {
            "claude-instant-v1": 1.63,
            "claude-v1": 11.02,
            "claude-instant-v1-100k": 1.63,
            "claude-v1-100k": 11.02,
        }[model];
        // Calculate costs based on model
        let likelyCost = 0;
        let maxPossibleCost = 0;
        likelyCost += (promptCost * totalTokens) / 1_000_000;
        const likelyCompletionTokens = 5000;
        likelyCost += (completionCost * likelyCompletionTokens) / 1_000_000;
        maxPossibleCost += (promptCost * totalTokens) / 1_000_000;
        maxPossibleCost += (completionCost * max_tokens) / 1_000_000;
        return {
            likelyCost,
            maxPossibleCost,
        };
    }
    async getChatCompletion(_messages, settings) {
        const messages = Array.isArray(_messages) ? _messages : [{ role: "user", content: _messages }];
        const abortController = new AbortController();
        const stream = await (0, anthropic_completion_1.default)(messages, {
            ...settings,
            stream: true,
            streamCallback: () => { },
            signal: abortController.signal,
        });
        const cancel = () => {
            try {
                if (!abortController.signal.aborted) {
                    abortController.abort();
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        const messagesObservable = new rxjs_1.Observable((subscriber) => {
            stream.on("data", (chunk) => {
                const content = chunk.toString().trim();
                subscriber.next([{ role: "assistant", content }]);
            });
            stream.on("end", () => {
                subscriber.complete();
            });
            stream.on("error", (error) => {
                subscriber.error(error);
            });
            return () => {
                cancel();
            };
        });
        return {
            messages: messagesObservable,
            cancel,
        };
    }
}
exports.AnthropicChatEngine = AnthropicChatEngine;
const anthropicChatEngine = new AnthropicChatEngine();
exports.default = anthropicChatEngine;
//# sourceMappingURL=AnthropicChatEngine.js.map