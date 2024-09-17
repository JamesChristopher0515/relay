export default function newGoal({ client, ...rest }) {
    return {
        _id: 'new',
        client,
        goal: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...rest,
    };
}
//# sourceMappingURL=newGoal.js.map