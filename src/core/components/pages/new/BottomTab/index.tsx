
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  TextInput
} from 'react-native';
import Styles from './Styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../Images/Images';

type IProps = {
  navigation: any;
};

const BottomTab: React.FC<IProps> = (props) => {
  return (
    <>
      <View style={Styles.bottomContainer}>
        {/* 1 */}
        <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }}
          style={Styles.bottomInner}>
          <Image source={Images.chat} style={Styles.chatStyle} />
          <Text style={Styles.bottomText}>{"Chat"}</Text>
        </TouchableOpacity>

        {/* 2 */}
        <TouchableOpacity onPress={() => { props.navigation.navigate('LogBook') }}
          style={Styles.bottomInner}>
          <Image source={Images.journal} style={Styles.journalStyle} />
          <Text style={Styles.bottomText}>{"Journal"}</Text>
        </TouchableOpacity>

        {/* 3 */}
        <TouchableOpacity style={Styles.bottomInner}>
          <Image source={Images.location} style={Styles.locationStyle} />
          <Text style={Styles.bottomText}>{"Resources"}</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}
export default BottomTab;