import {
  useGetClientWorksheetQuery,
  useGetWorksheetQuery,
} from '../../frontend/api/hooks/useApi'

export default function useClientWorksheet(clientWorksheetId?: string) {
  const { data: clientWorksheet } = useGetClientWorksheetQuery(
    clientWorksheetId!,
    { skip: !clientWorksheetId }
  )
  const { data: worksheet } = useGetWorksheetQuery(clientWorksheet!.worksheet, {
    skip: !clientWorksheet?.worksheet,
  })
  return {
    worksheet,
    clientWorksheet,
    isReady: !clientWorksheet || !worksheet,
  }
}
