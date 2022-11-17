import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import Home from './screens/Home';
import AwaitThemeToRender from './components/AwaitThemeToRender';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AwaitThemeToRender />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;