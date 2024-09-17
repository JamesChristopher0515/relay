"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TodayViewController_1 = __importDefault(require("../controllers/TodayViewController"));
function usePendingInteractiveTodos() {
    const todayController = TodayViewController_1.default.use({});
    return todayController.todos.filter((t) => !t.complete && t.assignedResource);
}
exports.default = usePendingInteractiveTodos;
//# sourceMappingURL=usePendingInteractiveTodos.js.map