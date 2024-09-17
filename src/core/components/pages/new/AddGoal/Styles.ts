import { StyleSheet, Dimensions, Platform } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const styles = StyleSheet.create({
  modalCont: {
    height: hp('50%'),
    width: widthScreen / 1.05,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    // marginTop: WP('5'),
  },
  headerContainer: {
    marginTop: hp(3),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeStyle: {
    width: hp(2.2),
    height: hp(2.2),
    marginTop: hp(0.3),
  },
  headText: {
    fontSize: hp(2.2),
    fontWeight: '700',
    color: '#5C8870',
  },
  thirdPortion: {
    width: hp(3),
  },
  scrollMain: {
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  listMainWrapper: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    justifyContent: 'space-between',
  },
  settingImage: {
    width: hp(3),
    height: hp(3),
    marginTop: hp(0.5),
  },
  listHeader: {
    fontSize: hp(1.9),
    fontWeight: '700',
  },
  listDate: {
    fontSize: hp(1.4),
    fontWeight: '500',
    marginTop: hp(0.2),
  },
  menuStyle: {
    width: hp(4),
    height: hp(1),
    marginTop: hp(1.5),
  },
  plusImage: {
    width: hp(5),
    height: hp(5),
    alignSelf: 'center',

    marginBottom: hp(3),
  },

  // NewGoalAdd

  emailWrapper: {
    marginTop: hp(3),
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    width: widthScreen / 1.18,
    alignSelf: 'center',
    marginBottom: hp(6),
  },
  emailInput: {
    flex: 1,
    marginLeft: hp(1),
    color: 'black',
    fontSize: hp(2.2),
  },

  addheadText: {
    fontSize: hp(2.2),
    fontWeight: '700',
    color: '#5C8870',
    textAlign: 'center',
    marginTop: hp(3),
  },
  buttonContainer: {
    flexDirection: 'row',
    width: widthScreen / 1.2,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: hp(2),
  },
  cancelButton: {
    width: hp(13),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E8E1',
    borderRadius: 25,
  },
  cancelText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#D78282',
  },
  saveButton: {
    width: hp(13),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0EAE3',
    borderRadius: 25,
    marginLeft: hp(2),
  },
  saveText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#525445',
  },
})
export default styles
