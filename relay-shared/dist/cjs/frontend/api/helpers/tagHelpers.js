"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsForSingle = exports.tagsForMany = void 0;
const tagsForMany = (type, result, error, opts) => {
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
exports.tagsForMany = tagsForMany;
const tagsForSingle = (type, result, error, id) => {
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
exports.tagsForSingle = tagsForSingle;
//# sourceMappingURL=tagHelpers.js.map