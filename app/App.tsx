import React from 'react'
import { ThemeProvider } from './context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Home from './screens/Home'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

export default App