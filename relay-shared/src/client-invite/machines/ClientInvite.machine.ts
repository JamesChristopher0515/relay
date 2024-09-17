import { globalDepContext as g } from '@bbuild/deps';
import { AxiosError } from 'axios';
import { createStateMachine } from '@bbuild/machine2';
import { asyncLocalStorageDep, wrappedAxiosDep } from '../../core/helpers/clientAppDeps';
import { checkTokens } from './checkTokens';

export type UIAppointmentEdit = {
  time: Date;
  repeat?: string;
};

const ClientInviteMachine = createStateMachine({
  /**
   * On app launch, this should be triggered once, we check existing tokens are valid
   */
  onAppReady: async (opts: any, { transition }) => {
    const { localStorage } = await g.provideDeps({ axios: wrappedAxiosDep, localStorage: asyncLocalStorageDep });
    const tokens = await localStorage.getItem('tokens');
    if (tokens) {
      try {
        const { user, tokens: tokensOut } = await checkTokens(JSON.parse(tokens));
        if (user && tokensOut) {
          return transition('onSetLoggedInWithTokens', { tokens: tokensOut, user });
        }
      } catch (e) {
        console.error(e)
      }
    }
    return transition('onLoginScreen')
  },

  onEnterPassword: async (opts: { email: string }, { transition }) => {
    return opts;
  },

  onLogin: async (opts: { email: string; password: string }, { transition }) => {
    const { email, password } = opts
    const { wrappedAxios } = await g.provideDeps({ wrappedAxios: wrappedAxiosDep });
    const result = await wrappedAxios.post(`/auth/login`, {
      email,
      password,
    })
    if (result.status === 200) {
      return transition('onSetLoggedInWithTokens', result.data)
    }
    throw new Error('Error logging in')
  },

  inviteSent: async (opts: { email: string }, { transition }) => {
    return opts;
  },

  onSubmitEmail: async (opts: { email: string }, { transition }) => {
    const { wrappedAxios } = await g.provideDeps({ wrappedAxios: wrappedAxiosDep });
    try {
      const response = await wrappedAxios.get('/users/check-setup', {
        params: {
          email: opts.email,
        }
      });

      if (response.status === 200) {
        if (response.data.inviteAccepted) {
          // User is setup, enter password
          return transition('onEnterPassword', opts)
        } else {
          // An invite has been sent
          return transition('inviteSent', opts);
        }
      }
    } catch (e) {
      console.error(e)
    }

    return transition('onContinueWithEmail', opts);
  },

  onSetLoggedInWithTokens: async (opts: { tokens: any; user: any }, { transition }) => {
    const { localStorage } = await g.provideDeps({ axios: wrappedAxiosDep, localStorage: asyncLocalStorageDep });
    await localStorage.setItem('tokens', JSON.stringify(opts.tokens))
    return opts;
  },

  onContinueWithUser: async (opts: { user; verifyToken }, { transition }) => {
    return opts;
  },

  onContinueWithEmail: async (opts: {
    email: string
  }, { transition }) => {
    return opts
  },

  onContinueWithVerifyToken: async (opts: {
    token: string
  }, { transition }) => {
    return opts
  },

  onSetPassword: async (
    opts: {
      verifyToken: any;
      user: any;
      password: string;
    },
    { transition }
  ) => {
    const { verifyToken, user, password } = opts;
    const { wrappedAxios } = await g.provideDeps({ wrappedAxios: wrappedAxiosDep });

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
  onLoginScreen: async (opts: any, { transition }) => {
    const { wrappedAxios } = await g.provideDeps({ wrappedAxios: wrappedAxiosDep });
    try {
      const link = await wrappedAxios.get('/client-temp-link');
      const { user, token: verifyToken } = link.data;
      return [{ verifyToken, user }];
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response?.status === 404) {
          return [null];
        }
      }
      throw e
    }
  },
},
  {
    globalState: {},
  });

export default ClientInviteMachine;