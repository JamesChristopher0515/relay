import React from 'react'
import Modal from 'react-native-modal'

export default function RelayModal({ children, close, ...rest }) {
  return (
    <Modal
      animationInTiming={300}
      animationOutTiming={200}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      isVisible={true}
      onBackdropPress={() => {
        close()
      }}
      {...rest}
      style={{ flex: 1, justifyContent: 'flex-end', ...rest.style }}
    >
      {children}
    </Modal>
  )
}
