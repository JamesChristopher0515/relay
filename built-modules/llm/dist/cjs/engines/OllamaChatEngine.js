"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaChatEngine = void 0;
const eventsource_parser_1 = require("eventsource-parser");
const gpt_tokenizer_1 = __importDefault(require("gpt-tokenizer"));
const open_ai_1 = require('@bbuild/open-ai');
const rxjs_1 = require("rxjs");
class OllamaChatEngine {
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
        return 2048;
    }
    async getCompletionCost(messages, settings) {
        return {
            likelyCost: 0,
            maxPossibleCost: 0, // TODO
        };
    }
    async getMessagesStream(messages, settings) {
        const modelSettings = {
            model: 'llama2',
            ...settings,
        };
        const abortController = new AbortController();
        const { signal } = abortController;
        const OLLAMA_HOST = process.env.OLLAMA_HOST ?? 'https://andrewsacstudio.taile7229.ts.net';
        const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                messages,
                ...modelSettings,
                stream: true,
            }),
            signal,
        });
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        if (res.status !== 200) {
            const statusText = res.statusText;
            const result = await res.body?.getReader().read();
            throw new Error(`Ollama API returned an error: ${decoder.decode(result?.value) || statusText}`);
        }
        const stream = new ReadableStream({
            async start(controller) {
                const onParse = (event) => {
                    if (event.type === 'event') {
                        const data = event.data;
                        try {
                            const json = JSON.parse(data);
                            if (json.done) {
                                controller.close();
                                return;
                            }
                            const text = json.message?.content ?? '';
                            const queue = encoder.encode(text);
                            controller.enqueue(queue);
                        }
                        catch (e) {
                            controller.error(e);
                        }
                    }
                };
                const parser = (0, eventsource_parser_1.createParser)(onParse);
                // Listen for abort event on the signal
                signal.addEventListener('abort', () => {
                    console.log('abort event triggered');
                    try {
                        controller.close();
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
                for await (const chunk of res.body) {
                    parser.feed(decoder.decode(chunk));
                }
            },
        });
        return {
            stream,
            cancel: () => {
                console.log('cancelling');
                try {
                    if (!abortController.signal.aborted) {
                        abortController.abort();
                    }
                }
                catch (e) {
                    console.error(e);
                }
            },
        };
    }
    async getChatCompletion(_messages, settings) {
        const messages = Array.isArray(_messages)
            ? _messages
            : [{ role: 'user', content: _messages }];
        const { stream, cancel } = await (0, open_ai_1.OpenAIStream)(messages, settings);
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
exports.OllamaChatEngine = OllamaChatEngine;
const ollamaChatEngine = new OllamaChatEngine();
exports.default = ollamaChatEngine;
//# sourceMappingURL=OllamaChatEngine.js.map