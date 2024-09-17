"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bold = exports.colorize = void 0;
var TerminalColor;
(function (TerminalColor) {
    TerminalColor["Reset"] = "\u001B[0m";
    TerminalColor["Red"] = "\u001B[31m";
    TerminalColor["Green"] = "\u001B[32m";
    TerminalColor["Yellow"] = "\u001B[33m";
    TerminalColor["Blue"] = "\u001B[34m";
    TerminalColor["Magenta"] = "\u001B[35m";
    TerminalColor["Cyan"] = "\u001B[36m";
    TerminalColor["White"] = "\u001B[37m";
})(TerminalColor || (TerminalColor = {}));
exports.colorize = {
    red: (text) => `${TerminalColor.Red}${text}${TerminalColor.Reset}`,
    green: (text) => `${TerminalColor.Green}${text}${TerminalColor.Reset}`,
    yellow: (text) => `${TerminalColor.Yellow}${text}${TerminalColor.Reset}`,
    blue: (text) => `${TerminalColor.Blue}${text}${TerminalColor.Reset}`,
    magenta: (text) => `${TerminalColor.Magenta}${text}${TerminalColor.Reset}`,
    cyan: (text) => `${TerminalColor.Cyan}${text}${TerminalColor.Reset}`,
    white: (text) => `${TerminalColor.White}${text}${TerminalColor.Reset}`,
};
const bold = (text) => `\x1b[1m${text}${TerminalColor.Reset}`;
exports.bold = bold;
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["format-terminal"]) {
    console.warn(`Duplicate module format-terminal imported. This can lead to bugs.`);
}
globalStore["format-terminal"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map