import { StyleSheet, Dimensions, Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeViewStyle: {
    flex: 1,
    backgroundColor: '#F7F4F3',
  },
  mainContainer: {
    flex: 0.8,
    width: widthScreen / 1.12,
    alignSelf: 'center',
  },
  findGoalsActivity: {
    marginTop: hp(3),
    width: widthScreen / 1.2,
    alignSelf: 'center',
    borderRadius: 15,
  },
  findGoalsInner: {
    marginTop: hp(1.5),
    marginBottom: hp(1)
  },
  checkInStyle: {
    width: hp(2.2),
    height: hp(2.2),
    tintColor: "#A0EFB6"
  },
  feelingText: {
    color: 'black',
    fontSize: hp(2.2),
    fontWeight: '500'
  },
  greatText: {
    color: "#87AA99",
    fontSize: hp(2.2),
    fontWeight: '500'
  },
  eveningText: {
    color: "#C0A789",
    fontSize: hp(2.2),
    fontWeight: '600',
  },
  eveningText1: {
    color: "#C0A789",
    fontSize: hp(2.2),
    fontWeight: '600',
    marginTop: hp(1)
  },
  dateText: {
    color: "#A8A19C",
    fontSize: hp(1.7),
    fontWeight: '500',
    marginTop: hp(3)
  },
  seperator: {
    height: hp(0.1),
    width: widthScreen,
    alignSelf: 'center',
    marginTop: hp(3),
    backgroundColor: '#E3E3E3'
  },
  emailWrapper: {
    marginTop: hp(3),
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#F7F4F3',
    backgroundColor: '#F7F4F3',
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    width: widthScreen / 1.18,
    alignSelf: 'center',
  },
  emailWrapper1: {
    marginTop: hp(3),
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#F7F4F3',
    backgroundColor: '#F7F4F3',
    height: hp(12),
    justifyContent: 'center',
    alignItems: 'center',
    width: widthScreen / 1.18,
    alignSelf: 'center',
  },
  emailInput: {
    flex: 1,
    marginLeft: hp(1),
    color: 'black',
    fontSize: hp(2.2)
  },
  bottomContainer: {
    flex: 0.2,
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: widthScreen / 1.2,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: hp(2)
  },
  cancelButton: {
    width: hp(13),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F5E8E1",
    borderRadius: 25
  },
  cancelText: {
    fontSize: hp(1.8),
    fontWeight: '500',
    color: "#D78282"
  },
  saveButton: {
    width: hp(13),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#E0EAE3",
    borderRadius: 25,
    marginLeft: hp(2)
  },
  saveText: {
    fontSize: hp(1.8),
    fontWeight: '500',
    color: "#525445"
  }
});
export default styles;