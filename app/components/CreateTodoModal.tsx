import React from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TextInput,
  Pressable
} from 'react-native'

import CloseSign from '../assets/images/close-sign.png'

type Props = {
  isVisible: boolean,
  closeModal: () => void
}

const CreateTodoModal: React.FC<Props> = ({ isVisible, closeModal }) => {
  return (
    <Modal transparent={true} onRequestClose={closeModal} animationType='slide' visible={isVisible}>
      <View style={styles.popupContainer}>
        <View style={styles.modalHeader}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <Image style={styles.closeImage} source={CloseSign} />
          </TouchableWithoutFeedback>
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
            <Text style={[styles.labelText, { marginBottom: 20 }]}>Description</Text>
            <View style={styles.emojiButtonContainer}>
              <TouchableHighlight style={styles.emojiButton}>
                <Text style={styles.buttonText}>Emoji</Text>
              </TouchableHighlight>
              <TextInput style={[styles.input, { flex: 10 }]} />
            </View>
          </View>
          <Pressable style={styles.button}>
            <Text>Create</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: '#F8F8F8',
    position: 'absolute',
    height: 400,
    width: Dimensions.get('window').width,
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
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
  emojiButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#515CC6',
    borderRadius: 10,
    flex: 2,
  },
  buttonText: {
    color: 'white'
  },
  inputContainer: {
    marginBottom: 20
  }
})

export default CreateTodoModal