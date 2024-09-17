type Types = typeof String | typeof Number | typeof Boolean | typeof Function;
type InferType<T extends Types> = T extends typeof String ? string : T extends typeof Number ? number : T extends typeof Boolean ? boolean : T extends typeof Function ? Function : never;
/**
 * @deprecated probably best using zodDep, very restrictive
 * @example
 * const depString = typeDep(String);
 * const depNumber = typeDep(Number);
 * const depBoolean = typeDep(Boolean);
 */
export declare const typeDep: <T extends Types, Optional extends boolean = boolean, Token extends string = string>(typeConstructor: T, opts?: {
    token?: Token;
    optional?: Optional;
}) => {
    runtimeType: string;
    token?: Token;
    specType: "token";
    optional?: Optional;
    __meta: {
        type: InferType<T>;
    };
    __baseDep: boolean;
} & {
    __baseDep: boolean;
};
export {};
//# sourceMappingURL=typeDep.d.ts.map