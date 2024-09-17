import useSingleResource from '../../api/hooks/useSingleResource'

export default function useCaseNote(id: string) {
  return useSingleResource('CaseNote', id)
}
