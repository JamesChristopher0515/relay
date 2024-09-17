"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeCompletion = void 0;
const ParseMessage_1 = require("./ParseMessage");
const getChatCompletion_1 = __importDefault(require("./engines/getChatCompletion"));
async function getCodeCompletion(prompt, ...rest) {
    let tries = 0;
    const maxtries = 3;
    const amendedPrompt = `${prompt}

Format your response as a markdown code block. Do not include any explanation or other text in your response, only the code. No other response will be accepted.`;
    while (tries < maxtries) {
        tries++;
        const opts = {
            ...(rest[0] ?? {}),
        };
        const result = await (0, getChatCompletion_1.default)(amendedPrompt, opts, ...(rest ?? []).slice(1));
        // try parse
        try {
            const parsed = ParseMessage_1.ParseMessage.code(result);
            return parsed;
        }
        catch (e) {
            console.log(e);
            console.log('Invalid code block, try again');
        }
    }
    throw new Error(`Invalid code block after ${maxtries} tries`);
}
exports.getCodeCompletion = getCodeCompletion;
//# sourceMappingURL=getCodeCompletion.js.map