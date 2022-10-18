import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationRoutesType } from './types'

import DrawerContent from './components/Drawer'

import Home from './screens/Home'

const Drawer = createDrawerNavigator<NavigationRoutesType>()

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={DrawerContent} screenOptions={{ headerShown: false, drawerPosition: 'right' }} initialRouteName='Home'>
          <Drawer.Screen name='Home' component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App