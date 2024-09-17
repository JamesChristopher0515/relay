"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTodoType(todo) {
    if (todo.questionnaire) {
        return 'questionnaire';
    }
    else if (todo.content) {
        return 'content';
    }
    else if (todo.appointmentId) {
        return 'appointment';
    }
    else {
        return 'generic';
    }
}
exports.default = getTodoType;
//# sourceMappingURL=getTodoType.js.map