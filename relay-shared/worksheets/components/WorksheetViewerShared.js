import { Flex } from '@mtyk/frontend/core/components';
import compose from '@mtyk/frontend/react/helpers/compose';
import React from 'react';
import { RC } from '../../core/components/RC';
import { useGetWorksheetQuery } from '../../frontend/api/hooks/useApi';
import getAllWorksheetItems from '../helpers/getAllWorksheetItems';
function WorksheetViewerInner({ worksheet, clientWorksheet, }) {
    const allItmes = getAllWorksheetItems(worksheet);
    return (React.createElement(Flex, null, allItmes.map((item, index) => {
        const { type } = item;
    })));
}
export default compose()(function WorksheetViewerShared(props) {
    const { clientWorksheet } = props;
    const { data: worksheet } = useGetWorksheetQuery(clientWorksheet.worksheet);
    if (!worksheet) {
        return React.createElement(RC, { name: "loading" });
    }
    return (React.createElement(Flex, null,
        React.createElement(WorksheetViewerInner, { worksheet: worksheet, clientWorksheet: clientWorksheet })));
});
//# sourceMappingURL=WorksheetViewerShared.js.map