import { MTYKIcon } from '@mtyk/frontend/core/components/Icon';
import type { EntityKey, EntityTypeMap } from '../../RelayTypes';
export { EntityTypeMap };
/** @deprecated Prefer `EntityKey` from '../../RelayTypes' */
export type ClientEntityStr = EntityKey;
export default function useEntityInfo(entity: ClientEntityStr, id?: string): {
    name: string;
    /** Whether this entity can be opened in the resource manager */
    canOpenInResourceManager?: boolean | undefined;
    getShortName?: ((doc: any) => string) | undefined;
    url?: string | ((doc: any) => string) | undefined;
    hook?: any;
    hookMultiple?: any;
    plural: string;
    getImageUrl?: ((doc: any) => string) | undefined;
    icon?: MTYKIcon | undefined;
};
//# sourceMappingURL=useEntityInfo.d.ts.map