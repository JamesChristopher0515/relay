type Message = {
    role: 'user' | 'system' | 'assistant';
    content: string;
};
export declare enum Model {
    GPT4 = "gpt-4",
    GPT4TurboPreview = "gpt-4-1106-preview",
    GPT3TurboPreview = "gpt-3.5-turbo-1106",
    ChatGPT = "gpt-3.5-turbo",
    ChatGPT16k = "gpt-3.5-turbo-16k"
}
export declare function getModelTokens(model: Model): number;
export declare const OpenAIStream: (messages: Message[], settings?: {
    model?: Model;
    temperature?: number;
}) => Promise<{
    stream: ReadableStream<any>;
    cancel: () => void;
}>;
export {};
//# sourceMappingURL=index.d.ts.map