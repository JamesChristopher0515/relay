import { config } from '@mtyk/frontend/core/helpers/config';
export function fileUrl(fileId, imgsrc = false) {
    if (!fileId) {
        return '';
    }
    const url = `${config.apiUrl}/files/${fileId}`;
    return imgsrc ? `url('${url}')` : url;
}
export default function useFile(fileId) {
    return {
        url: fileUrl(fileId),
        empty: typeof fileId !== 'string',
    };
}
//# sourceMappingURL=useFile.js.map