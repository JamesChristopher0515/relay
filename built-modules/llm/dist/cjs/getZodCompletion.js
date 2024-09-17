"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZodCompletion = void 0;
const schema_1 = require('@bbuild/schema');
const ParseMessage_1 = require("./ParseMessage");
const getChatCompletion_1 = __importDefault(require("./engines/getChatCompletion"));
async function getZodCompletion({ schema, name }, prompt, ...rest) {
    const type = (0, schema_1.zodSchemaToTypeString)(schema, name);
    let tries = 0;
    const maxtries = 3;
    const amendedPrompt = `${prompt}

Format your response as JSON conforming to the following type:
${type}

Do not include any explanation or other text in your response, only the JSON. No other response will be accepted.`;
    while (tries < maxtries) {
        tries++;
        let modelSupportsJSONMode = false;
        const opts = {
            ...(rest[0] ?? {}),
            ...(modelSupportsJSONMode
                ? { response_format: { type: 'json_object' } }
                : {}),
        };
        const result = await (0, getChatCompletion_1.default)(amendedPrompt, opts, ...(rest ?? []).slice(1));
        // try parse
        try {
            const parsed = ParseMessage_1.ParseMessage.json(result);
            const validated = schema.parse(parsed);
            return validated;
        }
        catch (e) {
            console.log(e);
            console.log('Invalid JSON, try again');
        }
    }
    throw new Error(`Invalid JSON after ${maxtries} tries`);
}
exports.getZodCompletion = getZodCompletion;
//# sourceMappingURL=getZodCompletion.js.map