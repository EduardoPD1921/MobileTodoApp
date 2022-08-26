import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'

const Home = () => {
  function getFormattedDate() {
    const date = new Date()

    const monthString = date.toLocaleString('default', { month: 'long' })
    const dayNumber = date.getDate()
    const yearNumber = date.getFullYear()

    return `${monthString} ${dayNumber}, ${yearNumber}`
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.dateText}>{getFormattedDate()}</Text>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.todoGroupTitle}>Incomplete</Text>
      </View>
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
    borderTopWidth: 1,
    borderColor: '#D0D0D0',
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
    color: '#575767',
    fontWeight: '700',
    fontSize: 18
  }
})

export default Home