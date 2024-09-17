"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getChatCompletion_1 = __importDefault(require("../engines/getChatCompletion"));
async function pickBest(prompt, opts) {
    const { n: _n, model, judgementModel, ...rest } = opts;
    const n = _n ?? model.length;
    if (!n) {
        throw new Error(`n must be greater than 0`);
    }
    const completions = await Promise.all(Array.from({ length: n }, async (v, i) => {
        const completion = await (0, getChatCompletion_1.default)(prompt, { ...rest, model: Array.isArray(model) ? model[i] : model });
        return completion.trim();
    }));
    const pickPrompt = `The following are ${n} different completions for a prompt:

  ${completions.map((c, i) => `${i + 1}. ${c}`).join("\n\n")}

  The prompt was:

  ${prompt}

  Thinking carefully, pick the most correct and accurate completion from the selection, responding with its associated number. Only respond with the number, nothing else. No other response will be accepted.
  `;
    const best = await (0, getChatCompletion_1.default)(pickPrompt, {
        ...rest,
        model: judgementModel,
        temperature: 0.0,
    });
    const matched = /(\d+)/.exec(best);
    if (!matched) {
        throw new Error(`Could not find a number in the response: ${best}`);
    }
    const bestCompletion = completions[parseInt(matched[1]) - 1];
    return bestCompletion;
}
exports.default = pickBest;
//# sourceMappingURL=pickBest.js.map