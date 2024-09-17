import tokenizer from 'gpt-tokenizer';
import { getModelTokens } from '@bbuild/open-ai';
import { OpenAIStream } from '@bbuild/open-ai';
import { Observable } from 'rxjs';
export class GPTChatEngine {
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
        return getModelTokens(model);
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
const gptChatEngine = new GPTChatEngine();
export default gptChatEngine;
//# sourceMappingURL=GPTChatEngine.js.map