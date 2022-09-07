import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Home from './screens/Home'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Home />
    </GestureHandlerRootView>
  )
}

export default App