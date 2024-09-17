import { CompletionSettings } from "../engines/ChatEngine";
export default function pickBest(prompt: string, opts: {
    n?: number;
    model: string[] | string;
    judgementModel: string;
} & Omit<CompletionSettings, "model">): Promise<string>;
//# sourceMappingURL=pickBest.d.ts.map