"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useSingleResource_1 = __importDefault(require("../../api/hooks/useSingleResource"));
function useCaseNote(id) {
    return (0, useSingleResource_1.default)('CaseNote', id);
}
exports.default = useCaseNote;
//# sourceMappingURL=useCaseNote.js.map