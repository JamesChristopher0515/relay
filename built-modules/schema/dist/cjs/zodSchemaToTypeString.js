"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function zodSchemaToTypeString(schema, typeName) {
    const parents = [];
    function processZodType(zodType, ctx) {
        if (!zodType) {
            return 'any';
        }
        const typeName = zodType.constructor.name;
        const description = zodType._def.description ?? null;
        const maybeAddDescriptionAsComment = (str) => `${str}${description ? ` // ${description}` : ''}`;
        if (typeName === 'ZodString') {
            return maybeAddDescriptionAsComment('string');
        }
        else if (typeName === 'ZodNumber') {
            return maybeAddDescriptionAsComment('number');
        }
        else if (typeName === 'ZodBoolean') {
            return maybeAddDescriptionAsComment('boolean');
        }
        else if (typeName === 'ZodDate') {
            return maybeAddDescriptionAsComment('Date');
        }
        else if (typeName === 'ZodUndefined') {
            return 'undefined';
        }
        else if (typeName === 'ZodNull') {
            return 'null';
        }
        else if (typeName === 'ZodArray') {
            return `${processZodType(zodType._def.type, {
                inArray: true,
            })}[]`;
        }
        else if (typeName === 'ZodEnum') {
            const enumValues = zodType._def.values.map((value) => `"${value}"`);
            return enumValues.join(' | ');
        }
        else if (typeName === 'ZodTuple') {
            const tupleTypes = zodType._def.items.map((item) => processZodType(item));
            return `[${tupleTypes.join(', ')}]`;
        }
        else if (typeName === 'ZodObject') {
            const fieldStrings = Object.entries(zodType.shape).map(([fieldName, fieldSchema]) => {
                let optional = fieldSchema._def.isOptional ? '?' : '';
                let fieldType = processZodType(fieldSchema, { inObject: true });
                if (fieldType.includes('| undefined')) {
                    optional = '?';
                    fieldType = fieldType.replace(' | undefined', '').trim();
                }
                return `${fieldName}${optional}: ${fieldType}`;
            });
            return `{${fieldStrings.join(', ')}}`;
        }
        else if (typeName === 'ZodMap') {
            const keyType = processZodType(zodType._def.keyType);
            const valueType = processZodType(zodType._def.valueType);
            return `Map<${keyType}, ${valueType}>`;
        }
        else if (typeName === 'ZodRecord') {
            const valueType = processZodType(zodType._def.valueType);
            return `Record<string, ${valueType}>`;
        }
        else if (typeName === 'ZodUnion') {
            const unionTypes = zodType._def.options.map((option) => processZodType(option));
            return unionTypes.join(' | ');
        }
        else if (typeName === 'ZodIntersection') {
            const leftType = processZodType(zodType._def.left);
            const rightType = processZodType(zodType._def.right);
            return `${leftType} & ${rightType}`;
        }
        else if (typeName === 'ZodLiteral') {
            const literalValue = zodType._def.value;
            return typeof literalValue === 'string' ? `"${literalValue}"` : `${literalValue}`;
        }
        else if (typeName === 'ZodOptional') {
            const optionalType = processZodType(zodType._def.innerType);
            return `${optionalType} | undefined`;
        }
        else if (typeName === 'ZodLazy') {
            if (parents.includes(zodType)) {
                return zodType._def.getter()?.constructor?.name ?? 'unknown';
            }
            parents.push(zodType);
            const lazyType = processZodType(zodType._def.getter());
            parents.pop();
            return lazyType;
        }
        else if (typeName === 'ZodEffects') {
            const effectsType = processZodType(zodType._def.schema);
            return effectsType;
        }
        else {
            console.log(`Unknown zod type: ${typeName}`, schema);
            return 'unknown';
        }
    }
    const typeString = processZodType(schema);
    return `type ${typeName} = ${typeString};`;
}
exports.default = zodSchemaToTypeString;
//# sourceMappingURL=zodSchemaToTypeString.js.map