import useEntityInfo from '../helpers/useEntityInfo';
export default function useEntityLink({ type, id, name: _name, }) {
    const info = useEntityInfo(type, id);
    const { data } = info.hook?.(id) ?? { data: undefined };
    if (!info) {
        return { text: 'Unsupported entity' };
    }
    const name = _name ?? (data ? info.getShortName?.(data) ?? data.name : '');
    if (info.url) {
        const url = typeof info.url === 'string'
            ? `${info.url}/${id}`
            : data
                ? info.url(data)
                : '';
        return { url, text: name };
    }
    else {
        return { text: name };
    }
}
useEntityLink.supportedEntities = [
    'questionnaire',
    'questionnaire-result',
    'todo',
    'content',
    'client',
    'journey',
];
//# sourceMappingURL=useEntityLink.js.map