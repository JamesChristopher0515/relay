export declare class NotFoundError extends Error {
    constructor(message?: string);
}
export declare class ValidationError extends Error {
    constructor(message?: string);
}
export declare class ConflictError extends Error {
    constructor(message?: string);
}
export declare class BadRequestError extends Error {
    constructor(message?: string);
}
export declare class InternalServerError extends Error {
    constructor(message?: string);
}
export declare function assert(condition: boolean, message?: string): condition is true;
export declare function assertIsDefined<T>(value: T | undefined, message?: string): value is T;
export declare class ApiError extends Error {
    status?: number;
}
export declare function isApiError<E extends Error>(error: E): boolean;
type Assert = (condition: unknown, message?: string, status?: number) => asserts condition;
/** Use this if you want your assertion to be publically viewable in user-facing code */
export declare const apiAssert: Assert;
export declare const publicInvariant: Assert;
export declare const invariant: Assert;
export {};
//# sourceMappingURL=index.d.ts.map