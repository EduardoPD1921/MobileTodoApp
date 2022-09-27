import React, { useState, useEffect } from 'react'
import { 
  View,
  Text, 
  SafeAreaView, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Pressable,
  NativeScrollEvent,
  NativeSyntheticEvent
} from 'react-native'

import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeInDown, FadeOutDown, Layout } from 'react-native-reanimated'

import { Todo } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'

import CreateTodoModal from '../components/CreateTodoModal'
import DimBackground from '../components/DimBackground'
import TodoItem from '../components/TodoItem'

import PlusSign from '../assets/images/plus-sign.png'
import { ScrollView } from 'react-native-gesture-handler'

type OnScrollEventHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => void

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Home = () => {
  const [incompletedTodos, setIncompletedTodos] = useState<Array<Todo>>([])
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([])

  const [isVisible, setIsVisible] = useState(false)

  const fabBottomAnimation = useSharedValue(15)

  const fabAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: fabBottomAnimation.value
    }
  })

  useEffect(() => {
    const fetchTodosFromMemory = async () => {
      // TODO:
      // remover esses setStates
      setIncompletedTodos([])
      setCompletedTodos([])

      const currentTodosJson = await AsyncStorage.getItem('todos')
      if (currentTodosJson) {
        const currentTodosParsed: Array<Todo> = JSON.parse(currentTodosJson)
        currentTodosParsed.forEach(todo => {
          if (todo.isCompleted) {
            setCompletedTodos(prevState => [...prevState, todo])
          } else {
            setIncompletedTodos(prevState => [...prevState, todo])
          }
        })
      }
    }

    fetchTodosFromMemory()
  }, [])

  useEffect(() => {
    const syncTodos =  async () => {
      const allTodos = [...incompletedTodos, ...completedTodos]
      const jsonTodos = JSON.stringify(allTodos)

      await AsyncStorage.setItem('todos', jsonTodos)
    }

    syncTodos()
  }, [incompletedTodos, completedTodos])

  function getFormattedDate() {
    const date = new Date()

    const monthString = date.toLocaleString('en-US', { month: 'long' })
    const dayNumber = date.getDate()
    const yearNumber = date.getFullYear()

    return `${monthString} ${dayNumber}, ${yearNumber}`
  }

  function renderSectionList() {
    if (incompletedTodos.length > 0 || completedTodos.length > 0) {
      return (
        <ScrollView onScroll={onScrollHandler} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 70 }}>
          <Text style={styles.todoGroupTitle}>Incompleted</Text>
          {incompletedTodos.map(todo => {
            return (
              <Animated.View layout={Layout.delay(50)} entering={FadeInDown} exiting={FadeOutDown} key={todo.uid}>
                <TodoItem todo={todo} moveTodoPosition={moveTodoPosition} toggleTodoStatus={toggleTodoStatus} deleteTodo={deleteTodo} />
              </Animated.View>
            )
          })}
          <Animated.Text layout={Layout.delay(50)} entering={FadeInDown} exiting={FadeOutDown} style={styles.todoGroupTitle}>Completed</Animated.Text>
          {completedTodos.map(todo => {
            return (
              <Animated.View layout={Layout.delay(50)} entering={FadeInDown} exiting={FadeOutDown} key={todo.uid}>
                <TodoItem todo={todo} moveTodoPosition={moveTodoPosition} toggleTodoStatus={toggleTodoStatus} deleteTodo={deleteTodo} />
              </Animated.View>
            )
          })}
        </ScrollView>
      )
    }
  }

  function hideFloatingActionButton() {
    fabBottomAnimation.value = withTiming(-60, {
      duration: 200
    })
  }

  function showFloatingActionButton() {
    fabBottomAnimation.value = withTiming(15, {
      duration: 200
    })
  }

  const onScrollHandler: OnScrollEventHandler = (event) => {
    if (event.nativeEvent.velocity) {
      if (event.nativeEvent.velocity.y > 0) {
        hideFloatingActionButton()
      } else {
        showFloatingActionButton()
      }
    }
  }

  function openModal() {
    setIsVisible(true)
  }

  function closeModal() {
    setIsVisible(false)
  }

  function toggleTodoStatus(uid: string, status: boolean) {
    if (status) {
      const copyFromState = completedTodos

      const index = copyFromState.findIndex(todo => todo.uid == uid)
      const removedTodo = copyFromState.splice(index, 1)[0]

      removedTodo.isCompleted = false

      setIncompletedTodos(prevState => [...prevState, removedTodo])
      setCompletedTodos(copyFromState)
    } else {
      const copyFromState = incompletedTodos

      const index = copyFromState.findIndex(todo => todo.uid == uid)
      const removedTodo = copyFromState.splice(index, 1)[0]

      removedTodo.isCompleted = true

      setCompletedTodos(prevState => [...prevState, removedTodo])
      setIncompletedTodos(copyFromState)
    }
  }

  function deleteTodo(uid: string, status: boolean) {
    if (status) {
      setCompletedTodos(prevState => prevState.filter(todo => todo.uid != uid))
    } else {
      setIncompletedTodos(prevState => prevState.filter(todo => todo.uid != uid))
    }
  }

  function moveTodoPosition(uid: string, isUp: boolean) {
    const copyFromState = [...incompletedTodos]
    const todoIndex = copyFromState.findIndex(todo => todo.uid == uid)
    const targetIndex = isUp ? todoIndex - 1 : todoIndex + 1

    if (!(targetIndex < 0) && !(targetIndex > copyFromState.length - 1)) {
      const toMoveTodo = copyFromState.splice(todoIndex, 1)[0]
      copyFromState.splice(targetIndex, 0, toMoveTodo)

      setIncompletedTodos(copyFromState)
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <DimBackground isVisible={isVisible} />
      <CreateTodoModal setIncompletedTodos={setIncompletedTodos} closeModal={closeModal} isVisible={isVisible} />
      <View style={styles.headerContainer}>
        <Text style={styles.dateText}>{getFormattedDate()}</Text>
        <Text style={styles.counterText}>{incompletedTodos.length} incomplete, {completedTodos.length} completed</Text>
      </View>
      <View style={styles.mainContent}>
        {renderSectionList()}
      </View>
      <KeyboardAvoidingView>
        <AnimatedPressable android_ripple={{ color: '#5A70E9', borderless: true, radius: 30 }} onPress={openModal} style={[styles.floatingButton, fabAnimatedStyle]}>
          <Image source={PlusSign} />
        </AnimatedPressable>
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