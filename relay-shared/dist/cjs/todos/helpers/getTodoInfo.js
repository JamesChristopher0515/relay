"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getTodoType_1 = __importDefault(require("../helpers/getTodoType"));
function getTodoInfo(todo) {
    const type = (0, getTodoType_1.default)(todo);
    return {
        ...todo,
        type,
    };
}
exports.default = getTodoInfo;
//# sourceMappingURL=getTodoInfo.js.map