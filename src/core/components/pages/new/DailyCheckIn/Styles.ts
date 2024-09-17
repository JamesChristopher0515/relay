import { StyleSheet, Dimensions, Platform } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const styles = StyleSheet.create({
  safeViewStyle: {
    flex: 1,
    // backgroundColor: '#FFF8F4',
  },
  mainContainer: {
    flex: 0.7,
    width: widthScreen / 1.2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feelingText: {
    fontSize: hp(2.3),
    color: '#777777',
    fontWeight: '700',
    width: hp(30),
    alignSelf: 'center',
  },
  centerImage: {
    width: hp(10),
    height: hp(10),
    alignSelf: 'center',
    marginTop: hp(8),
  },
  centerEmojiText: {
    marginTop: hp(2),
    alignSelf: 'center',
    fontSize: hp(2),
    color: 'black',
    fontWeight: '500',
  },
  bottomContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  bottomWrapper: {
    width: widthScreen / 1.12,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bottomInnerWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: hp(8),
    marginTop: hp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listEmoji: {
    alignItems: 'center',
  },
  emojiItemImage: {
    width: hp(5),
    height: hp(5),
  },
  emojiItemText: {
    fontSize: hp(1.5),
    color: 'black',
    fontWeight: '500',
    marginTop: hp(1),
  },
  emojiImage: {
    width: hp(4),
    height: hp(4),
  },
  emojiText: {
    fontSize: hp(1.5),
    color: 'black',
    fontWeight: '500',
    marginTop: hp(2),
  },

  // DailySecondCheckIn Styling

  mainSecondContainer: {
    flex: 0.6,
    width: widthScreen / 1.2,
    alignSelf: 'center',
  },
  headingText: {
    fontSize: hp(2.2),
    color: '#777777',
    fontWeight: '700',
    marginTop: hp(4),
    marginBottom: hp(1),
  },
  centerSecondImage: {
    width: hp(8),
    height: hp(8),
    alignSelf: 'center',
    marginTop: hp(6),
  },
  secondEmojiText: {
    marginTop: hp(2),
    alignSelf: 'center',
    fontSize: hp(1.9),
    color: 'black',
    fontWeight: '500',
  },
  centerSecondImage1: {
    width: hp(8),
    height: hp(8),
    alignSelf: 'center',
  },
  secondEmojiText1: {
    marginTop: hp(2),
    alignSelf: 'center',
    fontSize: hp(1.9),
    color: 'black',
    fontWeight: '500',
  },
  buttonContainer: {
    width: widthScreen / 1.2,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp(8),
    justifyContent: 'space-between',
  },
  secondBackText: {
    color: '#AD9688',
    fontSize: hp(2),
    fontWeight: '700',
    marginTop: hp(1.2),
  },
  saveButton: {
    width: hp(13),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1F0DA',
    borderRadius: 15,
  },
  saveText: {
    fontSize: hp(2),
    fontWeight: '600',
    color: '#41883F',
  },
  bottomSecondContainer: {
    justifyContent: 'flex-end',
    width: widthScreen,
    alignSelf: 'center',
  },
  bottomSecondWrapper: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  keyOneContainer: {
    marginTop: hp(2),
    marginBottom: hp(2),
    width: '83%',
    alignSelf: 'center',
  },
  emojiListImage: {
    width: hp(6),
    height: hp(6),
    // backgroundColor: '#E8E1DD',
    borderRadius: hp(4),
  },
  centerSecondCircle: {
    width: hp(8),
    height: hp(8),
    // backgroundColor: '#F5E8E1',
    borderRadius: hp(4),
  },
  emojiSecondItemText: {
    fontSize: hp(1.5),
    color: 'black',
    fontWeight: '500',
    // marginTop: hp(1),
  },
  skipStyle: {
    height: hp(2),
    width: hp(3),
    marginTop: hp(1),
    // marginLeft: hp(1)
  },
  skipText: {
    fontSize: hp(1.5),
    color: 'black',
    fontWeight: '500',
    marginTop: hp(2),
    // marginLeft: hp(1)
  },

  selectedDotStyle: {
    width: hp(1),
    height: hp(1),
    borderRadius: hp(1),
    backgroundColor: '#6D6D6D',
    marginBottom: hp(2),
  },
  emptyDotStyle: {
    width: hp(1),
    height: hp(1),
    borderRadius: hp(1),
    backgroundColor: '#C4C4C4',
    marginBottom: hp(2),
  },
  customStyle: {
    height: hp(3),
    width: hp(3),
  },
  listKeyTwoEmoji: {
    // alignItems: 'center',
    // marginTop: hp(1),
    // marginBottom: hp(0.5),
    // width: hp(10),
    // marginLeft: hp(2),
    // marginRight: hp(2)
  },
  customText: {
    fontSize: hp(1.5),
    color: 'black',
    fontWeight: '500',
    marginTop: hp(2),
    // marginLeft: hp(1)
  },
  anotherEmojiWrapper: {
    marginTop: hp(6),
    width: widthScreen / 1.2,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  notSureText: {
    marginTop: hp(2),
    alignSelf: 'center',
    fontSize: hp(1.9),
    color: '#CDB6A9',
    fontWeight: '500',
  },
  emailWrapper: {
    height: hp(20),
    width: widthScreen / 1.18,
    borderWidth: 1,
    borderColor: '#DADADA',
    marginBottom: hp(1),
    borderRadius: 10,
  },

  emailInput: {
    flex: 1,
    marginLeft: hp(1.1),
    color: 'black',
    fontSize: hp(2.2),
  },
  checkInStyle: {
    width: hp(2.1),
    height: hp(2.1),
    tintColor: '#A0EFB6',
  },
  feelingCustomText: {
    color: 'black',
    fontSize: hp(2),
    fontWeight: '500',
  },
  greatText: {
    color: '#87AA99',
    fontSize: hp(2),
    fontWeight: '500',
  },
  textWrapperEmail: {
    marginTop: hp(1.5),
    width: '92%',
    alignSelf: 'center',
  },

  // Complete Check In
  backgroundContainer: {
    width: widthScreen,
    height: hp('100%'),
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modelContainer: {
    width: widthScreen,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
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
  modelInnerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: hp(6),
    marginBottom: hp(4),
  },
  headerText: {
    fontSize: hp(2.8),
    fontWeight: '800',
    color: '#967864',
    alignSelf: 'center',
  },
  headerDesText: {
    fontSize: hp(2),
    fontWeight: '500',
    color: '#967864',
    width: hp(20),
    alignSelf: 'center',
    marginTop: hp(4),
  },
  bottomModel: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp(5),
    marginBottom: hp(2),
  },
  tipStyle: {
    width: hp(1.5),
    height: hp(2.2),
    alignSelf: 'center',
  },
  tipText: {
    marginTop: hp(0.3),
    fontSize: hp(1.5),
    fontWeight: '500',
    color: '#B2A298',
  },
  bottomText: {
    fontSize: hp(1.5),
    fontWeight: '500',
    color: '#967864',
    width: hp(30),
    marginTop: hp(0.5),
    marginLeft: hp(2),
  },
  settingImage: {
    width: hp(2),
    height: hp(2),
    alignSelf: 'flex-end',
    marginRight: hp(2),
    marginBottom: hp(2),
    tintColor: '#B69B8E',
  },
})
export default styles
