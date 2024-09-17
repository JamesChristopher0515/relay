import { faTrash } from '@fortawesome/free-solid-svg-icons'
import RelayModal from 'core/components/RelayModal'
import { Icon } from '@mtyk/frontend/core/components'
import React from 'react'
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import FormattedDate from 'relay-shared/frontend/core/components/FormattedDate'
import GoalsController from 'relay-shared/goals/controllers/GoalsController'
import Images from '../Images/Images'
import Styles from './Styles'

type IProps = {
  close: any
  addAnother: any
}

const Goals: React.FC<IProps> = (props) => {
  const goalsController = GoalsController.use({})
  const deleteValue = (value, key) => {
    Alert.alert(`Delete "${value.goal}"?`, '', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => goalsController.delete(value._id),
        style: 'destructive',
      },
    ])
  }

  return (
    <>
      <RelayModal close={props.close}>
        <View style={Styles.modalCont}>
          <View style={Styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                props.close()
              }}
            >
              <Image source={Images.close} style={Styles.closeStyle} />
            </TouchableOpacity>
            <Text style={Styles.headText}>{'My Goals'}</Text>
            <View style={Styles.thirdPortion} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.scrollMain}>
              {goalsController.data.map((goal, index) => {
                return (
                  <>
                    <View key={index} style={Styles.listMainWrapper}>
                      <Image
                        source={Images.goals}
                        style={Styles.settingImage}
                      />
                      <View style={{ width: hp(23) }}>
                        <Text style={Styles.listHeader}>{goal.goal}</Text>
                        <Text style={Styles.listDate}>
                          Created{' '}
                          <FormattedDate medium>{goal.createdAt}</FormattedDate>
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          deleteValue(goal, index)
                        }}
                      >
                        <Icon icon={faTrash} size={13} color={'#999'} />
                      </TouchableOpacity>
                    </View>
                  </>
                )
              })}
            </View>
          </ScrollView>
          <TouchableOpacity onPress={props.addAnother}>
            <Image source={Images.plus} style={Styles.plusImage} />
          </TouchableOpacity>
        </View>
      </RelayModal>
    </>
  )
}
export default Goals
