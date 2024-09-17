import { deserialiseZodSchema, serialiseZodSchema } from "./serialise";
export function setObjectSchema(input, { schema, name }) {
    return {
        ...input,
        _schema: { schema: serialiseZodSchema(schema), name },
    };
}
export function getObjectSchema(input) {
    if (typeof input === "object" && input !== null) {
        if (input._schema) {
            return { schema: deserialiseZodSchema(input._schema.schema), name: input._schema.name };
        }
    }
    return null;
}
//# sourceMappingURL=schemaObject.js.map