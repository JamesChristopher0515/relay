import { Txt } from '@mtyk/frontend/core/components';
import Link from 'next/link';
import React from 'react';
import useEntityInfo from '../helpers/useEntityInfo';
export default function EntityLink({ type, colorize, id, noLink, children, style, name: _name, ...rest }) {
    const info = useEntityInfo(type, id);
    const { data } = info.hook?.(id) ?? { data: undefined };
    if (!info) {
        return React.createElement(Txt, null, "Unsupported entity");
    }
    const name = _name ?? (data ? info.getShortName?.(data) ?? data.name : '');
    if (info.url && !noLink) {
        const url = typeof info.url === 'string'
            ? `${info.url}/${id}`
            : data
                ? info.url(data)
                : '';
        return (React.createElement(Link, { href: url },
            React.createElement("a", { ...rest, css: `
            color: ${colorize ? '#74b6f2' : 'inherit'};
            cursor: pointer;
            font-weight: 500;
            &:hover {
              text-decoration: underline;
            }
          `, style: { ...style } }, children ?? name)));
    }
    else {
        return (React.createElement(Txt, { css: `
          color: ${colorize ? '#74b6f2' : 'inherit'};
          cursor: pointer;
          font-weight: 500;
        `, style: { ...style } }, name));
    }
}
EntityLink.supportedEntities = [
    'questionnaire',
    'questionnaire-result',
    'todo',
    'content',
    'client',
    'journey',
];
//# sourceMappingURL=EntityLink.js.map