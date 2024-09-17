import ArraySelectionController from '@mtyk/frontend/controllers/controllers/ArraySelectionController'
import { uniqBy } from 'lodash'
import assert from '@mtyk/frontend/core/helpers/assertDefined'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'

export interface TabControllerProps {
  tabs: (Record<string, any> & { label: string })[]
}

export default makeController(function TabController(
  props: TabControllerProps
) {
  const { tabs } = props
  assert(
    uniqBy(tabs, 'label').length === tabs.length,
    'Tabs must have unique labels'
  )
  const arraySelectionController = ArraySelectionController.use({
    items: tabs.map(tab => ({ ...tab, _id: tab.label })),
  })
  const api = {
    ...arraySelectionController,
    tabs: arraySelectionController.items.map(item => {
      return {
        ...item,
        isActive: arraySelectionController.isItemSelected(item),
        onPress: async () => {
          await arraySelectionController.setSelectedItem(item)
        },
        onClick: async () => {
          await arraySelectionController.setSelectedItem(item)
        },
      }
    }),
  } as const
  return api
})
