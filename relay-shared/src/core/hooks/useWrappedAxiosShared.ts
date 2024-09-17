import useRContext from './useRContext'
import { AxiosResponse } from 'axios'

export type WrappedAxios = {
  get: (url: string, config?: any) => Promise<AxiosResponse>
  post: (url: string, data?: any, config?: any) => Promise<AxiosResponse>
  put: (url: string, data?: any, config?: any) => Promise<AxiosResponse>
  delete: (url: string, config?: any) => Promise<AxiosResponse>
  patch: (url: string, data?: any, config?: any) => Promise<AxiosResponse>
}

export default function useWrappedAxiosShared() {
  const context = useRContext()
  return context.platformHooks.useWrappedAxios()
}
