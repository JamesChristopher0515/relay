import { createParser } from 'eventsource-parser';
import tokenizer from 'gpt-tokenizer';
import { OpenAIStream } from '@bbuild/open-ai';
import { Observable } from 'rxjs';
export class OllamaChatEngine {
    countTokens(text) {
        return tokenizer.encode(text).length;
    }
    countChatTokens(chat, model = 'gpt-4') {
        // Remove the version/16k suffix
        let modelForTokenizer = model.includes('gpt-4')
            ? 'gpt-4'
            : model.includes('gpt-3.5-turbo')
                ? 'gpt-3.5-turbo'
                : model;
        return tokenizer.encodeChat(chat, modelForTokenizer).length;
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
                const parser = createParser(onParse);
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
        const { stream, cancel } = await OpenAIStream(messages, settings);
        let content = '';
        const messagesObservable = new Observable((subscriber) => {
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
const ollamaChatEngine = new OllamaChatEngine();
export default ollamaChatEngine;
//# sourceMappingURL=OllamaChatEngine.js.map