import { Flex } from '@mtyk/frontend/core/components'
import compose from '@mtyk/frontend/react/helpers/compose'
import React from 'react'
import { RC } from '../../core/components/RC'
import { useGetWorksheetQuery } from '../../frontend/api/hooks/useApi'
import { ClientWorksheet, Worksheet } from '../../RelayTypes'
import getAllWorksheetItems from '../helpers/getAllWorksheetItems'

export interface WorksheetViewerSharedProps {
  clientWorksheet: ClientWorksheet
}
export interface WorksheetViewerSharedRefHandle {}

function WorksheetViewerInner({
  worksheet,
  clientWorksheet,
}: {
  worksheet: Worksheet
  clientWorksheet: ClientWorksheet
}) {
  const allItmes = getAllWorksheetItems(worksheet)
  return (
    <Flex>
      {allItmes.map((item, index) => {
        const { type } = item
      })}
    </Flex>
  )
}

export default compose()(function WorksheetViewerShared(
  props: WorksheetViewerSharedProps
) {
  const { clientWorksheet } = props
  const { data: worksheet } = useGetWorksheetQuery(clientWorksheet.worksheet)

  if (!worksheet) {
    return <RC name="loading" />
  }

  return (
    <Flex>
      <WorksheetViewerInner
        worksheet={worksheet}
        clientWorksheet={clientWorksheet}
      />
    </Flex>
  )
})
