"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserialiseZodSchema = exports.serialiseZodSchema = void 0;
const z = __importStar(require("zod"));
function serialiseZodSchema(schema) {
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
exports.serialiseZodSchema = serialiseZodSchema;
function deserialiseZodSchema(schemaObj) {
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
exports.deserialiseZodSchema = deserialiseZodSchema;
//# sourceMappingURL=serialise.js.map