import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native'
import Styles from './Styles'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Images from '../Images/Images'

type IProps = {
  navigation: any
}

const AddJournalEntry: React.FC<IProps> = (props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <SafeAreaProvider>
      <SafeAreaView style={Styles.safeViewStyle}>
        <View style={Styles.mainContainer}>
          <View style={Styles.findGoalsActivity}>
            <View style={Styles.findGoalsInner}>
              <Text>
                <Text style={Styles.feelingText}>{'Feeling  '}</Text>
                <Image
                  source={Images.smile_Emoji}
                  style={Styles.checkInStyle}
                />
                <Text style={Styles.greatText}>{'  Great  '}</Text>
                <Text style={Styles.feelingText}>{'because '}</Text>
                <Text style={Styles.eveningText}>{"I'm "}</Text>
              </Text>
              <Text style={Styles.eveningText1}>
                {'seeing friends this evening.'}
              </Text>
              <Text style={Styles.dateText}>{'20th January'}</Text>
            </View>
          </View>

          <View style={Styles.seperator} />

          <View style={Styles.emailWrapper}>
            <TextInput
              style={Styles.emailInput}
              value={title}
              placeholder={'Title (Optional)'}
              placeholderTextColor={'#C1C1C1'}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => {
                setTitle(value)
              }}
            />
          </View>

          <View style={Styles.emailWrapper1}>
            <TextInput
              style={Styles.emailInput}
              value={description}
              placeholder={'Tap to start writing...'}
              placeholderTextColor={'#C1C1C1'}
              autoCapitalize="none"
              autoCorrect={false}
              multiline={true}
              onChangeText={(value) => {
                setDescription(value)
              }}
            />
          </View>
        </View>

        <View style={Styles.bottomContainer}>
          <View style={Styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack()
              }}
              style={Styles.cancelButton}
            >
              <Text style={Styles.cancelText}>{'Cancel'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('LogBook')
              }}
              style={Styles.saveButton}
            >
              <Text style={Styles.saveText}>{'Save'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
export default AddJournalEntry
