import { MongoDocument } from '../../RelayTypes'

export default function idOrFromObj(
  objorId: string | MongoDocument | { toJSON: () => MongoDocument }
) {
  return typeof objorId === 'string'
    ? objorId
    : '_id' in objorId
    ? objorId._id.toString()
    : objorId.toJSON()._id
}
