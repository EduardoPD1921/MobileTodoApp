import React, { useEffect } from 'react'
import {
  StyleSheet,
  Dimensions
} from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

type Props = {
  isVisible: boolean
}

const DimBackground: React.FC<Props> = ({ isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      dimOn()
    } else {
      dimOff()
    }
  }, [isVisible])

  const opacityAnimation = useSharedValue(0)
  const zIndexAnimation = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimation.value,
      zIndex: zIndexAnimation.value
    }
  })

  function dimOn() {
    opacityAnimation.value = withTiming(0.5, {
      duration: 200
    })
    zIndexAnimation.value = withTiming(10, {
      duration: 200
    })
  }

  function dimOff() {
    opacityAnimation.value = withTiming(0, {
      duration: 200
    })
    zIndexAnimation.value = withTiming(0, {
      duration: 200
    })
  }

  return (
    <Animated.View style={[styles.dimBackgroundContainer, animatedStyles]}>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  dimBackgroundContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})

export default DimBackground