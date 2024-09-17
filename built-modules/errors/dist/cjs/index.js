"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invariant = exports.publicInvariant = exports.apiAssert = exports.isApiError = exports.ApiError = exports.assertIsDefined = exports.assert = exports.InternalServerError = exports.BadRequestError = exports.ConflictError = exports.ValidationError = exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
    }
}
exports.BadRequestError = BadRequestError;
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InternalServerError';
    }
}
exports.InternalServerError = InternalServerError;
function assert(condition, message) {
    if (!condition) {
        throw new Error(message ?? 'Assertion failed');
    }
    return condition;
}
exports.assert = assert;
function assertIsDefined(value, message) {
    return assert(typeof value !== undefined, message ?? 'Value is undefined');
}
exports.assertIsDefined = assertIsDefined;
class ApiError extends Error {
    status;
}
exports.ApiError = ApiError;
function isApiError(error) {
    return error instanceof ApiError;
}
exports.isApiError = isApiError;
/** Use this if you want your assertion to be publically viewable in user-facing code */
const apiAssert = (condition, message, status) => {
    // At some point, at the below when we have time to test
    // if (typeof condition !== 'boolean') {
    //   throw new Error('Condition must be a boolean')
    // }
    // For now, let's check if the condition is a promise. That could be a common mistake.
    if (condition instanceof Promise) {
        throw new Error('Condition must be a boolean, not a promise');
    }
    if (!condition) {
        const err = new ApiError(message ?? 'Assertion failed');
        err.status = status;
        throw err;
    }
};
exports.apiAssert = apiAssert;
exports.publicInvariant = exports.apiAssert;
exports.invariant = assert;
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["errors"]) {
    console.warn(`Duplicate module errors imported. This can lead to bugs.`);
}
globalStore["errors"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map