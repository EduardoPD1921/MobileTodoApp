import React, { useState, useEffect } from 'react'
import { 
  View,
  Text, 
  SafeAreaView, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Pressable
} from 'react-native'

import { Todo } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'

import CreateTodoModal from '../components/CreateTodoModal'
import DimBackground from '../components/DimBackground'

import PlusSign from '../assets/images/plus-sign.png'

const Home = () => {
  const [todos, setTodos] = useState<Array<Todo>>([])
  const [qtdCompletedTodos, setQtdCompletedTodos] = useState<number | null>(null)
  const [qtdIncompletedTodos, setQtdIncompletedTodos] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const getTodosAndQty = async () => {
      const currentTodosJson = await AsyncStorage.getItem('todos')

      let completedCounter = 0
      let incompletedCounter = 0

      if (currentTodosJson) {
        const currentTodosParsed: Array<Todo> = JSON.parse(currentTodosJson)
        setTodos(currentTodosParsed)

        currentTodosParsed.forEach(todo => {
          if (todo.isCompleted) {
            completedCounter++
          } else {
            incompletedCounter++
          }
        })
      } else {
        setTodos([])
      }

      setQtdCompletedTodos(completedCounter)
      setQtdIncompletedTodos(incompletedCounter)
    }

    getTodosAndQty()
  }, [todos])

  function getFormattedDate() {
    const date = new Date()

    const monthString = date.toLocaleString('eng-US', { month: 'long' })
    const dayNumber = date.getDate()
    const yearNumber = date.getFullYear()

    return `${monthString} ${dayNumber}, ${yearNumber}`
  }

  function openModal() {
    setIsVisible(true)
  }

  function closeModal() {
    setIsVisible(false)
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <DimBackground isVisible={isVisible} />
      <CreateTodoModal closeModal={closeModal} isVisible={isVisible} />
      <View style={styles.headerContainer}>
        <Text style={styles.dateText}>{getFormattedDate()}</Text>
        <Text style={styles.counterText}>{qtdIncompletedTodos} incomplete, {qtdCompletedTodos} completed</Text>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.todoGroupTitle}>Incomplete</Text>
      </View>
      <KeyboardAvoidingView>
        <Pressable android_ripple={{ color: '#5A70E9', borderless: true, radius: 30 }} onPress={openModal} style={styles.floatingButton}>
          <Image source={PlusSign} />
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  mainContent: {
    flex: 1,
    borderTopWidth: 2,
    borderColor: '#E8E8E8',
    margin: 20
  },
  headerContainer: {
    marginTop: 30,
    marginLeft: 20,
  },
  dateText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0E0E11'
  },
  todoGroupTitle: {
    marginTop: 15,
    color: '#575767',
    fontWeight: '700',
    fontSize: 18
  },
  floatingButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#3F4EA0',
    bottom: 15,
    right: 15,
    borderWidth: 2,
    borderColor: '#515CC6',
    borderRadius: 30
  },
  counterText: {
    fontSize: 14,
    color: '#575767',
    fontWeight: '700',
    marginTop: 5
  }
})

export default Home