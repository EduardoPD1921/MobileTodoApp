import React, { useState, useEffect } from 'react'
import { 
  View,
  Text, 
  SafeAreaView, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Pressable,
  SectionList
} from 'react-native'

import Animated, { FadeInDown } from 'react-native-reanimated'

import { Todo } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'

import CreateTodoModal from '../components/CreateTodoModal'
import DimBackground from '../components/DimBackground'
import TodoItem from '../components/TodoItem'

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

  function getGroupedTodos() {
    let incompleteTodo: Array<Todo> = []
    let completedTodo: Array<Todo> = []

    todos.forEach(todo => {
      if (todo.isCompleted) {
        completedTodo.push(todo)
      } else {
        incompleteTodo.push(todo)
      }
    })

    const data = [
      {
        title: 'Incompleted',
        data: incompleteTodo
      },
      {
        title: 'Completed',
        data: completedTodo
      }
    ]

    return data
  }

  function renderSectionList() {
    if (todos.length > 0) {
      return (
        <Animated.View entering={FadeInDown}>
          <SectionList
            sections={getGroupedTodos()}
            keyExtractor={item => `${item.name}-${item.tag}`}
            stickySectionHeadersEnabled={true}
            renderItem={({ item }) => <TodoItem name={item.name} tag={item.tag} isCompleted={item.isCompleted} />} 
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.todoGroupTitle}>{title}</Text>
            )}
          />
        </Animated.View>
      )
    }
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
        {renderSectionList()}
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
    margin: 20,
    marginBottom: 0
  },
  headerContainer: {
    marginTop: 30,
    marginLeft: 20,
  },
  dateText: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    color: '#0E0E11'
  },
  todoGroupTitle: {
    fontFamily: 'Inter-Bold',
    color: '#575767',
    fontSize: 18,
    backgroundColor: '#F8F8F8',
    paddingTop: 10,
    paddingBottom: 5
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
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#575767',
    marginTop: 5
  }
})

export default Home