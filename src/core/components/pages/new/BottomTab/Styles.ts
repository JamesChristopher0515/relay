import { StyleSheet, Dimensions, Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;


const styles = StyleSheet.create({
  bottomContainer: {
    width: widthScreen / 1.12,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: hp(1),
    justifyContent: 'space-between'
  },
  bottomContainerSecond: {
    width: widthScreen / 1.12,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: hp(1),
    justifyContent: 'space-evenly'
  },
  bottomInner: {
    flexDirection: 'row',
  },
  chatStyle: {
    width: hp(2),
    height: hp(2)
  },
  chatStyleSecond: {
    width: hp(3),
    height: hp(3)
  },
  journalStyle: {
    width: hp(1.5),
    height: hp(2),
    marginTop: hp(0.3)
  },
  journalStyleSecond: {
    width: hp(2.5),
    height: hp(3),
  },
  locationStyle: {
    width: hp(1.3),
    height: hp(2),
    marginTop: hp(0.3)
  },
  locationStyleSecond: {
    width: hp(2.3),
    height: hp(3),
  },
  bottomText: {
    fontSize: hp(2),
    fontWeight: '700',
    color: "#9DC1AE",
    marginLeft: hp(1)
  },
  bottomTextSecond: {
    fontSize: hp(1.8),
    fontWeight: '700',
    color: "#9DC1AE",
    marginTop: hp(1)
  },
  secondTab: {
    alignItems: 'center'
  }
});
export default styles;