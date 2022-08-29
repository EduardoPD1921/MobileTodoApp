import React from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Pressable,
  Button
} from 'react-native'

import EvilIcon from 'react-native-vector-icons/EvilIcons'

type Props = {
  isVisible: boolean,
  closeModal: () => void
}

const CreateTodoModal: React.FC<Props> = ({ isVisible, closeModal }) => {
  const {  width, height } = Dimensions.get('window')

  return (
    <Modal transparent={true} onRequestClose={closeModal} animationType='slide' visible={isVisible}>
      <TouchableWithoutFeedback touchSoundDisabled={true} onPress={closeModal}>
        <View style={{ width, height }} />
      </TouchableWithoutFeedback>
      <View style={styles.popupContainer}>
        <View style={styles.modalHeader}>
          <EvilIcon onPress={closeModal} size={20} name='close' />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>Create to-do</Text>
          </View>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={[styles.labelText, { marginBottom: 10 }]}>Name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.labelText, { marginBottom: 20 }]}>Tag</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={[styles.createButton, { width }]}>
          <Button color='#5A70E9' title='Create' />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: '#F8F8F8',
    position: 'absolute',
    height: 380,
    width: Dimensions.get('window').width,
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  closeContainer: {
    position: 'absolute',
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 25,
  },
  headerTitleContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitleText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  inputsContainer: {
    margin: 20
  },
  input: {
    borderColor: '#E5E5E5',
    borderBottomWidth: 1
  },
  button: {
    borderRadius: 20,
    marginTop: 30
  },
  labelText: {
    fontWeight: 'bold'
  },
  closeImage: {
    width: 10,
    height: 10
  },
  emojiButtonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonText: {
    color: 'white'
  },
  inputContainer: {
    marginBottom: 20
  },
  createButton: {
    position: 'absolute',
    bottom: 0
  }
})

export default CreateTodoModal