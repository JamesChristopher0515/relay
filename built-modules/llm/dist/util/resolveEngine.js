import anthropicChatEngine from "../engines/AnthropicChatEngine";
import gptChatEngine from "../engines/GPTChatEngine";
export default function resolveEngine(engineName) {
    if (engineName.includes('claude')) {
        return anthropicChatEngine;
    }
    else {
        return gptChatEngine;
    }
}
//# sourceMappingURL=resolveEngine.js.map