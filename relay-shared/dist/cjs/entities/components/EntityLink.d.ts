import React, { ReactNode } from 'react';
import { Id } from '../../RelayTypes';
import { ClientEntityStr } from '../helpers/useEntityInfo';
declare function EntityLink({ type, colorize, id, noLink, children, style, name: _name, ...rest }: {
    type: ClientEntityStr;
    colorize?: boolean;
    children?: ReactNode;
    noLink?: boolean;
    name?: string;
    style?: React.CSSProperties;
    id: Id;
}): JSX.Element;
declare namespace EntityLink {
    var supportedEntities: string[];
}
export default EntityLink;
//# sourceMappingURL=EntityLink.d.ts.map