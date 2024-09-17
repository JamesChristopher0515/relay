/**
 * Compare ids in a safe way on backend and frontend, regardless
 * of whether ObjectId type or string
 */
export default function idEq(a: any, b: any): boolean;
export declare function findId<D extends {
    _id: any;
}>(arr: D[], id: any): [D, number];
//# sourceMappingURL=idEq.d.ts.map