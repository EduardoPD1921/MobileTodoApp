import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated as NativeAnimated
} from 'react-native'
import { Swipeable }  from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'

import { Todo } from '../types'

import CheckMark from '../assets/images/checkmark.png'

const AnimatedIcon = NativeAnimated.createAnimatedComponent(EvilIcons)

interface TodoItemType {
  todo: Todo,
  toggleTodoStatus: (uid: string, status: boolean) => void,
  deleteTodo: (uid: string, status: boolean) => void,
  moveTodoPosition: (uid: string, isUp: boolean) => void
}

const TodoItem: React.FC<TodoItemType> = ({ todo, toggleTodoStatus, deleteTodo, moveTodoPosition }) => {
  const actionsOpacity = useSharedValue(0)

  function getCheckMark() {
    if (todo.isCompleted) {
      return <Image source={CheckMark} />
    }
  }

  function triggerToggleTodoStatus() {
    toggleTodoStatus(todo.uid, todo.isCompleted)
  }

  function triggerDeleteTodo(direction: string) {
    if (direction == 'left') {
      deleteTodo(todo.uid, todo.isCompleted)
    }
  }

  function triggerMoveTodoUp() {
    moveTodoPosition(todo.uid, true)
  }

  function triggerMoveTodoDown() {
    moveTodoPosition(todo.uid, false)
  }
  
  function showTodoActions() {
    setTimeout(() => {
      actionsOpacity.value = withTiming(1, {
        duration: 100
      })
    }, 500)
  }
  
  function renderTodoActions() {
    if (!todo.isCompleted) {
      const actionsAnimationStyle = useAnimatedStyle(() => {
        return {
          opacity: actionsOpacity.value
        }
      })

      showTodoActions()

      return (
        <Animated.View style={[styles.todoActionsContainer, actionsAnimationStyle]}>
          <TouchableOpacity style={styles.todoActionsButton} onPress={triggerMoveTodoUp}>
            <IonIcons name="ios-caret-up" color="black" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.todoActionsButton} onPress={triggerMoveTodoDown}>
            <IonIcons name="ios-caret-down" color="black" size={20} />
          </TouchableOpacity>
        </Animated.View>
      )
    }
  }

  const LeftActions = (progress: NativeAnimated.AnimatedInterpolation, dragValue: NativeAnimated.AnimatedInterpolation) => {
    const scale = dragValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0.5, 1],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.swipeActionContainer}>
        <AnimatedIcon size={30} name='trash' color='white' style={{ transform: [{ scale }] }} />
      </View>
    )
  }

  return (
    <Swipeable
      friction={2}
      renderLeftActions={LeftActions}
      childrenContainerStyle={{ backgroundColor: '#F8F8F8' }}
      leftThreshold={200}
      onSwipeableOpen={direction => triggerDeleteTodo(direction)}
    >
      <View 
        style={
          [
            styles.mainContainer,
            todo.isCompleted ? {} : { borderBottomColor: 'lightgray', borderBottomWidth: 1, paddingBottom: 10 }
          ]
        }
      >
        <View style={styles.todoTextContainer}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={triggerToggleTodoStatus}>
            {getCheckMark()}
          </TouchableOpacity>
          <View style={styles.todoTextInfoContainer}>
            <ScrollView style={{ marginRight: 20 }} nestedScrollEnabled={true}>
              <Text style={[styles.todoTitle, todo.isCompleted ? { color: '#B9B9BE' } : {}]}>
                {todo.name}
              </Text>
              <Text style={[styles.todoTag, todo.isCompleted ? { display: 'none' } : {}]}>
                {todo.isCompleted ? '' : todo.tag}
              </Text>
            </ScrollView>
          </View>
        </View>
        {renderTodoActions()}
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    maxHeight: 70
  },
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#DADADA',
    borderRadius: 6,
    marginTop: 6
  },
  todoTextInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
  },
  todoTitle: {
    flex: 1,
    marginRight: 30,
    fontFamily: 'Inter-Medium',
    color: '#575767',
    fontSize: 24,
  },
  todoTag: {
    fontFamily: 'Inter-SemiBold',
    color: '#B9B9BE',
    fontSize: 17,
    marginLeft: 3
  },
  todoTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  todoActionsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  todoActionsButton: {
    margin: 5
  },
  swipeActionContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    backgroundColor: '#dd2c00'
  },
  swipeActionText: {
    color: '#F8F8F8',
    fontFamily: 'Inter-Medium',
    fontSize: 12
  }
})

export default TodoItem