import { Observable } from "rxjs";
import { ChatEngine } from "./ChatEngine";
export declare class AnthropicChatEngine implements ChatEngine {
    countTokens(text: string): number;
    countChatTokens(chat: {
        role: "user" | "system" | "assistant";
        content: string;
    }[], model?: string): number;
    getMaxContentLength(model: any): number;
    getCompletionCost(messages: any, settings: any): Promise<{
        likelyCost: number;
        maxPossibleCost: number;
    }>;
    getChatCompletion(_messages: any, settings: any): Promise<{
        messages: Observable<{
            role: "user" | "system" | "assistant";
            content: string;
        }[]>;
        cancel: () => void;
    }>;
}
declare const anthropicChatEngine: AnthropicChatEngine;
export default anthropicChatEngine;
//# sourceMappingURL=AnthropicChatEngine.d.ts.map