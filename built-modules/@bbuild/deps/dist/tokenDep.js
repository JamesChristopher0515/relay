import baseDep from './baseDep';
export const keyDep = (token, opts = {}) => {
    // If no token provided, should use from path of dep spec object
    return baseDep({
        token,
        specType: 'token',
        optional: opts?.optional,
    });
};
// AI: These generic args need to be kept in sync with above
// to keep typescript happy
export const privateDep = (token, opts = {}) => {
    return {
        ...keyDep(token, opts),
        private: true,
    };
};
export const keyArg = keyDep;
//# sourceMappingURL=tokenDep.js.map