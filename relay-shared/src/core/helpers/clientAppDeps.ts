import { keyDep } from '@bbuild/deps'
import { WrappedAxios } from '../hooks/useWrappedAxiosShared'

export const wrappedAxiosDep = keyDep<WrappedAxios>('wrappedAxios')
export const asyncLocalStorageDep = keyDep<{
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
}>('localStorage')

export const LinkingDep = keyDep<{ openURL: (url: string) => void }>('Linking')