import React, { createContext, useState, useEffect } from 'react';
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
        return setTheme(memoryTheme);
      }

      const deviceTheme = Appearance.getColorScheme();
      if (deviceTheme) {
        await AsyncStorage.setItem('theme', deviceTheme);
        setTheme(deviceTheme);
      }
    }

    fetchThemeFromMemoryAndSet();
  }, []);

  return (
    <Context.Provider value={{ theme }}>
      {children}
    </Context.Provider>
  );
}

export { ThemeProvider, Context };