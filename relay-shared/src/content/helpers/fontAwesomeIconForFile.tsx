import { Content } from '../../RelayTypes'
import * as FA from '@fortawesome/free-solid-svg-icons'

const iconsMap: { [key: string]: FA.IconDefinition } = {
  // Media
  image: FA.faFileImage,
  audio: FA.faFileAudio,
  video: FA.faFileVideo,
  // Documents
  'application/pdf': FA.faFilePdf,
  'application/msword': FA.faFileWord,
  'application/vnd.ms-word': FA.faFileWord,
  'application/vnd.oasis.opendocument.text': FA.faFileWord,
  'application/vnd.openxmlformats-officedocument.wordprocessingml':
    FA.faFileWord,
  'application/vnd.ms-excel': FA.faFileExcel,
  'application/vnd.openxmlformats-officedocument.spreadsheetml': FA.faFileExcel,
  'application/vnd.oasis.opendocument.spreadsheet': FA.faFileExcel,
  'application/vnd.ms-powerpoint': FA.faFilePowerpoint,
  'application/vnd.openxmlformats-officedocument.presentationml':
    FA.faFilePowerpoint,
  'application/vnd.oasis.opendocument.presentation': FA.faFilePowerpoint,
  'text/plain': FA.faFileAlt,
  'text/html': FA.faFileCode,
  'application/json': FA.faFileCode,
  // Archives
  'application/gzip': FA.faFileArchive,
  'application/zip': FA.faFileArchive,
}

export function getFontAwesomeIconFromMIME(
  mimeType: string
): FA.IconDefinition {
  // List of official MIME Types: http://www.iana.org/assignments/media-types/media-types.xhtml

  const candidate = Object.entries(iconsMap).find(([k]) =>
    mimeType.startsWith(k)
  )

  if (candidate === undefined) {
    return FA.faFile
  } else {
    return candidate[1]
  }
}

export default function fontAwesomeIconForFile(file: Content['file']['file']) {
  return getFontAwesomeIconFromMIME(file.mimetype ?? '')
}
