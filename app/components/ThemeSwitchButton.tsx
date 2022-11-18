import React, { useContext, useEffect } from 'react';
import { Context } from '../context/ThemeContext';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

function ThemeSwitchButton() {
  const ctx = useContext(Context);
  const sunOpacity = useSharedValue(0);
  const moonOpacity = useSharedValue(0);
  const rotateAnimation = useSharedValue(0);

  useEffect(() => {
    if (ctx?.theme == 'light') {
      sunOpacity.value = 1;
      rotateAnimation.value = 90;
    } else {
      moonOpacity.value = 1;
    }
  }, []);

  const AnimatedIcon = Animated.createAnimatedComponent(IonIcon);

  const sunAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: sunOpacity.value,
      zIndex: sunOpacity.value,
      transform: [{ rotate: `${rotateAnimation.value}deg` }]
    }
  });

  const moonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: moonOpacity.value,
      zIndex: moonOpacity.value,
      transform: [{ rotate: `${rotateAnimation.value}deg` }]
    }
  });

  function handleToggleTheme() {
    console.log('test');

    if (ctx?.theme == 'light') {
      sunToMoonAnimation();
    } else {
      moonToSunAnimation();
    }

    ctx?.toggleTheme();
  }

  function sunToMoonAnimation() {
    rotateAnimation.value = withTiming(0, {
      duration: 200
    });

    sunOpacity.value = withTiming(0, {
      duration: 200,
    });

    moonOpacity.value = withTiming(1, {
      duration: 200
    });
  }

  function moonToSunAnimation() {
    rotateAnimation.value = withTiming(90, {
      duration: 200
    });

    sunOpacity.value = withTiming(1, {
      duration: 200
    });

    moonOpacity.value = withTiming(0, {
      duration: 200
    });
  }

  return (
    <>
      <AnimatedIcon
        onPress={handleToggleTheme} 
        style={[{ position: 'absolute', right: 20, top: 15, zIndex: 10 }, sunAnimatedStyle]} 
        size={20} 
        name='ios-sunny' 
      />
      <AnimatedIcon
        onPress={handleToggleTheme} 
        style={[{ position: 'absolute', right: 20, top: 15, zIndex: 10 }, moonAnimatedStyle]} 
        size={20} 
        name='ios-moon-outline' 
      />
    </>
  );
}

export default ThemeSwitchButton;