export default function baseDep<T>(dep: T): T & {
    __baseDep: boolean;
};
export declare function isDep<T>(dep: any): dep is T;
//# sourceMappingURL=baseDep.d.ts.map