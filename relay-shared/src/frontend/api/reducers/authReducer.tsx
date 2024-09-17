import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../../RelayTypes'

interface AuthState {
  ready?: boolean
  tokens?: {
    refresh: { token: string; expires: string }
    access: { token: string; expires: string }
  }
  user?: User
}

const initialState = {
  ready: false,
} as AuthState

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<AuthState['tokens']>) {
      state.tokens = action.payload
    },
    setUser(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload
    },
  },
})

export const {
  actions: { setTokens, setUser },
  reducer,
} = slice
