import RelayModal from 'core/components/RelayModal'
import { useClient } from 'core/hooks/useUser'
import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import GoalsController from 'relay-shared/goals/controllers/GoalsController'
import Styles from './Styles'

type IProps = {
  close: any
}

const AddGoal: React.FC<IProps> = (props) => {
  const goalsController = GoalsController.use({})
  const goal = useInputAdapter('')
  const [client] = useClient()
  const onAddGoal = async () => {
    await goalsController.create({
      client: client._id,
      goal: goal.value,
    })
    props.close()
  }
  return (
    <RelayModal avoidKeyboard={true} close={props.close}>
      <View style={Styles.modalCont}>
        <Text style={Styles.addheadText}>Add New Goal</Text>

        <View style={Styles.emailWrapper}>
          <TextInput
            style={Styles.emailInput}
            placeholder={'Type here...'}
            placeholderTextColor={'#C1C1C1'}
            autoCapitalize="none"
            autoCorrect={false}
            {...goal}
          />
        </View>

        <View style={Styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.close()
            }}
            style={Styles.cancelButton}
          >
            <Text style={Styles.cancelText}>{'Cancel'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onAddGoal} style={Styles.saveButton}>
            <Text style={Styles.saveText}>{'Done'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RelayModal>
  )
}
export default AddGoal
