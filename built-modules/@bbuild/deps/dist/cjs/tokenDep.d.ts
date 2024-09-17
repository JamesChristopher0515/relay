import { TokenDepSpec } from './TokenDepSpec';
export declare const keyDep: <TT, Optional extends boolean = boolean, T extends string = string>(token?: T, opts?: {
    optional?: Optional;
}) => TokenDepSpec<T, TT, Optional> & {
    __baseDep: boolean;
};
export declare const privateDep: <TT, Optional extends boolean = boolean, T extends string = string>(token?: T, opts?: {
    optional?: Optional;
}) => {
    private: boolean;
    token?: T;
    specType: "token";
    runtimeType?: any;
    optional?: Optional;
    __meta: {
        type: TT;
    };
    __baseDep: boolean;
};
export declare const keyArg: <TT, Optional extends boolean = boolean, T extends string = string>(token?: T, opts?: {
    optional?: Optional;
}) => TokenDepSpec<T, TT, Optional> & {
    __baseDep: boolean;
};
//# sourceMappingURL=tokenDep.d.ts.map