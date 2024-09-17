import { MongoDocument, User } from '../../RelayTypes';
export default function isCreator(user: User, document?: MongoDocument & {
    creator: string;
}): boolean;
//# sourceMappingURL=isCreator.d.ts.map