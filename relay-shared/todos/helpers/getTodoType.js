export default function getTodoType(todo) {
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
//# sourceMappingURL=getTodoType.js.map