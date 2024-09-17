import { MongoDocument, User } from '../../RelayTypes'

export default function isCreator(
  user: User,
  document?: MongoDocument & { creator: string }
) {
  console.log(user._id, document?.creator)
  return user._id.toString() === document?.creator
}
