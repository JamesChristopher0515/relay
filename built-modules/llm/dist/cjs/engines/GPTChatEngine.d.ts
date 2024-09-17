import { Observable } from 'rxjs';
import { ChatEngine } from './ChatEngine';
export declare class GPTChatEngine implements ChatEngine<'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-0314' | 'gpt-3.5-turbo-16k'> {
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
    getChatCompletion(_messages: any, settings: any): Promise<{
        messages: Observable<{
            role: 'user' | 'system' | 'assistant';
            content: string;
        }[]>;
        cancel: () => void;
    }>;
}
declare const gptChatEngine: GPTChatEngine;
export default gptChatEngine;
//# sourceMappingURL=GPTChatEngine.d.ts.map