import { useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { toast } from '../../../core/helpers/toast';
import { config } from '../../core/helpers/config';
import { setTokens, setUser } from '../reducers/authReducer';
import { useClearAllMutation, wrappedAxios } from './useApi';
export default function useLogin() {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clear] = useClearAllMutation();
    const loginWithTokensUser = async function (tokens, user) {
        const { localStorage } = config;
        setLoading(true);
        setError(null);
        try {
            await localStorage.setItem('tokens', JSON.stringify(tokens));
            await localStorage.setItem('user', JSON.stringify(user));
            batch(() => {
                dispatch(setTokens(tokens));
                dispatch(setUser(user));
                clear().catch((e) => console.error(e));
            });
        }
        catch (e) {
            console.error(e);
            toast('error', (e instanceof Error ? e.message : null) ?? String(e));
            setError(e);
        }
        setLoading(false);
    };
    const loginFunc = async function ({ email, password, }) {
        const { localStorage } = config;

        console.log("i am running")


        setLoading(true);
        setError(null);
        try {
            const { data: { user, tokens }, } = await wrappedAxios.post('/auth/login', {
                email,
                password,
            });

            console.log({ user, tokens, })


            await loginWithTokensUser(tokens, user);
        }
        catch (e) {
            console.error(e);
            toast('error', (e instanceof Error ? e.message : null) ?? String(e));
            setError(e);
        }
        setLoading(false);
    };
    const extra = {
        error,
        isLoading: loading,
        loginWithTokensUser,
    };
    return [loginFunc, extra];
}
//# sourceMappingURL=useLogin.js.map