import { User } from '../../../RelayTypes';
interface AuthState {
    ready?: boolean;
    tokens?: {
        refresh: {
            token: string;
            expires: string;
        };
        access: {
            token: string;
            expires: string;
        };
    };
    user?: User;
}
export declare const setTokens: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    refresh: {
        token: string;
        expires: string;
    };
    access: {
        token: string;
        expires: string;
    };
} | undefined, string>, setUser: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<User | undefined, string>, reducer: import("redux").Reducer<AuthState, import("redux").AnyAction>;
export {};
//# sourceMappingURL=authReducer.d.ts.map