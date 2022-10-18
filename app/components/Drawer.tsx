import React, { useRef, useState, useEffect } from 'react'
import { View,Animated, Easing, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import Lottie from 'lottie-react-native'

const Drawer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const animationProgress = useRef(new Animated.Value(0))

  useEffect(() => {
    if (isDarkMode) {
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(animationProgress.current, {
        toValue: 0.5,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: false
      }).start()
    }
  }, [isDarkMode])

  function toggleColorMode() {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <View style={styles.mainDrawerContainer}>
      <View style={styles.drawerItemsContainer}>
      </View>
      <View style={styles.bottomItemsContainer}>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={toggleColorMode}>
            <Lottie progress={animationProgress.current} source={require('../assets/animations/switch-color-mode.json')} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 4 }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainDrawerContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  drawerItemsContainer: {
    flex: 10
  },
  bottomItemsContainer: {
    flex: 1,
    flexDirection: 'row'
  }
})

export default Drawer