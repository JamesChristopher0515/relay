import { ChatCompletionMessage, CompletionSettings } from './ChatEngine';
export declare function getChatCompletionStream(_messages: ChatCompletionMessage[] | string, modelSettings?: Partial<CompletionSettings>, config?: {
    tries?: number;
    responseTokens?: number;
}): Promise<{
    messages: import("rxjs").Observable<{
        role: "user" | "system" | "assistant";
        content: string;
    }[]>;
    cancel: () => void;
}>;
export default function getChatCompletion(_messages: ChatCompletionMessage[] | string, modelSettings?: Partial<CompletionSettings>, config?: {
    tries?: number;
    responseTokens?: number;
}): Promise<string>;
export declare function getSingleChatCompletion(message: string, settings?: Partial<CompletionSettings>): Promise<{
    messages: import("rxjs").Observable<{
        role: "user" | "system" | "assistant";
        content: string;
    }[]>;
    cancel: () => void;
}>;
export declare function getJSONCompletion(input: any, settings?: Partial<CompletionSettings>): Promise<any>;
export declare function getJSONCompletionStream(input: any, settings?: Partial<CompletionSettings>): Promise<{
    messages: import("rxjs").Observable<{
        role: "user" | "system" | "assistant";
        content: string;
    }[]>;
    cancel: () => void;
}>;
//# sourceMappingURL=getChatCompletion.d.ts.map