import { MongoDocument } from '../../RelayTypes';
export default function idOrFromObj(objorId: string | MongoDocument | {
    toJSON: () => MongoDocument;
}): string;
//# sourceMappingURL=idOrFromObj.d.ts.map