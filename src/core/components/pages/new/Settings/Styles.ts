import { StyleSheet, Dimensions, Platform } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const styles = StyleSheet.create({
  safeViewStyle: {
    flex: 1,
    backgroundColor: '#F8F4F4',
    justifyContent: 'flex-end',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: hp('18%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  containerWrapper: {
    // marginBottom: hp(2),
  },
  checkBoxContainer: {
    width: widthScreen / 1.12,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp(4),
    justifyContent: 'space-between',
  },
  textOption: {
    fontSize: hp(1.4),
    fontWeight: '400',
    color: '#987777',
    width: hp(25),
  },
  remindContainer: {
    width: widthScreen / 1.12,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp(3),
    justifyContent: 'space-between',
  },
  remaindText: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: 'black',
    marginTop: hp(0.8),
  },
  remaindButton: {
    width: hp(8),
    height: hp(4),
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#A38888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remindButtonText: {
    fontSize: hp(1.6),
    fontWeight: '600',
    color: '#A38888',
  },
  checkText: {
    fontSize: hp(1.5),
    fontWeight: '400',
    color: '#A38888',
    marginTop: hp(1),
  },
  seperator: {
    width: widthScreen,
    alignSelf: 'center',
    height: hp(0.1),
    backgroundColor: '#D1AEAE',
    marginTop: hp(3),
  },
  privacyContainer: {
    width: widthScreen / 1.12,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp(3),
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  lockImage: {
    width: hp(2),
    height: hp(2.5),
  },
  toogleContainer: {
    width: widthScreen / 1.12,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp(1.5),
    justifyContent: 'space-between',
  },
  sleepText: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: 'black',
  },
  circleActive: {
    width: hp(2.2),
    height: hp(2.2),
    backgroundColor: '#CEC5C5',
    borderRadius: hp(2.2),
  },
  activeText: {
    fontSize: hp(1.5),
    fontWeight: '500',
    color: '#987777',
    marginTop: hp(0.2),
    marginLeft: hp(1),
  },
  backText: {
    fontSize: hp(1.5),
    fontWeight: '700',
    color: 'black',
    marginTop: hp(0.2),
    marginLeft: hp(1),
  },
  logoutStyle: {
    width: hp(14),
    height: hp(4),
    marginRight: hp(-3),
  },
  settingImage: {
    width: hp(1.35),
    height: hp(1.35),
    tintColor: '#B69B8E',
  },
})
export default styles
