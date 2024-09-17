export interface RelayFrontendConfig {
  localStorage: {
    getItem: any
    setItem: any
    removeItem: any
  }
}

const _config: RelayFrontendConfig = {} as any

export default function Config(config?: RelayFrontendConfig) {
  if (config) {
    Object.assign(_config, config)
  }
  return _config
}

export const config = _config
