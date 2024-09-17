import { Id } from '../../RelayTypes';
import { EntityKey } from '../../RelayTypes';
declare function useEntityLink({ type, id, name: _name, }: {
    type: EntityKey;
    name?: string;
    id: Id;
}): {
    url?: string;
    text: string;
};
declare namespace useEntityLink {
    var supportedEntities: string[];
}
export default useEntityLink;
//# sourceMappingURL=useEntityLink.d.ts.map