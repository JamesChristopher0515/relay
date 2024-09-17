import React from 'react'
import { FlatList, Image, Text, TextInput, View } from 'react-native'
import Images from '../Images/Images'
import Styles from './Styles'

export function renderCustomEdit(
  description: any,
  setDescription: React.Dispatch<any>,
  columnCount: number,
  items: any,
  secondViewList: (item: any, index: any, props: any) => JSX.Element
) {
  return (
    <>
      <View style={Styles.emailWrapper}>
        <Text style={Styles.textWrapperEmail}>
          <Text style={Styles.feelingCustomText}>{'Feeling  '}</Text>
          <Image source={Images.smile_Emoji} style={Styles.checkInStyle} />
          <Text style={Styles.greatText}>{'  Great  '}</Text>
          <Text style={Styles.feelingCustomText}>{'because '}</Text>
        </Text>
        <View style={Styles.emailWrapper1}>
          <TextInput
            style={Styles.emailInput}
            value={description}
            placeholder={'Tap to start writing...'}
            placeholderTextColor={'rgba(0, 0, 0, 0.2)'}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            onChangeText={(value) => {
              setDescription(value)
            }}
          />
        </View>
      </View>
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        key={columnCount}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => secondViewList(item, index)}
        numColumns={columnCount}
      />
    </>
  )
}
