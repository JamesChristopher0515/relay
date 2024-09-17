"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStateMachine = void 0;
var createStateMachine_1 = require("./createStateMachine");
Object.defineProperty(exports, "createStateMachine", { enumerable: true, get: function () { return createStateMachine_1.createStateMachine; } });
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["machine2"]) {
    console.warn(`Duplicate module machine2 imported. This can lead to bugs.`);
}
globalStore["machine2"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map