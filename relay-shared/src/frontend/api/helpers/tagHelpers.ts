import { PaginatedQueryOpts } from './apiTypes'
import tagTypes from './tagTypes'

export const tagsForMany = (
  type: typeof tagTypes[number],
  result: any,
  error: any,
  opts: PaginatedQueryOpts
) => {
  if (error) {
    return []
  }
  const { data, meta } = result
  return [
    {
      type,
      id: JSON.stringify(opts),
    },
    ...data.map(p => {
      return {
        type,
        id: p.id,
      }
    }),
  ]
}
export const tagsForSingle = (
  type: typeof tagTypes[number],
  result: any,
  error: any,
  id: string
) => {
  if (error) {
    return []
  }
  return [
    {
      type,
      id,
    },
  ]
}
