import { config } from '@mtyk/frontend/core/helpers/config'
import { Id } from '../../RelayTypes'

export function fileUrl(fileId?: Id, imgsrc = false) {
  if (!fileId) {
    return ''
  }
  const url = `${config.apiUrl}/files/${fileId}`
  return imgsrc ? `url('${url}')` : url
}

export default function useFile(fileId?: string) {
  return {
    url: fileUrl(fileId),
    empty: typeof fileId !== 'string',
  }
}
