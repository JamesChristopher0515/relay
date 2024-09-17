"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RelayConversation_1 = __importDefault(require("./RelayConversation"));
class BasicConversation extends RelayConversation_1.default {
    defaultResponder;
    get defaultState() {
        return {};
    }
    constructor(opts) {
        super(opts);
    }
}
exports.default = BasicConversation;
//# sourceMappingURL=BasicConversation.js.map