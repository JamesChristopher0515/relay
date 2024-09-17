import * as z from 'zod';
export function serialiseZodSchema(schema) {
    const typeName = schema.constructor.name;
    switch (typeName) {
        case 'ZodString':
            return { type: 'string' };
        case 'ZodNumber':
            return { type: 'number' };
        case 'ZodBoolean':
            return { type: 'boolean' };
        case 'ZodArray':
            return {
                type: 'array',
                itemType: serialiseZodSchema(schema._def.type),
            };
        case 'ZodObject':
            const shape = schema.shape;
            const fields = Object.entries(shape).reduce((acc, [key, value]) => {
                acc[key] = serialiseZodSchema(value);
                return acc;
            }, {});
            return { type: 'object', fields };
        case 'ZodEnum':
            return { type: 'enum', values: schema._def.values };
        default:
            console.log(`Unknown zod type: ${typeName}`, schema);
            return { type: 'unknown' };
    }
}
export function deserialiseZodSchema(schemaObj) {
    switch (schemaObj.type) {
        case 'string':
            return z.string();
        case 'number':
            return z.number();
        case 'boolean':
            return z.boolean();
        case 'array':
            return z.array(deserialiseZodSchema(schemaObj.itemType));
        case 'object':
            const shape = Object.entries(schemaObj.fields).reduce((acc, [key, value]) => {
                acc[key] = deserialiseZodSchema(value);
                return acc;
            }, {});
            return z.object(shape);
        case 'enum':
            return z.enum(schemaObj.values);
        default:
            // console.log(`Unknown schema type: ${schemaObj.type}`, schemaObj)
            return z.any();
    }
}
//# sourceMappingURL=serialise.js.map