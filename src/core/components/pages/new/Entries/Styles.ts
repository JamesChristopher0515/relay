import { StyleSheet, Dimensions, Platform } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const widthScreen = Dimensions.get('window').width

const styles = StyleSheet.create({
  settingImage: {
    width: hp(3),
    height: hp(3),
    marginLeft: hp(1.5),
  },
  monthBookContainer: {
    marginTop: hp(1.2),
    width: widthScreen / 1.12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekText: {
    fontSize: hp(1.7),
    fontWeight: '700',
    color: '#D3AEAE',
    width: '20%',
  },
  weekPoints: {
    flexDirection: 'row',

    width: '80%',
    alignSelf: 'center',
  },
  circleEmpty: {
    height: hp(2.6),
    width: hp(2.6),
    backgroundColor: '#F8F4F4',
    borderRadius: hp(1000),
    borderWidth: 2,
    borderColor: '#E0CECE',
  },
  circleBold: {
    height: hp(2.6),
    width: hp(2.6),
    backgroundColor: '#F8F4F4',
    borderRadius: hp(1000),
    borderWidth: 2,
    borderColor: '#9B5C5C',
  },
  emojiLogo: {
    height: hp(2.3),
    width: hp(2.3),
  },
  todayText: {
    fontSize: hp(2),
    fontWeight: '700',
    color: '#967864',
    marginTop: hp(6),
  },
  checkGoalsActivity: {
    marginTop: hp(3),
    width: hp(33),
    height: hp(10),
    borderRadius: 15,
    borderColor: '#E0CECE',
    backgroundColor: '#F8F4F4',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notCheckText: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: '#967864',
  },
  checkText: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: '#5BCD90',
    marginTop: hp(1),
  },
  bottomContainer: {
    justifyContent: 'center',
    marginBottom: hp(0.5),
  },
  findGoalsActivity: {
    marginTop: hp(3),
    width: hp(33),
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  findGoalsInner: {
    width: '85%',
    alignSelf: 'center',
    marginTop: hp(1.5),
    marginBottom: hp(1),
  },
  checkInStyle: {
    width: hp(2),
    height: hp(2),
    tintColor: '#A0EFB6',
  },
  feelingText: {
    color: 'black',
    fontSize: hp(1.8),
    fontWeight: '500',
  },
  greatText: {
    color: '#87AA99',
    fontSize: hp(1.8),
    fontWeight: '500',
  },
  eveningText: {
    color: '#C0A789',
    fontSize: hp(1.8),
    fontWeight: '500',
  },
  dateText: {
    color: '#A8A19C',
    fontSize: hp(1.5),
    fontWeight: '500',
    marginTop: hp(3),
  },
})
export default styles
