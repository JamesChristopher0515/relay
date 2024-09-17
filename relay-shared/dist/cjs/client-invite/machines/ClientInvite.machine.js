"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deps_1 = require("@bbuild/deps");
const axios_1 = require("axios");
const machine2_1 = require("@bbuild/machine2");
const clientAppDeps_1 = require("../../core/helpers/clientAppDeps");
const checkTokens_1 = require("./checkTokens");
const ClientInviteMachine = (0, machine2_1.createStateMachine)({
    /**
     * On app launch, this should be triggered once, we check existing tokens are valid
     */
    onAppReady: async (opts, { transition }) => {
        const { localStorage } = await deps_1.globalDepContext.provideDeps({ axios: clientAppDeps_1.wrappedAxiosDep, localStorage: clientAppDeps_1.asyncLocalStorageDep });
        const tokens = await localStorage.getItem('tokens');
        if (tokens) {
            try {
                const { user, tokens: tokensOut } = await (0, checkTokens_1.checkTokens)(JSON.parse(tokens));
                if (user && tokensOut) {
                    return transition('onSetLoggedInWithTokens', { tokens: tokensOut, user });
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        return transition('onLoginScreen');
    },
    onEnterPassword: async (opts, { transition }) => {
        return opts;
    },
    onLogin: async (opts, { transition }) => {
        const { email, password } = opts;
        const { wrappedAxios } = await deps_1.globalDepContext.provideDeps({ wrappedAxios: clientAppDeps_1.wrappedAxiosDep });
        const result = await wrappedAxios.post(`/auth/login`, {
            email,
            password,
        });
        if (result.status === 200) {
            return transition('onSetLoggedInWithTokens', result.data);
        }
        throw new Error('Error logging in');
    },
    inviteSent: async (opts, { transition }) => {
        return opts;
    },
    onSubmitEmail: async (opts, { transition }) => {
        const { wrappedAxios } = await deps_1.globalDepContext.provideDeps({ wrappedAxios: clientAppDeps_1.wrappedAxiosDep });
        try {
            const response = await wrappedAxios.get('/users/check-setup', {
                params: {
                    email: opts.email,
                }
            });
            if (response.status === 200) {
                if (response.data.inviteAccepted) {
                    // User is setup, enter password
                    return transition('onEnterPassword', opts);
                }
                else {
                    // An invite has been sent
                    return transition('inviteSent', opts);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
        return transition('onContinueWithEmail', opts);
    },
    onSetLoggedInWithTokens: async (opts, { transition }) => {
        const { localStorage } = await deps_1.globalDepContext.provideDeps({ axios: clientAppDeps_1.wrappedAxiosDep, localStorage: clientAppDeps_1.asyncLocalStorageDep });
        await localStorage.setItem('tokens', JSON.stringify(opts.tokens));
        return opts;
    },
    onContinueWithUser: async (opts, { transition }) => {
        return opts;
    },
    onContinueWithEmail: async (opts, { transition }) => {
        return opts;
    },
    onContinueWithVerifyToken: async (opts, { transition }) => {
        return opts;
    },
    onSetPassword: async (opts, { transition }) => {
        const { verifyToken, user, password } = opts;
        const { wrappedAxios } = await deps_1.globalDepContext.provideDeps({ wrappedAxios: clientAppDeps_1.wrappedAxiosDep });
        const response = await wrappedAxios.post('/users/setup', {
            token: verifyToken,
            password,
        });
        // Now login automatically
        const loggedInResponse = await wrappedAxios.post('/auth/login', {
            email: response.data.email,
            password,
        });
        return transition('onSetLoggedInWithTokens', loggedInResponse.data);
    },
    /**
     * Does a check to see if the same ip has recently been visited. If so, returns the user and token
     * to be used to setup the account. If not, returns null
     */
    onLoginScreen: async (opts, { transition }) => {
        const { wrappedAxios } = await deps_1.globalDepContext.provideDeps({ wrappedAxios: clientAppDeps_1.wrappedAxiosDep });
        try {
            const link = await wrappedAxios.get('/client-temp-link');
            const { user, token: verifyToken } = link.data;
            return [{ verifyToken, user }];
        }
        catch (e) {
            if (e instanceof axios_1.AxiosError) {
                const { response } = e;
                if (response?.status === 404) {
                    return [null];
                }
            }
            throw e;
        }
    },
}, {
    globalState: {},
});
exports.default = ClientInviteMachine;
//# sourceMappingURL=ClientInvite.machine.js.map