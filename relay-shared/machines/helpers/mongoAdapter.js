export function attachMongoAdapter(entityManager, config) {
    // Attach middleware that will filter all queries
    entityManager._middleware.push({
        process: async (fn, args) => {
            if (fn === 'findEntities') {
                const [type, query, machine] = args;
            }
            else if (fn === 'getEntity') {
                const [id] = args;
            }
            else if (fn === 'createEntity') {
                const [type] = args;
            }
            else if (fn === 'transitionEntity') {
                const [entityId, transition, machine] = args;
            }
            else {
                throw new Error(`Unknown method ${fn}`);
            }
            throw new Error('Not implemented');
        },
    });
}
//# sourceMappingURL=mongoAdapter.js.map