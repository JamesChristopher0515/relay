import { isDev } from '@mtyk/frontend/core/helpers'
import * as WebBrowser from 'expo-web-browser'
import { config } from 'relay-shared/frontend/core/helpers/config'

export default function loginInBrowser(path: string = '/') {
  const { localStorage } = config
  const tokens = localStorage.getItem('tokens')
  const user = localStorage.getItem('user')

  const bareUrl = isDev() ? 'http://localhost:3000' : 'https://relay.mtyk.co.uk'
  const link = `${bareUrl}${path}?login=${encodeURIComponent(
    JSON.stringify({ tokens, user })
  )}`

  return {
    link,
    open: async () => {
      await WebBrowser.openBrowserAsync(link, {
        showTitle: false,
        dismissButtonStyle: 'close',
        readerMode: true,
      })
    },
  }
}
