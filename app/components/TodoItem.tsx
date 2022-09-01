import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'

import { Todo } from '../types'

import CheckMark from '../assets/images/checkmark.png'

const TodoItem: React.FC<Todo> = ({ name, tag, isCompleted }) => {
  function getCheckMark() {
    if (isCompleted) {
      return <Image source={CheckMark} />
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.checkboxContainer}>
        {getCheckMark()}
      </View>
      <View style={styles.todoTextInfoContainer}>
        <Text style={styles.todoTitle}>{name}</Text>
        <Text style={styles.todoTag}>{tag}</Text>
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