"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectSchema = exports.setObjectSchema = void 0;
const serialise_1 = require("./serialise");
function setObjectSchema(input, { schema, name }) {
    return {
        ...input,
        _schema: { schema: (0, serialise_1.serialiseZodSchema)(schema), name },
    };
}
exports.setObjectSchema = setObjectSchema;
function getObjectSchema(input) {
    if (typeof input === "object" && input !== null) {
        if (input._schema) {
            return { schema: (0, serialise_1.deserialiseZodSchema)(input._schema.schema), name: input._schema.name };
        }
    }
    return null;
}
exports.getObjectSchema = getObjectSchema;
//# sourceMappingURL=schemaObject.js.map