export const tagsForMany = (type, result, error, opts) => {
    if (error) {
        return [];
    }
    const { data, meta } = result;
    return [
        {
            type,
            id: JSON.stringify(opts),
        },
        ...data.map(p => {
            return {
                type,
                id: p.id,
            };
        }),
    ];
};
export const tagsForSingle = (type, result, error, id) => {
    if (error) {
        return [];
    }
    return [
        {
            type,
            id,
        },
    ];
};
//# sourceMappingURL=tagHelpers.js.map