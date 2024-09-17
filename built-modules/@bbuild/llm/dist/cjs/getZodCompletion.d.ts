import { ZodSchema } from 'zod';
export declare function getZodCompletion<T>({ schema, name }: {
    schema: ZodSchema<T>;
    name: string;
}, prompt: string, ...rest: any[]): Promise<T>;
//# sourceMappingURL=getZodCompletion.d.ts.map