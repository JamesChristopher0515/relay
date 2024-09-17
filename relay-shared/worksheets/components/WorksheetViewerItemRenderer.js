import { Txt } from '@mtyk/frontend/core/components';
import React from 'react';
import { RenderWorksheetItem } from './ColumnsWrap';
export default function WorksheetViewerItemRenderer({ worksheet, clientWorksheet, item, }) {
    const { type } = item;
    switch (type) {
        case 'message':
            return React.createElement(Txt, null, item.data.message);
        case 'worksheet':
            return (React.createElement(RenderWorksheetItem, { item: item, clientWorksheet: clientWorksheet }));
        default:
            throw new Error(`Unknown worksheet item type: ${type}`);
    }
}
//# sourceMappingURL=WorksheetViewerItemRenderer.js.map