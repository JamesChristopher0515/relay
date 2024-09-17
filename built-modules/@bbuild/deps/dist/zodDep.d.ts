import { ZodType, z } from "zod";
export declare const zodDep: <T extends ZodType<any, z.ZodTypeDef, any>, Optional extends boolean = false, Token extends string = string>(schema: T, opts?: {
    token?: Token;
    optional?: Optional;
}) => {
    runtimeType: string;
    schema: T;
    token?: Token;
    specType: "token";
    optional?: Optional;
    __meta: {
        type: z.TypeOf<T>;
    };
    __baseDep: boolean;
};
//# sourceMappingURL=zodDep.d.ts.map