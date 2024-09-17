import { useGetAssignedResourceQuery } from 'relay-shared/frontend/api/hooks/useApi'

export default function ResourceBeforeAfter({
  assignedResourceId,
}: {
  assignedResourceId: string
}) {
  const assignedResource = useGetAssignedResourceQuery(assignedResourceId)

  const { before, after } = assignedResource
}
