import { RelayIconNames } from '../../../frontend/icons/RelayIcons';
import { ReportingStatDataTypes, ReportingStatItem } from '../../../RelaySchema';
export interface StatCollectionHelper<ValueType extends ReportingStatDataTypes, DataType = any> {
    collectionType: string;
    formatStat?: (stat: ReportingStatItem<ValueType, DataType>) => string;
    valueDomain?: {
        min?: number;
        max?: number;
    };
    icon?: RelayIconNames;
}
//# sourceMappingURL=StatCollectionHelper.d.ts.map