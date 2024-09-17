import { IEntityManager } from '@mtyk/universe/entity-manager/IEntityManager'

export function attachMongoAdapter(
  entityManager: IEntityManager<any>,
  config: {
    model: any
    filter: (method: string, selector: any, update?: any) => Promise<any>
  }
) {
  // Attach middleware that will filter all queries
  entityManager._middleware.push({
    process: async (fn: string, args: any[]) => {
      if (fn === 'findEntities') {
        const [type, query, machine] = args
      } else if (fn === 'getEntity') {
        const [id] = args
      } else if (fn === 'createEntity') {
        const [type] = args
      } else if (fn === 'transitionEntity') {
        const [entityId, transition, machine] = args
      } else {
        throw new Error(`Unknown method ${fn}`)
      }
      throw new Error('Not implemented')
    },
  })
}
