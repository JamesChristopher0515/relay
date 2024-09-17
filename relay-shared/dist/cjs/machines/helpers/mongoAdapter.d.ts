import { IEntityManager } from '@mtyk/universe/entity-manager/IEntityManager';
export declare function attachMongoAdapter(entityManager: IEntityManager<any>, config: {
    model: any;
    filter: (method: string, selector: any, update?: any) => Promise<any>;
}): void;
//# sourceMappingURL=mongoAdapter.d.ts.map