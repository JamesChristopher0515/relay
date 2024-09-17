declare function completion(messages: {
    role: "user" | "system" | "assistant";
    content: string;
}[], options?: {
    model?: string;
    stream?: boolean;
    max_tokens?: number;
    signal?: AbortSignal;
}): Promise<any>;
declare namespace completion {
    var defaultModel: string;
}
export default completion;
//# sourceMappingURL=anthropic-completion.d.ts.map