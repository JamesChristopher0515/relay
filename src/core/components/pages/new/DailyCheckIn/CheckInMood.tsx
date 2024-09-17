import { Flex, Txt } from '@mtyk/frontend/core/components'
import { CheckInViewController } from 'check-in/controllers/CheckInViewController'
import PageLayout from 'core/components/layout/PageLayout'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { RC } from 'relay-shared/core/components/RC'
import { ViewControllerProps } from '@mtyk/frontend/controllers/helpers/makeController'
import {
  getFeelingName,
  getSimpleFeelings,
} from 'relay-shared/feelings/helpers/getAllFeelings'
import CheckInBackForward from './CheckInBackForward'

type IProps = {
  navigation: any
}

const DailyCheckIn: React.FC<IProps> = (
  props: ViewControllerProps<typeof CheckInViewController>
) => {
  const { initialFeeling, setInitialFeeling, setFeeling } = props

  const selectItem = (item, key) => {
    const feelingArr = getSimpleFeelings()
    const relayFeeling = feelingArr[key]
    setFeeling(relayFeeling)
    setInitialFeeling(relayFeeling)
  }

  return (
    <PageLayout hideNavigation>
      <Flex center grow gap={50}>
        <Txt color={'#777'} bold size={18} style={{ maxWidth: 180 }} center>
          {props.greeting}
        </Txt>
        <Flex gap={10} center>
          <RC
            name="FeelingIcon"
            feeling={props.initialFeeling.name}
            size={80}
          />
          <Txt center bold size={16} color={'#777'}>
            {getFeelingName(props.initialFeeling)}
          </Txt>
        </Flex>
      </Flex>
      <CheckInBackForward checkInViewController={props} />
      <Flex
        rowCenter
        style={{
          backgroundColor: 'white',
          borderRadius: 30,
          paddingBottom: 50,
          marginBottom: -50,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        {getSimpleFeelings().map((item, index) => {
          const isSelected = item.name === initialFeeling.name
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  selectItem(item, index)
                }}
                style={{ width: '20%' }}
              >
                <Flex center gap={5}>
                  <RC
                    name="FeelingIcon"
                    feeling={item.name}
                    size={isSelected ? 30 : 28}
                  />
                  <Txt semibold center size={13}>
                    {getFeelingName(item)}
                  </Txt>
                </Flex>
              </TouchableOpacity>
            </>
          )
        })}
      </Flex>
    </PageLayout>
  )
}
export default DailyCheckIn
