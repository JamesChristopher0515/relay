// import PagerView from 'react-native-pager-view';
import {
  IndicatorViewPager,
  PagerDotIndicator,
} from '@shankarmorwal/rn-viewpager'
import { CheckInViewController } from 'check-in/controllers/CheckInViewController'
import PageLayout from 'core/components/layout/PageLayout'
import FeelingIcon from 'feelings/components/FeelingIcon'
import { chunk } from 'lodash'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import { border } from '@mtyk/frontend/styles/helpers/styleObjects'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import React from 'react'
import { FlatList, TextInput, View } from 'react-native'
import ReasonIcon from 'reasons/components/ReasonIcon'
import { CheckInFeeling } from 'relay-shared/clients/components/CheckInFeeling'
import { ViewControllerProps } from '@mtyk/frontend/controllers/helpers/makeController'
import getAllFeelings, {
  getFeelingName,
} from 'relay-shared/feelings/helpers/getAllFeelings'
import getAllReasons from 'relay-shared/reasons/helpers/getAllReasons'
import getReasonName from 'relay-shared/reasons/helpers/getReasonName'
import CheckInBackForward from './CheckInBackForward'
import { renderFeeling } from './renderFeeling'
import { renderReason } from './renderReason'
import Styles from './Styles'

const CheckInItemPicker: React.FC<
  ViewControllerProps<typeof CheckInViewController> & {
    select: 'feelings' | 'reasons'
  }
> = (props) => {
  const columnCount = 4
  const rowCount = 4
  const itemsPerPage = rowCount * columnCount
  const sortedFeelings = getAllFeelings().sort((a, b) => {
    if (props.initialFeeling.valence <= 0.2) {
      return a.valence - b.valence
    } else {
      return b.valence - a.valence
    }
  })
  const items = props.select === 'feelings' ? sortedFeelings : getAllReasons()
  const pagedItems = chunk(items, itemsPerPage)
  const dimensions = useDimensions()

  const itemPickerStyle = { height: 320 }
  const selectedFeeling = props.getSelectedFeeling()
  const selectedReason = props.getSelectedReason()
  const txt =
    props.select === 'feelings'
      ? `Would you like to add anything more specific?`
      : `Is there anything specific causing you to feel this way?`

  function WrapPicker(children) {
    return (
      <View style={Styles.bottomSecondWrapper}>
        <View style={Styles.keyOneContainer}>{children}</View>
      </View>
    )
  }
  const rendererFn = props.select === 'feelings' ? renderFeeling : renderReason
  const ellipsisStr = (str: string, max: number) => {
    if (str.length > max) {
      return str.slice(0, max) + '...'
    }
    return str
  }
  return (
    <PageLayout hideNavigation hideSettings avoidKeyboard>
      <Txt
        semibold
        style={Styles.headingTxt}
        color={'#777'}
        size={18}
        style={{ marginTop: 20 }}
      >
        {props.secondGreeting}
        {'\n\n'}
        {txt}
      </Txt>
      <Txt style={Styles.headingTxt} color={'#777'}></Txt>

      <View style={Styles.anotherEmojiWrapper}>
        <Flex center gap={10}>
          <FeelingIcon
            feeling={selectedFeeling.name}
            style={Styles.centerSecondImage1}
          />
          <Txt center size={15} medium color={'#777'}>
            {getFeelingName(selectedFeeling)}
          </Txt>
        </Flex>

        {props.select === 'reasons' ? (
          <Flex center gap={10}>
            {!selectedReason || selectedReason.name === 'custom' ? (
              <View
                style={[
                  Styles.centerSecondCircle,
                  { backgroundColor: '#F5E8E1' },
                ]}
              />
            ) : (
              <ReasonIcon
                reason={selectedReason.name}
                style={Styles.centerSecondCircle}
              />
            )}
            {selectedReason ? (
              <Txt center size={15} medium color={'#777'}>
                {ellipsisStr(getReasonName(selectedReason), 10)}
              </Txt>
            ) : null}
          </Flex>
        ) : null}
      </View>
      <Flex grow />

      <Flex grow justifyContent="flex-end" style={{ marginBottom: -43 }}>
        <CheckInBackForward checkInViewController={props} />
        <Flex>
          <IndicatorViewPager
            style={{
              justifyContent: 'flex-end',
              width: dimensions.width,
              alignSelf: 'center',
              ...itemPickerStyle,
            }}
            indicator={
              <PagerDotIndicator
                pageCount={pagedItems.length}
                selectedDotStyle={Styles.selectedDotStyle}
                dotStyle={Styles.emptyDotStyle}
              />
            }
          >
            {pagedItems.map((items, i, arr) => {
              return WrapPicker(
                <FlatList
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  data={items}
                  keyExtractor={(_item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return rendererFn(item, index, props)
                  }}
                  numColumns={columnCount}
                />
              )
            })}
          </IndicatorViewPager>
          {props.select === 'reasons' && selectedReason?.name === 'custom' ? (
            <View
              style={{
                position: 'absolute',
                top: 20,
                borderRadius: 15,
                backgroundColor: 'white',
                left: 0,
                right: 0,
                height: 170,
                paddingVertical: 20,
                paddingHorizontal: 20,
                ...border(1, '#DADADA'),
              }}
            >
              <Txt>
                Today I am <CheckInFeeling checkInObj={props.newCheckInDoc} />{' '}
                because
              </Txt>
              <TextInput
                autoFocus
                style={{ fontSize: 17, marginTop: 10 }}
                value={props.getSelectedReason().custom}
                placeholder={'Tap to start writing...'}
                placeholderTxtColor={'rgba(0, 0, 0, 0.2)'}
                autoCapitalize="none"
                autoCorrect={false}
                multiline={true}
                onChangeText={props.setCustomReason}
              />
            </View>
          ) : null}
        </Flex>
      </Flex>
    </PageLayout>
  )
}
export default CheckInItemPicker
