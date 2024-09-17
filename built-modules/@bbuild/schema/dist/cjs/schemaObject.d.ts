import { ZodAny } from "zod";
export declare function setObjectSchema(input: any, { schema, name }: {
    schema: ZodAny;
    name: string;
}): any;
export declare function getObjectSchema(input: any): {
    schema: import("zod").ZodTypeAny;
    name: any;
};
//# sourceMappingURL=schemaObject.d.ts.map