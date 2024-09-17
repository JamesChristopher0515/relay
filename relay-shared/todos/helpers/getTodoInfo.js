import getTodoType from '../helpers/getTodoType';
export default function getTodoInfo(todo) {
    const type = getTodoType(todo);
    return {
        ...todo,
        type,
    };
}
//# sourceMappingURL=getTodoInfo.js.map