"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createHardConfigs_1 = __importDefault(require("./createHardConfigs"));
const core_1 = require('@bbuild/core');
async function main() {
    for (const app of (0, core_1.getApps)()) {
        await (0, createHardConfigs_1.default)(app);
    }
}
main();
//# sourceMappingURL=postbuild.js.map