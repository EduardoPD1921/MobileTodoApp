import React from 'react'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Home from './screens/Home'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor='#F8F8F8' barStyle='dark-content' />
      <Home />
    </GestureHandlerRootView>
  )
}

export default App