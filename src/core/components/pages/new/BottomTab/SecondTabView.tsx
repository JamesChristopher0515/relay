
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
  page: any
};
type IState = {
  navigatinUpdate: any
};
class BottomTab extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      navigatinUpdate: 1
    };
  }
  componentDidMount() {
    this.setState({ navigatinUpdate: this.props.page })
  }
  updateValue = (value) => {
    if (value === 1) {
      this.setState({ navigatinUpdate: value })
      this.props.navigation.navigate('Home')
    }
    else if (value === 2) {
      this.setState({ navigatinUpdate: value })
      // this.props.navigation.navigate('Magazine')
    }
    else if (value === 3) {
      this.setState({ navigatinUpdate: value })
      // this.props.navigation.navigate('AllCategories')
    }
  }
  render() {
    const { navigatinUpdate } = this.state
    return (
      <>
        <View style={Styles.bottomContainerSecond}>
          {/* 1 */}
          <TouchableOpacity onPress={() => this.updateValue(1)}
            style={Styles.secondTab}>
            <Image source={Images.chat} style={[Styles.chatStyleSecond, { tintColor: navigatinUpdate == 1 ? '#5C8870' : '#9DC1AE' }]} />
            <Text style={[Styles.bottomTextSecond, { color: navigatinUpdate == 1 ? '#5C8870' : '#9DC1AE' }]}>{"Chat"}</Text>
          </TouchableOpacity>

          {/* 2 */}
          <TouchableOpacity onPress={() => this.updateValue(2)}
            style={Styles.secondTab}>
            <Image source={Images.journal} style={[Styles.journalStyleSecond, { tintColor: navigatinUpdate == 2 ? '#5C8870' : '#9DC1AE' }]} />
            <Text style={[Styles.bottomTextSecond, { color: navigatinUpdate == 2 ? '#5C8870' : '#9DC1AE' }]}>{"Logbook"}</Text>
          </TouchableOpacity>

          {/* 3 */}
          <TouchableOpacity onPress={() => this.updateValue(3)}
            style={Styles.secondTab}>
            <Image source={Images.location} style={[Styles.locationStyleSecond, { tintColor: navigatinUpdate == 3 ? '#5C8870' : '#9DC1AE' }]} />
            <Text style={[Styles.bottomTextSecond, { color: navigatinUpdate == 3 ? '#5C8870' : '#9DC1AE' }]}>{"Resources"}</Text>
          </TouchableOpacity>

        </View>
      </>
    );
  }
}
export default BottomTab;