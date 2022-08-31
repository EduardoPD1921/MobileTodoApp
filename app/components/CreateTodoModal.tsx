import React, { useRef } from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Button
} from 'react-native'
import { Todo } from '../types'

import AsyncStorage from '@react-native-async-storage/async-storage'

import EvilIcon from 'react-native-vector-icons/EvilIcons'

type Props = {
  isVisible: boolean,
  closeModal: () => void
}

const CreateTodoModal: React.FC<Props> = ({ isVisible, closeModal }) => {
  const {  width, height } = Dimensions.get('window')

  const todoData = useRef({
    name: '',
    tag: '',
    isCompleted: false
  })  

  async function saveTodo() {
    const currenTodosJson = await AsyncStorage.getItem('todos')

    if (currenTodosJson) {
      const currentTodosParsed: Array<Todo> = JSON.parse(currenTodosJson)
      currentTodosParsed.push(todoData.current)

      await AsyncStorage.setItem('todos', JSON.stringify(currentTodosParsed))
    } else {
      await AsyncStorage.setItem('todos', JSON.stringify([todoData.current]))
    }

    cleanInputsAndClose()
  }

  function cleanInputsAndClose() {
    todoData.current = {
      name: '',
      tag: '',
      isCompleted: false
    }

    closeModal()
  }

  return (
    <Modal transparent={true} onRequestClose={cleanInputsAndClose} animationType='slide' visible={isVisible}>
      <TouchableWithoutFeedback touchSoundDisabled={true} onPress={cleanInputsAndClose}>
        <View style={{ width, height }} />
      </TouchableWithoutFeedback>
      <View style={styles.popupContainer}>
        <View style={styles.modalHeader}>
          <EvilIcon color='black' onPress={cleanInputsAndClose} size={20} name='close' />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>Create to-do</Text>
          </View>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={[styles.labelText, { marginBottom: 10 }]}>Name</Text>
            <TextInput onChangeText={c => todoData.current.name = c} style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.labelText, { marginBottom: 10 }]}>Tag</Text>
            <TextInput onChangeText={c => todoData.current.tag = c} style={styles.input} />
          </View>
        </View>
        <View style={[styles.createButton, { width }]}>
          <Button onPress={saveTodo} color='#5A70E9' title='Create' />
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
    fontSize: 20,
    color: '#727272'
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
    fontWeight: 'bold',
    color: '#727272'
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