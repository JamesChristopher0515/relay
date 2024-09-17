"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useApi_1 = require("../../api/hooks/useApi");
const isObjectId_1 = __importDefault(require("../../../core/helpers/isObjectId"));
function useTodo(id, opts = {}) {
    const { data: doc } = (0, useApi_1.useGetTodoQuery)(id, {
        skip: typeof id !== 'string' || !(0, isObjectId_1.default)(id),
        ...opts,
    });
    const [updateMut] = (0, useApi_1.useUpdateTodoMutation)();
    const [remove] = (0, useApi_1.useDeleteTodoMutation)();
    const [create] = (0, useApi_1.useCreateTodoMutation)();
    return [
        doc,
        {
            create,
            update: async (update) => updateMut({ id: id, update }),
            remove: async () => remove(id),
        },
    ];
}
exports.default = useTodo;
//# sourceMappingURL=useTodo.js.map