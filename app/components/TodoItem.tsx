import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated as NativeAnimated
} from 'react-native'
import { Swipeable }  from 'react-native-gesture-handler'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Todo } from '../types'

import CheckMark from '../assets/images/checkmark.png'

const AnimatedIcon = NativeAnimated.createAnimatedComponent(EvilIcons)

interface TodoItemType {
  todo: Todo,
  toggleTodoStatus: (uid: string, status: boolean) => void,
  deleteTodo: (uid: string, status: boolean) => void
}

const TodoItem: React.FC<TodoItemType> = ({ todo, toggleTodoStatus, deleteTodo }) => {
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
      renderLeftActions={todo.isCompleted ? LeftActions : LeftActions}
      childrenContainerStyle={{ backgroundColor: '#F8F8F8' }}
      leftThreshold={200}
      onSwipeableOpen={direction => triggerDeleteTodo(direction)}
    >
      <View style={[styles.mainContainer, todo.isCompleted ? {} : { borderBottomColor: 'lightgray', borderBottomWidth: 1 }]}>
        <TouchableOpacity onPress={triggerToggleTodoStatus}>
          <View style={styles.checkboxContainer}>
            {getCheckMark()}
          </View>
        </TouchableOpacity>
        <View style={styles.todoTextInfoContainer}>
          <Text style={[styles.todoTitle, todo.isCompleted ? { color: '#B9B9BE' } : {}]}>{todo.name}</Text>
          <Text style={[styles.todoTag, todo.isCompleted ? { display: 'none' } : {}]}>{todo.isCompleted ? '' : todo.tag}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
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