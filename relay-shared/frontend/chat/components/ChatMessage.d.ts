import React, { ReactNode } from 'react';
import { User } from '../../../RelayTypes';
export default function ChatMessage({ message, user, messageBoxStyles, ...rest }: {
    message: {
        lastInGroup?: boolean;
        createdAt?: Date;
        from?: string;
        lastInDay?: Date;
        content: ReactNode;
    };
    messageBoxStyles?: React.CSSProperties;
    user: User;
    style?: any;
}): JSX.Element;
//# sourceMappingURL=ChatMessage.d.ts.map