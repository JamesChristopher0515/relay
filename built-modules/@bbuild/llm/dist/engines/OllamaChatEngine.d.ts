import { Observable } from 'rxjs';
import { ChatEngine } from './ChatEngine';
export declare class OllamaChatEngine implements ChatEngine<string> {
    countTokens(text: string): number;
    countChatTokens(chat: {
        role: 'user' | 'system' | 'assistant';
        content: string;
    }[], model?: string): number;
    getMaxContentLength(model: string): number;
    getCompletionCost(messages: any, settings: any): Promise<{
        likelyCost: number;
        maxPossibleCost: number;
    }>;
    getMessagesStream(messages: any, settings: any): Promise<{
        stream: ReadableStream<any>;
        cancel: () => void;
    }>;
    getChatCompletion(_messages: any, settings: any): Promise<{
        messages: Observable<{
            role: 'user' | 'system' | 'assistant';
            content: string;
        }[]>;
        cancel: () => void;
    }>;
}
declare const ollamaChatEngine: OllamaChatEngine;
export default ollamaChatEngine;
//# sourceMappingURL=OllamaChatEngine.d.ts.map