"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newGoal({ client, ...rest }) {
    return {
        _id: 'new',
        client,
        goal: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...rest,
    };
}
exports.default = newGoal;
//# sourceMappingURL=newGoal.js.map