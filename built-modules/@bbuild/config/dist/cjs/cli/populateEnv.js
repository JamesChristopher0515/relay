"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.ONE_CONFIG_SILENT = 'true';
const config = __importStar(require(".."));
const showSecrets = process.argv.includes('--show-secrets');
function populateEnv() {
    const entire = config._getEntireConfig();
    let bashScript = ``;
    function isValueSecretIsh(value, key) {
        const secretishKeys = ['password', 'secret', 'token', 'key'];
        const lowercaseKey = key.toLowerCase();
        const jwtRegex = /^eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*$/;
        const valueLooksLikeSecret = jwtRegex.test(value);
        return (secretishKeys.some((secretishKey) => lowercaseKey.includes(secretishKey)) || valueLooksLikeSecret);
    }
    const longestKeyLength = Object.keys(entire).reduce((longest, key) => Math.max(longest, key.length), 0);
    for (const key of Object.keys(entire).sort((a, b) => a.localeCompare(b))) {
        const outputvalue = isValueSecretIsh(entire[key], key) && !showSecrets
            ? '********'
            : entire[key];
        const spacing = ' '.repeat(longestKeyLength - key.length);
        bashScript += `${key}="${entire[key]}";echo \"${key}: ${spacing}${outputvalue}\";\n`;
    }
    process.stdout.write(bashScript);
}
exports.default = populateEnv;
populateEnv();
//# sourceMappingURL=populateEnv.js.map