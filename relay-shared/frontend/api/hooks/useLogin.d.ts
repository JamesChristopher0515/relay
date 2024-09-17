export default function useLogin(): readonly [({ email, password, }: {
    email: string;
    password: string;
}) => Promise<void>, {
    error: any;
    isLoading: boolean;
    loginWithTokensUser: (tokens: any, user: any) => Promise<void>;
}];
//# sourceMappingURL=useLogin.d.ts.map