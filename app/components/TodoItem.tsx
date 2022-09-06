import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

import { Todo } from '../types'

import CheckMark from '../assets/images/checkmark.png'

interface TodoItemType {
  todo: Todo,
  toggleTodoStatus: (uid: string, status: boolean) => void
}

const TodoItem: React.FC<TodoItemType> = ({ todo, toggleTodoStatus }) => {
  function getCheckMark() {
    if (todo.isCompleted) {
      return <Image source={CheckMark} />
    }
  }

  function triggerToggleTodoStatus() {
    toggleTodoStatus(todo.uid, todo.isCompleted)
  }

  return (
    <View style={styles.mainContainer}>
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
  }
})

export default TodoItem