import React, { createContext, useState, useEffect } from 'react';
import SplashScreen from 'react-native-bootsplash';
import { Appearance } from 'react-native';
import { ThemeContextType } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  children?: JSX.Element
}

const Context = createContext<ThemeContextType | null>(null);

function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    async function fetchThemeFromMemoryAndSet() {
      const memoryTheme = await AsyncStorage.getItem('theme');

      if (memoryTheme) {
        setTheme(memoryTheme);
      } else {
        const deviceTheme = Appearance.getColorScheme();
        
        if (deviceTheme) {
          await AsyncStorage.setItem('theme', deviceTheme);
          setTheme(deviceTheme);
        }
      }

      SplashScreen.hide();
    }

    fetchThemeFromMemoryAndSet();
  }, []);

  async function toggleTheme() {
    if (theme == 'light') {
      setTheme('dark');
      await AsyncStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      await AsyncStorage.setItem('theme', 'light');
    }
  }

  return (
    <Context.Provider value={{ theme, toggleTheme }}>
      {children}
    </Context.Provider>
  );
}

export { ThemeProvider, Context };