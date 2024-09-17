import _, { get, groupBy, orderBy } from 'lodash'

export default function groupContentAZ(contentLikeArr: any[], field = 'name') {
  const sortedContent = orderBy(contentLikeArr, [field, 1])
  const groupedByFirstChar = groupBy(
    sortedContent,
    (d) => get(d, field).toUpperCase()[0]
  )
  const sections = _(groupedByFirstChar)
    .toPairs()
    .map(([k, v]) => {
      return {
        title: k,
        data: v,
      }
    })
    .value()
  return sections
}
